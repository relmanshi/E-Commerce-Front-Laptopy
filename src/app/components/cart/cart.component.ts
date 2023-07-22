import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductToCart, CartProduct, EditProductQuantity } from 'src/app/Dtos/Cart/cart';
import { CartService } from 'src/app/services/Cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts:CartProduct[]=[];
  totalPrice:number=0;
  constructor(private router:Router, private cartService:CartService){}
  ngOnInit(): void {
   this.getAllProductsInCart();
  }
  
  getAllProductsInCart()
  {
    this.cartService.getAllProductsInCart().subscribe({
      next:(data)=>{
        console.log("next");
        this.cartProducts=data   ;
        console.log(this.cartProducts);
        for(let product of this.cartProducts)
        {
          this.totalPrice+=product.priceAfter*product.quantity;
        }
        console.log(this.totalPrice);
        
      },
      error:(error)=>
      {
        console.log("error");
        console.log(error);
      }
    });
  }

 CalculateTotalPrice()
 {
    this.totalPrice=0;
    for(let product of this.cartProducts)
    {
      this.totalPrice+=product.priceAfter*product.quantity;
    }
    console.log(this.totalPrice);
 }
  DeleteFromCart(id: number) 
  {
    this.cartService.DeleteProductFromCart(id).subscribe({
      next:(data)=>
      {
        console.log("next");
        this.cartProducts = this.cartProducts.filter((product:CartProduct) => product.id !== id);
        console.log(data);
        this.CalculateTotalPrice();
        this.cartService.getCartProductsCounter();



      },
      error:(error)=>{
        console.log("error");
        console.log(error);
        this.cartProducts = this.cartProducts.filter((product:CartProduct) => product.id !== id);      
        this.CalculateTotalPrice();
        this.cartService.getCartProductsCounter();


      }
    });
  }

  UpdateProductQuantity(productId:number,quantity:number)
  {
    console.log(productId,quantity);
    let product = new EditProductQuantity;
    product.productId=productId;
    product.quantity=+quantity;
    this.cartService.EditProductQuantity(product).subscribe({
      next:(data)=>
      {
        console.log("next");
        console.log(data);
        this.CalculateTotalPrice();
        this.cartService.getCartProductsCounter();


      },
      error:(error)=>{
        console.log("error");
        console.log(error);
        this.CalculateTotalPrice();
        this.cartService.getCartProductsCounter();

      }

    });
  }

  
//abdo
//test again
//test github desktop
  
}



  // another way : use it with step up step down if u want 
  // UpdateProductQuantity(step:number,productId:number)
  // {
  //   let product = new AddProductToCart;
  //   product.productId=productId;
  //   product.quantity=step;
  //   this.cartService.AddProductToCart(product).subscribe({
  //     next:(data)=>
  //     {
  //       console.log(data);
  //     },
  //     error:(error)=>{console.log(error)}
  //   });
  // }

  

// another way by using ngmodel and ngmodelchange
// quantityChanged=false;
//   onQuantityChange() {
//     console.log("onQuantityChange");
//     this.quantityChanged=true;
//   }

//   onQuantityBlur(productId: number, quantity: number) {
//     console.log("onQuantityBlur");
    
//     // Update product order with new quantity value and ID
//     let product = new EditProductQuantity;
//     product.productId=productId;
//     product.quantity=+quantity;
//     this.cartService.EditProductQuantity(product).subscribe({
//       next:(data)=>
//       {
//         console.log(data);
//       },
//       error:(error)=>{console.log(error)}
//     });
//     // Reset quantityChanged flag
//     this.quantityChanged = false;
//   }
// }


