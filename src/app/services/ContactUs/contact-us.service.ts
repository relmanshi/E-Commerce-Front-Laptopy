import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUs } from 'src/app/Dtos/ContactUs/ContactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor( private myClient:HttpClient) { }


  sendMessage(message:ContactUs)
  {
    return this.myClient.post("https://localhost:7064/api/ContactUs",message);
  }
}
