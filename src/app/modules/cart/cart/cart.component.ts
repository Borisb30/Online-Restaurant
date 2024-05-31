import { Component, OnInit } from '@angular/core';
import { ProductInBasketModel, ProductsModel, UpdateBasketPUT } from '../../../shared/models/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackBarComponent } from '../../../core/component/info-snack-bar/info-snack-bar.component';
import { RestaurantService } from '../../../core/services/restaurant/restaurant.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartStorage: ProductInBasketModel[] = [];
  itemsQuantity!: number;
  totalPrice!: number;
  loadingFlag: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    
    this.getAllBasketItems();
  }

  getAllBasketItems(){
    this.loadingFlag = true;
    this.restaurantService.getAllBasketItems().pipe(finalize(() => { this.loadingFlag = false; })
  ).subscribe(res => {
      this.cartStorage = res;
      this.totalPrice = this.getTotalPrice();
      this.itemsQuantity = this.getItemsQuantity();
    })
  }
  getItemsQuantity() {
    let quantity = 0;
    this.cartStorage.forEach((element) => {
      if (element.quantity) {
        quantity += element.quantity;
      }
    })
    return quantity;
  }

  getTotalPrice()  {
    let total = 0;
    this.cartStorage.forEach((element) => {
      total += element.price * (element.quantity ?? 1);
    });
    return total;
  }

  addItem(element: ProductsModel): void {
    this.loadingFlag = true
    const productIndex = this.cartStorage.findIndex(product => product.product.id === element.id);
    let model: UpdateBasketPUT;
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

  removeItem(element: ProductsModel): void {
    const foundProduct = this.cartStorage.find(product => product.product.id === element.id);
    if( foundProduct && foundProduct?.quantity > 1) {
      let model: UpdateBasketPUT;
      model = {
        quantity: foundProduct.quantity - 1,
        price: element.price,
        productId: element.id
      };
      this.restaurantService.updateBasket(model).subscribe(
        res => {
          this.getAllBasketItems();
        });
    } else {
      this.restaurantService.deleteProduct(element.id).subscribe(
        res=> {
          
          this.getAllBasketItems();
        }
      )
    }

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
