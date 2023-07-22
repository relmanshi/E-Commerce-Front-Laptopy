import { Component } from '@angular/core';
import { ContactusService } from 'src/app/services/Dashboard/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  contacts: any

  constructor(private contactuser: ContactusService) {
    this.fetchdata()
  }

  public fetchdata() {
    console.log("ee")
    this.contactuser.GetData().subscribe({
      next: (data) => {
        this.contacts = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
