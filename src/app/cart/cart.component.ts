import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartPageComponent, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  showCartPage : boolean = false;

  toggleCartPage() {
    this.showCartPage = !this.showCartPage;
  };

  @Output()
  sendProductsLength : EventEmitter<number> = new EventEmitter();

  reciveProductsLength($event : number) {
    this.cartProductQuantity = $event;
    this.sendProductsLength.emit($event);
  };

  ngOnInit(): void {
    let productsArrLength = localStorage.getItem('productsArrLength');
    if(productsArrLength) {
      this.cartProductQuantity = JSON.parse(productsArrLength);
    } else {
      this.cartProductQuantity = 0;
    }
  };

  @Input()
  cartProductQuantity : number = 0;

  @Input()
  productsArr : Array<any> = [];
};