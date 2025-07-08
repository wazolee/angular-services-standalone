import { Component, ViewChild } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { catchError, finalize, Observable, of } from 'rxjs';
import { ProductDetailsComponent } from '@shared/product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { MyButtonComponent } from "@shared/my-button/my-button.component";
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'bot-catalog',
  imports: [CommonModule, ProductDetailsComponent, MyButtonComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products: Observable<Product[]> = this.productsService.getProducts();
  buttons = [
    { id: 'btn1', text: 'Fetch Data 1', loading: false },
    { id: 'btn2', text: 'Fetch Data 2', loading: false },
    { id: 'btn3', text: 'Fetch Data 3', loading: false },
  ];

  button = {id:'b1', text: 'alma', loading: false};

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private http:HttpClient) { }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  handleButtonClick(buttonId: string | number | null) {
    if (buttonId === null) return;

    // Frissítjük az adott gomb loading állapotát
    this.buttons = this.buttons.map(btn =>
      btn.id === buttonId ? { ...btn, loading: true } : btn
    );

    this.http.get(`https://api.example.com/data/${buttonId}`)
      .pipe(
        catchError(() => of(null)),
        finalize(() => { setTimeout(() => 
          // Leállítjuk a loading állapotot az adott gombhoz
          this.buttons = this.buttons.map(btn =>
            btn.id === buttonId ? { ...btn, loading: false } : btn
          ), 2000);
        })
      )
      .subscribe(response => {
        console.log(`API response for ${buttonId}:`, response);
      });
  }

  handleAButton(buttonId:string | number | null){
    this.button.loading = true;
    setTimeout(() => {
      this.button.text = "kisfaszom";
      this.button.loading= false;
    }, 1000);
  }
  // handleButtonClick() {
  //   this.http.get('https://api.example.com/data')
  //     .pipe(
  //       catchError(() => of(null)),
  //       finalize(() => setTimeout(() => this.loadingButton.stopLoading(),3000))
  //     )
  //     .subscribe(response => {
  //       console.log('API response:', response);
  //     });
  // }
}
