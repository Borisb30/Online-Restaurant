import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../../../shared/models/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackBarComponent } from '../../../core/component/info-snack-bar/info-snack-bar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartStorage!: ProductsModel[];
  itemsQuantity!: number;
  totalPrice!: number;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cartStorage = this.getStorageItems();
    this.itemsQuantity = this.getItemsQuantity()
    this.totalPrice = this.getTotalPrice();
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

  getItemsQuantity(): number {
    let quantity = 0;
    this.cartStorage.forEach((element) => {
      if (element.quantity) {
        quantity += element.quantity;
      }
    })
    return quantity;
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartStorage.forEach((element) => {
      total += element.price * (element.quantity ?? 1);
    });
    return total;
  }

  addItem(element: ProductsModel): void {
    const item = this.cartStorage.find(item => item.id === element.id);
    if (item) {
      item.quantity = (item.quantity || 0) + 1;
    } else {
      element.quantity = 1;
      this.cartStorage.push(element);
    }
    this.updateCart();
  }

  removeItem(element: ProductsModel): void {
    const item = this.cartStorage.find(item => item.id === element.id);
    if (item && item.quantity) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.cartStorage = this.cartStorage.filter(item => item.id !== element.id);
      }
      this.updateCart();
    }
  }

  updateCart(): void {
    localStorage.setItem('cartStorage', JSON.stringify(this.cartStorage));
    this.itemsQuantity = this.getItemsQuantity();
    this.totalPrice = this.getTotalPrice();
  }

  buy() {
    if (this.cartStorage.length) {
      this.snackbarAdapter(`თქვენ წარმატებით შეიძინეთ კერძები რაოდენობით: ${this.itemsQuantity}, რომლის ჯამური ფასია: ${this.totalPrice} ლარი`, true)
      this.cartStorage = [];
      this.updateCart();
    } else {
      this.snackbarAdapter(`კალათი ცარიელია`, false)
    }
  }

  clearCart() {
    if (this.cartStorage.length) {
      this.snackbarAdapter(`კალათა წარმატებით გასუფთავდა`, true)
      this.cartStorage = [];
      this.updateCart();
    } else {
      this.snackbarAdapter(`კალათი ცარიელია`, false)
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
