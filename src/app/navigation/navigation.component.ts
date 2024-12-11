import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CartComponent, CommonModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  searchValue : string = '';
  products : any;
  regex : RegExp = /[^A-Z ]/gi;

  @Output()
  onSearchInput : EventEmitter<string> = new EventEmitter<string>();

  @Output() 
  sendProductsLength : EventEmitter<number> = new EventEmitter();

  transferSearchValue(): void {
    this.onSearchInput.emit(this.searchValue.trim());
  };
  
  reciveProductsLength($event : number) {
    this.sendProductsLength.emit($event);
  };

  ngOnInit(): void {
    let allProducts : any = localStorage.getItem("products");
    this.products = JSON.parse(allProducts);
  };

  @Input()
  productQuantity : number = 0;

  @Input()
  productsArr : Array<object> = [];
};