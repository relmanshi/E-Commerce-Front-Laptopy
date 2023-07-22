import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderEditDto } from 'src/app/Dtos/Dashboard/OrderEditDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private readonly myClient:HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/Orders/Dashboard/";
  
  public GetAllOrders(){
    return this.myClient.get(this.BaseUrl + "GetAllOrders");
  }

  public GetOrderDetails(OrderId : any){
    return this.myClient.get(this.BaseUrl + "GetOrderDetails/" + OrderId);
  }

  public EditOrder(credentials : OrderEditDto){
    return this.myClient.put("https://localhost:7064/api/Orders/Dashboard/EditOrder", credentials);
  }

  public Order$ = new BehaviorSubject<any>(null)
}
