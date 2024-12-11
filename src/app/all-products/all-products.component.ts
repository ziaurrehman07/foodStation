import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  API from '../../mock/api.json'
import { NgFor, NgStyle } from '@angular/common';
@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})

export class AllProductsComponent implements OnInit {
  products : any = API;
  clickedProductsArr : any = [];
  productQuantity : any = 0;
  regex : RegExp = /[^A-Z ]/gi;

  @Input()
  searchValue : string = '';

  @Input()
  productsArrLength : number = 0;

  @Output()
  onButtonClick : EventEmitter<number> = new EventEmitter<number>();

  @Output()
  onAddToCartClick : EventEmitter<object> = new EventEmitter<object>();

  ngOnInit(): void {
    let productsLengthStorage = localStorage.getItem('productsArrLength');
    let clickedProductsArr = localStorage.getItem('clickedProductsArr');
    if(clickedProductsArr) {
      this.clickedProductsArr = JSON.parse(clickedProductsArr);
    }
    if(productsLengthStorage) {
      this.productsArrLength = JSON.parse(productsLengthStorage);
    }
  };

  addToCart(product : any) {
    this.onAddToCartClick.emit(this.clickedProductsArr);
    if(this.productsArrLength === 0) {
      this.clickedProductsArr = [];
      this.clickedProductsArr.push(product);
      this.productsArrLength += 1;
      localStorage.setItem('productsArrLength', JSON.stringify(this.productsArrLength));
      localStorage.setItem('clickedProductsArr', JSON.stringify(this.clickedProductsArr));
      this.onButtonClick.emit(this.productsArrLength);
    } else if (this.productsArrLength > 0) {
      let clickedProductsStorage : any = localStorage.getItem('clickedProductsArr');
      this.clickedProductsArr = JSON.parse(clickedProductsStorage);
      this.clickedProductsArr.push(product);
      localStorage.setItem('clickedProductsArr', JSON.stringify(this.clickedProductsArr));

      let productsArrStorage : any = localStorage.getItem('productsArrLength');
      this.productsArrLength = JSON.parse(productsArrStorage) + 1;
      this.onButtonClick.emit(this.productsArrLength);
      localStorage.setItem('productsArrLength', JSON.stringify(this.productsArrLength));
    }
  };

  searchProduct(product : any): any {
    if
    (
    this.searchValue.match(this.regex) ||
    product.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    product.title.toUpperCase().includes(this.searchValue.toUpperCase()) ||
    product.title.toLowerCase().includes(this.searchValue) ||
    product.title.toUpperCase().includes(this.searchValue)
    )
    {
      return 'flex';
    }
    else {
      return 'none';
    }
  };
}