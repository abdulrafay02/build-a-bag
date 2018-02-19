import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {

  constructor() { }

  private cartSubject = new Subject<any>();
  Products: any[] = [];
  CartState = this.cartSubject.asObservable();
  addProduct(_product: any) {
    this.Products.push(_product)
    this.cartSubject.next(<any>{ loaded: true, products: this.Products });
  }
  removeProduct(id: number) {
    this.Products = this.Products.filter((_item) => _item.cartId !== id)
    this.cartSubject.next(<any>{ loaded: false, products: this.Products });
  }

  checkCartTotalAmount(products: any[]) {
    let cartTotalAmount: number = 0;
    if(products) {
      for (var i = 0; i < products.length; i++) {
        cartTotalAmount = cartTotalAmount + products[i].price;
      }
    }
    return cartTotalAmount;
  }

}
