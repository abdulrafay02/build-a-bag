import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as CryptoJS from 'crypto-js';
import * as CRYPTO_ENC_HEX from 'crypto-js/enc-hex';
@Injectable()
export class AwsInterceptorService implements HttpInterceptor {

  constructor() { }


  private generateSignature(stringToSign, awsSecret) {
    var hash = CryptoJS.HmacSHA256(stringToSign, awsSecret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;

    // var hmac = crypto.createHmac('sha256', awsSecret);
    // var signature = hmac.update(stringToSign).digest('base64');
    //return HmacSHA256(stringToSign, awsSecret).toString(CRYPTO_ENC_HEX);
  }

  private capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  private sort(object) {
    const sortedObject = {};
    const keys = Object.keys(object).sort();
    for (let i = 0; i < keys.length; i++) {
      sortedObject[keys[i]] = object[keys[i]];
    }
    return sortedObject;
  }

  /**
   *
   * @param query
   * @param method ["ItemSearch", "ItemLookup", "ASIN", "BrowseNodeLookup"]
   * @param credentials
   */
  private formatQueryParams(query: any, method?: string) {
    let params = {};

    method = method || query['Operation'];
    const credentials = environment.amazonCredentials;
    // format query keys
    // tslint:disable-next-line:prefer-const
    for (let param in query) {
      if (query.hasOwnProperty(param)) {
        const capitalized = this.capitalize(param);
        params[capitalized] = query[param];
      }
    }

    if (method === 'ItemSearch') {
      // Default
      params = Object.assign(params, {
        SearchIndex: 'All',
        //Condition: 'All',
        ResponseGroup: 'ItemAttributes',
        Keywords: 'harry',
        //ItemPage: '1'
      });

    } else if (method === 'ItemLookup') {
      // Default
      params = Object.assign(params, {
        SearchIndex: 'All',
        //Condition: 'All',
        ResponseGroup: 'ItemAttributes',
        IdType: 'ASIN',
        IncludeReviewsSummary: 'True',
        TruncateReviewsAt: '1000',
        VariationPage: 'All'
      });

      // Constraints
      // If ItemId is an ASIN (specified by IdType), a search index cannot be specified in the request.
      if (params['IdType'] === 'ASIN') {
        delete params['SearchIndex'];
      }

    } else if (method === 'BrowseNodeLookup') {
      // Default
      params = Object.assign(params, {
        BrowseNodeId: '',
        ResponseGroup: 'BrowseNodeInfo'
      });
    }


    // Constants
    //params['Version'] = '2013-08-01';

    // Common params
    params['AWSAccessKeyId'] = credentials.awsId;
    // awsTag is associated with domain, so it ought to be defineable in query.
    params['AssociateTag'] = query.awsTag || credentials.affliateId;
    params['Timestamp'] = new Date().toISOString();
    params['Service'] = 'AWSECommerceService';
    params['Operation'] = method;

    // sort
    params = this.sort(params);

    return params;
  }

  generateQueryString(query, credentials = environment.amazonCredentials) {
    let unsignedString = '';
    const domain = 'webservices.amazon.com';
    const params = this.formatQueryParams(query);
    // generate query
    unsignedString = Object.keys(params).map((key) =>
      `${key}=${encodeURIComponent(params[key]).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16))}`)
      .join('&');

    const signature = encodeURIComponent(
      this.generateSignature('GET\n' + domain + '\n/onca/xml\n' + unsignedString, credentials.secret))
      .replace(/\+/g, '%2B');
    const queryString = `https://${domain}/onca/xml?${unsignedString}&Signature=${signature}`;

    return queryString;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');


    if (!request.url.startsWith('http://webservices.amazon.com')) {
      return next.handle(request);
    }
    const params = request.urlWithParams.split('?')[1];

    if (!params) {
      return next.handle(request);
    }


    let paramsObject: any = params.split('&').reduce((prev, curr) => {
      const keyValue = curr.split('=');
      prev[keyValue[0]] = encodeURIComponent(keyValue[1] || '');
      return prev;
    }, {
        Timestamp: encodeURIComponent(new Date().toISOString()),
        //AWSAccessKeyId: `AWSAccessKeyId=${environment.amazonCredentials.awsId}`,
        //Version: '2013-08-01'
      });
    const urlWithQuery = this.generateQueryString(paramsObject);
    
    paramsObject = this.sort(paramsObject);

    const urlToSign = 'GET\n' +
      'webservices.amazon.com\n' +
      '/onca/xml\n' +
      Object.keys(paramsObject).map(key => `${key}=${paramsObject[key]}`).join('&');

    //const signature = HmacSHA256(urlToSign, environment.amazonCredentials.secret).toString(CRYPTO_ENC_HEX);
    var hash = CryptoJS.HmacSHA256(urlToSign, environment.amazonCredentials.secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    paramsObject.Signature = signature;

    // return next.handle(request);
    return next.handle(new HttpRequest('GET', urlWithQuery));

  }

}

