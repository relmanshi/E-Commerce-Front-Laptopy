import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/Dashboard/order.service';
@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent {

  Orders : any
  constructor(private readonly OrderService: OrderService) {
    this.getOrders()
  }

  public getOrders() {
    this.OrderService.GetAllOrders().subscribe({
      next: (data) => {
        this.Orders = data
        console.log(this.Orders)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
