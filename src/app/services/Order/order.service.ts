import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from 'src/app/Dtos/Cart/cart';
import { orderAddress } from 'src/app/Dtos/OrderCheckout/OrderCheckout';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private myClient:HttpClient){}
  private baseUrl ="";
  
  GetAllProductsInCart()
  {
      return this.myClient.get<CartProduct[]>("https://localhost:7064/api/UserProductsCart")
  }
  GetAllUserAddresses()
  {
    return this.myClient.get<orderAddress[]>("https://localhost:7064/api/UserAddresses");

  }
  AddnewOrder(addressId:number)
  {
    return this.myClient.get("https://localhost:7064/api/Orders/MakeNewOrder/"+addressId);
  }


}
