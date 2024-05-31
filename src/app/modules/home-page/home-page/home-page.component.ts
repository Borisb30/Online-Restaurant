import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../core/services/restaurant/restaurant.service';
import { AddBasketPOST, DropdownModel, GetFilteredItems, ProductInBasketModel, ProductsModel, UpdateBasketPUT } from '../../../shared/models/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackBarComponent } from '../../../core/component/info-snack-bar/info-snack-bar.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  categoryItems!: DropdownModel[];
  hottnes: number[] = [0, 1, 2, 3, 4];
  spiciness: number = 0;
  selectedCategory!: DropdownModel | null;
  nuts!: boolean;
  vegeterian!: boolean;
  productList: ProductsModel[] = [];
  cartStorage: ProductInBasketModel[] = [];
  loadingFlag: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllBasketItems();
  }

  receiveCategory(category: DropdownModel) {
    if (category.id == 0) {
      this.selectedCategory = { id: 0, name: 'არცერთი' };
    } else {
      this.selectedCategory = category;
    }
  }

  receiveHottnes(spiciness: number) {
    this.spiciness = spiciness;

  }

  addToCart(element: ProductsModel) {
    const productIndex = this.cartStorage.findIndex(product => product.product.id === element.id);

    let model: AddBasketPOST | UpdateBasketPUT;
    if (productIndex == -1) {
      model = {
        quantity: 1,
        price: element.price,
        productId: element.id
      };
      this.restaurantService.addToBasket(model).subscribe(
        res => {
          this.getAllBasketItems();
        });
    } else {
      model = {
        quantity: this.cartStorage[productIndex].quantity + 1,
        price: element.price,
        productId: element.id
      };
      this.restaurantService.updateBasket(model).subscribe(
        res => {
          this.getAllBasketItems();
        });
    }
    this.snackbarAdapter(`${element.name} კალათში წარმატებით დაემატა`, true, 2);
  }

  getAllProducts() {
    this.loadingFlag = true;
    this.restaurantService.getAllProducts().pipe(finalize(() => { this.loadingFlag = false; })).subscribe(res => {
      this.productList = res;
      this.mapProductsToCategories();
    })
  }
  getAllCategories() {
    this.loadingFlag = true;
    this.restaurantService.getAllCategories().pipe(finalize(() => { this.loadingFlag = false; })).subscribe(res => {
      this.categoryItems = res;
      this.categoryItems.push({ id: 0, name: 'არცერთი' });
      this.mapProductsToCategories();
    })
  }

  getAllBasketItems() {
    this.loadingFlag = true;
    this.restaurantService.getAllBasketItems().pipe(finalize(() => { this.loadingFlag = false; })
    ).subscribe(res => {
      this.cartStorage = res;
    })
  }

  filter() {
    let model: GetFilteredItems = {
      vegeterian: this.vegeterian ? 1 : 2,
      nuts: this.nuts ? 1 : 2,
      spiciness: this.spiciness,
      categoryId: this.selectedCategory?.id ?? null,
    }
    this.restaurantService.getFilteredProducts(model).pipe
      (finalize(() => { this.loadingFlag = false; })
      ).subscribe(res => {
        this.productList = res;
        this.mapProductsToCategories();
      })
  }

  clear() {
    this.selectedCategory = { id: 0, name: 'არცერთი' };
    this.spiciness = 0;
    this.nuts = false;
    this.vegeterian = false;
    this.getAllProducts();
    this.snackbarAdapter(`ფილტრი წარმატებით გასუფთავდა`, true, 3)
  }

  mapProductsToCategories() {
    this.productList = this.productList.map(product => {
      const category = this.categoryItems.find(cat => cat.id === +product.categoryId);
      return {
        ...product,
        categoryName: category ? category.name : 'Unknown'
      };
    });
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
