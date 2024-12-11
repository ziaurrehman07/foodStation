import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {
  productQuantity : number = 1;
  productsArrLength : number = 0;
  showCartPage : boolean = false;
  subtotalPrice : number = 0;

  @Input()
  productsArr : any = [];

  @Output()
  sendProductsLength : EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    let clickedProductsArr = localStorage.getItem('clickedProductsArr');
    if(clickedProductsArr) {
      this.productsArr = JSON.parse(clickedProductsArr);
      this.productsArr.forEach((product : any)=> {
        this.subtotalPrice += Math.round(product.price);
      })
    }
    this.productsArrLength = this.productsArr.length;
  };

  removeProduct(product : any): void {
    this.productsArrLength -= 1;
    localStorage.setItem('productsArrLength', JSON.stringify(this.productsArrLength));
    this.sendProductsLength.emit(this.productsArrLength);
    let productIndex = this.productsArr.indexOf(product);
    this.productsArr.splice(productIndex, 1);
    localStorage.setItem('clickedProductsArr', JSON.stringify(this.productsArr));
    this.subtotalPrice -= Math.round(product.price);
  };

  toggleCartPage() {
    this.showCartPage = !this.showCartPage;
  };
}