/* import { Component } from '@angular/core';
import { productOperation } from 'src/app/services/Dashboard/productOperation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
products:any;
IsDeleted: any;
constructor(private myService:productOperation)
{
 this.getProducts();
}
public getProducts()
{
  this.myService.AllProducts().subscribe({
    next:(data)=>{this.products=data},
    error:(err)=>{console.log(err)}
  })
}

public del(id: any) {
  if (confirm("Are you sure you want to delete this Product?")) {
    this.myService.DeleteProduct(id).subscribe({
      next: () => {
        this.IsDeleted = true
        this.getProducts()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
}
 */




import { Component } from '@angular/core';
import { productOperation } from 'src/app/services/Dashboard/productOperation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
products:any;
IsDeleted: any;
totalCount = 0;
  page = 1;
  countPerPage = 10;
constructor(private myService:productOperation)
{
 this.getProductsInPagination(1);
}

 public getProductsInPagination(page: any) {
    this.myService
      .GetAllProductsInPagination(page, this.countPerPage)
      .subscribe({
        next: (data) => {
          (this.totalCount = data.totalCount),
            (this.products = data.products),
            (this.page = page);
            for(let product of this.products)
            {
              console.log(product)
            }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

public del(id: any) {
  if (confirm("Are you sure you want to delete this Product?")) {
    this.myService.DeleteProduct(id).subscribe({
      next: () => {
        this.IsDeleted = true
        this.getProductsInPagination(1)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
}
