import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBasketPOST, DropdownModel, GetFilteredItems, ProductInBasketModel, ProductsModel, UpdateBasketPUT } from '../../../shared/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl: string = 'https://restaurant.stepprojects.ge/api'

  constructor(
    private http: HttpClient
  ) { }

  getAllBasketItems() {
    return this.http.get<ProductInBasketModel[]>(this.apiUrl + '/Baskets/GetAll')
  }

  updateBasket(obj: UpdateBasketPUT) {

    return this.http.put(this.apiUrl + '/Baskets/UpdateBasket', obj);
  }

  addToBasket(obj: AddBasketPOST) {
    return this.http.post(this.apiUrl + '/Baskets/AddToBasket', obj);
  }

  deleteProduct(id: number) {

    return this.http.delete(this.apiUrl + '/Baskets/DeleteProduct/' + id, )
  }

  getAllCategories() {
    return this.http.get<DropdownModel[]>(this.apiUrl + '/Categories/GetAll')
  }

  getCategoryById(id: number) {
    let params = new HttpParams()
      .set('id', id ? id.toString() : '')
    return this.http.get<DropdownModel>(this.apiUrl + '/Categories/GetCategory', { params })
  }

  getAllProducts() {
    return this.http.get<ProductsModel[]>(this.apiUrl + '/Products/GetAll')
  }

  getFilteredProducts(obj: GetFilteredItems) {
    let params = new HttpParams()
      .set('vegeterian', obj.vegeterian == 1 ? true : false)
      .set('nuts', obj.nuts == 1 ? true : false)
      .set('spiciness', obj.spiciness ? obj.spiciness : '')
      .set('categoryId', obj.categoryId ? obj.categoryId : '')
    return this.http.get<ProductsModel[]>(this.apiUrl + '/Products/GetFiltered', { params })
  }
}
