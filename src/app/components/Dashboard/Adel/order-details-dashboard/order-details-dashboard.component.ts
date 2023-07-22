import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/Dashboard/order.service';
import { OrderEditDashboardComponent } from '../order-edit-dashboard/order-edit-dashboard.component';

@Component({
  selector: 'app-order-details-dashboard',
  templateUrl: './order-details-dashboard.component.html',
  styleUrls: ['./order-details-dashboard.component.css']
})

export class OrderDetailsDashboardComponent {

  Order: any;
  Id: any;

  constructor(private readonly route: ActivatedRoute, private readonly OrderService: OrderService, private dialog : MatDialog) {
    this.getOrder()
    this.OrderService.Order$.subscribe({
      next: (data)=>{
        this.Order = data
      }
    })
  }

  public getOrder() {
    this.Id = this.route.snapshot.params['id'];
    this.OrderService.GetOrderDetails(this.Id).subscribe({
      next: (data) => {
        this.Order = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openPopup() {
    this.dialog.open(OrderEditDashboardComponent, {data:{Id : this.Id}}).addPanelClass("popupComponent");
  }
}
