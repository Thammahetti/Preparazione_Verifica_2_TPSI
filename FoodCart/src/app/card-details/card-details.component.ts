import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  productId: string = '';
  productDetails: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Ottieni l'ID del prodotto dalla route
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(productId: string): void {
    const url = `https://world.openfoodfacts.org/api/v0/product/${productId}.json`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.productDetails = response.product || null;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.productDetails = null;
      }
    });
  }
}
