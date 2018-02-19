import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class AmazonApiService {

  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://webservices.amazon.com/onca/xml';
  }
  runQuery(operation: string) {
    return (query: HttpParams) => {
      query = query || new HttpParams();
      query.append('Operation', operation);
      return this.http.get(this.url, {
        params: query
      });
    };
  }

  itemSearch (query: HttpParams) {
    query = query || new HttpParams();
    query = query.append('Operation', 'ItemSearch');
    return this.http.get(this.url, {
      params: query
    });
  }
  itemLookup() {}
  browseNodeLookup() {} // 'BrowseNodeLookup'
}
