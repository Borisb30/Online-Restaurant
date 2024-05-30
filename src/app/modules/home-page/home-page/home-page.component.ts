import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../core/services/restaurant/restaurant.service';
import { ProductsModel } from '../../../shared/models/products.model';
import { Products } from '../../../shared/products/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackBarComponent } from '../../../core/component/info-snack-bar/info-snack-bar.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  categoryItems: string[] = [
    'Salads', 'Soups', 'Chicken-Dishes', 'Beef-Dishes', 'Seafood-Dishes', 'Vegetable-Dishes',
    'Bits&Bites', 'On-The-Side', 'არცერთი'
  ];
  hottnes: number[] = [0, 1, 2, 3, 4];
  selectedCategory!: string;
  selectedHottnes: number = 0;
  withNuts!: number | null;
  vegan!: number | null;
  cartStorage: ProductsModel[] = [];
  productList!: ProductsModel[];
  filteredProducts!: ProductsModel[];
  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.productList = Products;
    this.filteredProducts = [...this.productList];
    // this.getApiInfo();
    this.cartStorage = this.getStorageItems();
  }

  receiveCategory(items: string) {
    if (items == 'არცერთი') {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = items;
    }
  }
  getStorageItems() {
    let storageItems = localStorage.getItem('cartStorage');
    if (storageItems) {
      let cartItems = JSON.parse(storageItems);
      return cartItems;
    } else {
      return [];
    }
  }
  receiveHottnes(hottnes: number) {
    this.selectedHottnes = hottnes;

  }

  addToCart(element: ProductsModel) {
    const productInCart = this.cartStorage.find(product => product.id === element.id);

    if (productInCart) {
      productInCart.quantity = (productInCart.quantity || 0) + 1;
    } else {
      element.quantity = 1;
      this.cartStorage.push(element);
    }
    this.snackbarAdapter(`${element.name} კალათში წარმატებით დაემატა`, true,2)
    localStorage.setItem('cartStorage', JSON.stringify(this.cartStorage));
  }

  // getApiInfo() {
  //   this.restaurantService.getRestaurantInfo().subscribe(res => {
  //     console.log(res)
  //   })
  // }
  addToStorage() {

    localStorage.setItem('cartStorage', JSON.stringify(this.cartStorage));

    console.log(localStorage.getItem('cartStorage')?.length)
  }
  filter() {
    this.filteredProducts = this.productList.filter(item => {
      const categoryMatch = !this.selectedCategory || item.categories === this.selectedCategory;
      const withNutsMatch = this.withNuts === undefined || (this.withNuts === 1 ? item.withNuts : !item.withNuts);
      const veganMatch = this.vegan === undefined || (this.vegan === 3 ? item.vegan : !item.vegan);
      const hottnesMatch = this.selectedHottnes === undefined || item.hottnes === this.selectedHottnes;

      return categoryMatch && withNutsMatch && veganMatch && hottnesMatch;
    });
  }

  clear() {
    this.selectedCategory = 'არცერთი';
    this.selectedHottnes = 0;
    this.withNuts = null;
    this.vegan = null;
    this.filteredProducts = [...this.productList];
  }

  snackbarAdapter(msg: string, success: boolean, sec?: number) {

    const statusClass = success ? 'success-snackbar' : 'error-snackbar';

    this.snackBar.openFromComponent(InfoSnackBarComponent, {
      data: `<i class="fal fa-info-circle mr-2"></i> ${msg}`,
      duration: sec ? sec * 1000 : 5 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar', statusClass]
    });

  }
}
