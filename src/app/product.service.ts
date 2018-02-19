import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService extends DataService {

  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/posts?working=true', http);
  }

  products = [
    {
      id: 1,
      name: 'water',
      subCat: [
        {
          name: 'bottles',
          id: '1',
          item: [
            {
              asin: 'B004H8BIKW',
              name: 'nalgene',
              price: 9.64,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B004H8BIKW-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B004H8BIKW.jpg'
            },
            {
              asin: 'B0019DA7AU',
              name: 'camelBak',
              price: 12.00,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B0019DA7AU-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B0019DA7AU.jpg'
            }
          ]
        },
        {
          name: 'purification',
          id: '2',
          item: [
            {
              asin: 'B000OR111G',
              name: 'Aquamira',
              price: 12.04,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B000OR111G-150x150.png',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B000OR111G.png'
            },
            {
              asin: 'B00GG19KWQ',
              name: 'Aquatabs',
              price: 9.98,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00GG19KWQ-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00GG19KWQ.jpg'
            }
          ]
        },
        {
          name: 'filter',
          id: '3',
          item: [
            {
              asin: 'B0090QCQI4',
              name: 'pure sip',
              price: 9.45,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B0090QCQI4-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B0090QCQI4.jpg'
            },
            {
              asin: 'B00MPH1LEU',
              name: 'sawyer mini',
              price: 19.99,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00MPH1LEU-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00MPH1LEU.jpg'
            }
          ]
        }
      ]
    },
    {
      id: 2, name: 'fire',
      subCat: [
        {
          name: 'lighters',
          id: '4',
          item: [
            {
              asin: 'B00FPTYS2M',
              name: 'clipper med lighter',
              price: 6.01,
              img_url: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00FPTYS2M-150x150.jpg',
              img_url_large: 'http://ebugout.s3.amazonaws.com/ebug_light/cron/wp-content/uploads/B00FPTYS2M.jpg'
            }
          ]
        },
        { name: 'matches' },
        { name: 'flints' },
        { name: 'fuel' }
      ]
    },
    {
      id: 3, name: 'tools',
      subCat: [
        { name: 'cutting tools' },
        { name: 'lights' },
        { name: 'multi-tools' },
        { name: 'compass' },
        { name: 'signal mirrors' },
        { name: 'whistles' }
      ]
    },
    {
      id: 4, name: 'food',
      subCat: [
        { name: 'freeze-dried' },
        { name: 'survival bars' },
        { name: 'utensils' },
        { name: 'cook pots' },
        { name: 'stoves' },
        { name: 'cooking fuel' }
      ]
    },
    {
      id: 5, name: 'medical',
      subCat: [
        { name: 'medkit' },
        { name: 'ointment' },
        { name: 'clotting' },
        { name: 'vitamins' },
        { name: 'potassium iodide' }
      ]
    },
    {
      id: 6, name: 'shelter',
      subCat: [
        { name: 'cover' },
        { name: 'sleeping bags' },
        { name: 'sleeping pads' },
        { name: '550 paracord' },
        { name: 'duct tape' }
      ]
    },
    {
      id: 7, name: 'accessories',
      subCat: [
        { name: 'hygeine' },
        { name: 'power' },
        { name: 'communication' },
        { name: 'defense' },
        { name: 'speciality' },
        { name: 'misc' }
      ]
    },
    {
      id: 8, name: 'backpacks',
      subCat: [
        { name: 'hiking' },
        { name: 'hiking 70+' },
        { name: 'tactical' },
        { name: 'duffle' }
      ]
    }
  ];

  getProductsData() {
    return this.products;
  }

  getProductData(id: number) {
    return this.products[id];
  }

}
