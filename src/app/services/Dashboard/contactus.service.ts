import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private readonly myClient:HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/ContactUs";
  
  public GetData(){
    return this.myClient.get(this.BaseUrl);
  }
}
