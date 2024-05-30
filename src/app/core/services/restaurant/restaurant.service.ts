import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  constructor(
    private http: HttpClient
  ) { }

getRestaurantInfo(){
  return this.http.get('https://rapi.stepprojects.ge:444/swagger/index.html')
}
}
