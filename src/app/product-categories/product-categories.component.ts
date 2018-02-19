import { AmazonApiService } from './../services/amazon-api.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ToggleService } from '../toggle.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  products: any[];
  product;
  subCatItems;
  activeId: number;
  activeSubCatId: number;
  showSubCat = false;
  showFooter = false;
  showDetails = false;
  test: any[];

  constructor(private service: ProductService,
    private toggleService: ToggleService,
    private awsService: AmazonApiService) { }

  ngOnInit() {

    const params = new HttpParams()
    .append('Keywords', 'harry');

    /* this.service.getAll()
      .subscribe(test => this.test = test);
      console.log(this.test); */

    this.awsService.itemSearch(params)
    .subscribe(console.log);
    this.products = this.service.getProductsData();
    this.toggleService.showDetailsState.subscribe(sd => this.showDetails = sd);
  }

  showSubCategories(id) {
    this.activeId = id;
    this.activeSubCatId = 0;
    this.showFooter = false;
    this.toggleService.changeShowDetailsState(false);
    this.showSubCat = true;
    this.product = this.products[--id];
  }

  showProductFooter(subCat) {
    this.activeSubCatId = subCat.id;
    this.subCatItems = subCat;
    this.showFooter = true;
    this.toggleService.changeShowDetailsState(false);
  }


}
