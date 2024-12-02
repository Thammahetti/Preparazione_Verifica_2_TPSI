import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  searchTerm: string = '';
  products: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
    this.setupSearch();
  }

  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.getProducts(searchTerm);
    });
  }

  fetchData(): void {
    this.searchSubject.next(this.searchTerm);
  }

  getProducts(searchTerm: string): void {
    if (searchTerm.trim()) {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page_size=10&json=true`;
      this.http.get(url).subscribe({
        next: (response: any) => {
          this.products = response.products || [];
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.products = [];
        }
      });
    } else {
      this.products = [];
    }
  }

  viewProductDetails(productId: string): void {
 
    this.router.navigate(['/product-details', productId]);
  }
}
