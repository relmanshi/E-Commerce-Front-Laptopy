import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderEditDto } from 'src/app/Dtos/Dashboard/OrderEditDto';
import { OrderService } from 'src/app/services/Dashboard/order.service';

@Component({
  selector: 'app-order-edit-dashboard',
  templateUrl: './order-edit-dashboard.component.html',
  styleUrls: ['./order-edit-dashboard.component.css'],
})
export class OrderEditDashboardComponent {
  selectedValue :any;

  constructor(
    private readonly orderService: OrderService,
    private dialogRef: MatDialogRef<OrderEditDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Id : any }
  ) {}

  EditOrder() {
    var credentials = new OrderEditDto();
    credentials.id = this.data.Id;
    credentials.orderStatus = this.selectedValue

    this.orderService.EditOrder(credentials).subscribe({
      next: () => {
        this.dialogRef.close();
        this.orderService.GetOrderDetails(this.data.Id).subscribe({
          next: (data)=>{
            this.orderService.Order$.next(data)
          }
        })
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}