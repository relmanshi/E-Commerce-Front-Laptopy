import { Component} from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent{
  orders:any;
  address:any;
  constructor(public service:UserProfileService, public auth:AuthenticationService){
    this.service.getUserAddress().subscribe({
      next:(data)=>{
        console.log(data)
        this.address=data;
      },
            error:(err)=>{console.log(err)}
  })
    this.service.getOrders().subscribe({
      next:(data)=>{
        console.log(data)
        this.orders=data;
      },
            error:(err)=>{console.log(err)}
  })
  }

  
}
