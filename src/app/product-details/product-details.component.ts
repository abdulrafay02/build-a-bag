import { Component, OnInit, Input } from '@angular/core';
import { ToggleService } from '../toggle.service';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CartService } from '../cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() itemDetails: any[];
  @Input() modalImgUrl: string;
  products: any[];
  private subscription: Subscription;
  showDetails: boolean;
  activeTab = 1;
  showProductInfo: boolean;
  selectedCategories = {
    purification: 0,
    bottles: 0,
    filter: 0,
    lighters: 0
  };
  newCartId = 0;
  cartTotalAmount = 0;

  constructor(private toggleService: ToggleService, private _cartService: CartService) { }

  ngOnInit() {
    this.toggleService.showDetailsState.subscribe(sd => this.showDetails = sd);
    this.subscription = this._cartService.CartState
      .subscribe((state) => {
        this.products = state.products;
        console.log(this.products);
      });
  }

  addToCart() {

    const obj = {};
    for (const property in this.itemDetails) {
      if (this.itemDetails.hasOwnProperty(property)) {
        obj[property] = this.itemDetails[property];
      }
    }

    obj['cartId'] = ++this.newCartId;
    this._cartService.addProduct(obj);

    if (this.itemDetails['category'] === 'bottles') {
      this.selectedCategories.bottles++;
    } else if (this.itemDetails['category'] === 'purification') {
      this.selectedCategories.purification++;
         } else if (this.itemDetails['category'] === 'filter') {
      this.selectedCategories.filter++;
         } else if (this.itemDetails['category'] === 'lighters') {
      this.selectedCategories.lighters++;
         }

    this.cartTotalAmount = this._cartService.checkCartTotalAmount(this.products);
  }

  changeProductImage(imgPath, productImg: HTMLImageElement) {
    productImg.src = imgPath;
    this.modalImgUrl = imgPath;
  }

}
