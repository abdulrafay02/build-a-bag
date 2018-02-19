import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CartService } from '../cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() selectedCategories;
  @Input() cartTotalAmount;
  loaded: boolean = true;
  products: any[];
  checkoutCart: any[];
  private subscription: Subscription;

  constructor(private _cartService: CartService) { }

  ngOnInit() {
    // this.loaderService.show();
    this.subscription = this._cartService.CartState
      .subscribe((state) => {
        this.products = state.products;
      });
  }

  removeFromCart(product) {
    this._cartService.removeProduct(product.cartId);

    if (product['category'] === 'bottles')
      this.selectedCategories.bottles--;
    else if (product['category'] === 'purification')
      this.selectedCategories.purification--;
    else if (product['category'] === 'filter')
      this.selectedCategories.filter--;
    else if (product['category'] === 'lighters')
      this.selectedCategories.lighters--;
    
    this.cartTotalAmount = this._cartService.checkCartTotalAmount(this.products);
  }

  checkout() {
    this.checkoutCart = this.checkProductQuantity();
  }

  checkProductQuantity() {
    let isItemAdded = {};
    let checkoutArr = [];
    
    this.products.map(function (product) {
      let asin = product['asin'];
      if (isItemAdded[asin] && isItemAdded[asin] === true) {
        let index: number = checkoutArr.findIndex(function(item, i){
          return item.asin === asin
        });
        checkoutArr[index].quantity += 1;
      }
      else {
        isItemAdded[asin] = true;
        checkoutArr.push(product);
        checkoutArr[checkoutArr.indexOf(product)].quantity = 1;
      }
    });
    
    return checkoutArr;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
