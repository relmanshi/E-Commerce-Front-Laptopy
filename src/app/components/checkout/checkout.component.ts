import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from 'src/app/Dtos/Cart/cart';
import { orderAddress } from 'src/app/Dtos/OrderCheckout/OrderCheckout';
import { CartService } from 'src/app/services/Cart/cart.service';
import { OrderService } from 'src/app/services/Order/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  userAddresses: orderAddress[] = [];
  choosenAddressId: number = 0;
  totalPrice: number = 0;
  defaultUserAddress: boolean = false;
  selectedIndex: number = -1;
  constructor(private toastr: ToastrService,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getAllProductsInCart();
    //  if (  !(this.cartProducts.length>0))  //( not working?? )check cart has products or not
    //   {
    //     this.router.navigate(["/cart"]);
    //   }
    this.getAllUserAddresess();
  }

  getAllUserAddresess() {
    this.orderService.GetAllUserAddresses().subscribe({
      next: (data) => {
        this.userAddresses = data;
        console.log(this.userAddresses);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllProductsInCart() {
    this.orderService.GetAllProductsInCart().subscribe({
      next: (data) => {
        this.cartProducts = data;
        console.log(this.cartProducts);
        for (let product of this.cartProducts) {
          this.totalPrice += product.priceAfter * product.quantity;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  AddnewOrder() {
    console.log(`choosenAddress id = ${this.choosenAddressId}`);
    //check user choose address and cart has items
    if (this.choosenAddressId > 0 && this.cartProducts.length > 0) {
      this.orderService.AddnewOrder(this.choosenAddressId).subscribe({
        next: (data) => {
          console.log(data);
          console.log('next');
          this.cartService.getCartProductsCounter();
          this.toastr.success("order Added Successfull ... redirect to Home Page", 'Success' );

        },
        error: (error) => {
          // why he enter the error path?
          console.log(error);
          console.log("error");
          this.toastr.success("order Added Successfull ... redirect to Home Page", 'Success',{
            timeOut: 2000,} );
          this.cartService.getCartProductsCounter();

          this.router.navigate(['/']);
        },
      });
    }
    //check cart has products or not
    else if (!(this.cartProducts.length > 0)) {
      this.router.navigate(['/cart']);
    }
    //check user choose address or not
    else if ( !(this.choosenAddressId>0) )
    {
      this.toastr.error("choose address");
    }
    
  }
  consolData(id: number) {
    this.choosenAddressId = id;
  }
}
