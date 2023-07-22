import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct,AddProductToCart,EditProductQuantity, API } from 'src/app/Dtos/Cart/cart';
import { EditProductComponent } from 'src/app/components/Dashboard/Ahmed/edit-product/edit-product.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private myClient:HttpClient){}
  private baseUrl ="";
  public cartCounter$=new BehaviorSubject<number>(0);
  
  getAllProductsInCart()
  {
      return this.myClient.get<CartProduct[]>("https://localhost:7064/api/UserProductsCart")
  }
  AddProductToCart(AddProductToCart:AddProductToCart)
  {
    return this.myClient.post("https://localhost:7064/api/UserProductsCart/AddProduct",AddProductToCart);

  }
  EditProductQuantity(EditProductQuantity:EditProductQuantity)
  {
    return this.myClient.put("https://localhost:7064/api/UserProductsCart/UpdateProduct",EditProductQuantity);

  }
  DeleteProductFromCart(id:number)
  {
    return this.myClient.delete(`https://localhost:7064/api/UserProductsCart/DeleteProduct/${id}`);
  }

  getCartProductsCounter()
  {
      let counter = this.myClient.get<number>("https://localhost:7064/api/UserProductsCart/counter");
      counter.subscribe((data)=>{
          console.log(data);
          this.cartCounter$.next(data);
      })
      
  }
  

}
