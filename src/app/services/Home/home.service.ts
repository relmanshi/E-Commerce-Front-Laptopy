import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly myClient:HttpClient) { }


  private readonly SpecialOffers_URl="https://localhost:7064/api/Home/SpecialOffers";
private readonly TopProducts_URL="https://localhost:7064/api/Home/TopProducts";
private readonly NewProducts_URL="https://localhost:7064/api/Home/NewProducts";



GetSpecialOffers(){
      return this.myClient.get(this.SpecialOffers_URl);
  }




GetTopProducts(){
  return this.myClient.get(this.TopProducts_URL);
}

GetNewProducts(){
return this.myClient.get(this.NewProducts_URL);
}
}






