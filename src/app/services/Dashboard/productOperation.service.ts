import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadFileDto } from 'src/app/Dtos/Dashboard/UploadFileDto';
import{Observable} from 'rxjs'
import { productEditDto } from 'src/app/Dtos/Dashboard/productEditDto';
import {AddProductDto } from 'src/app/Dtos/Dashboard/AddProductDto';
import { basmagaedit } from 'src/app/Dtos/Dashboard/basmagaedit';
import { ProductReadPaginationDto } from 'src/app/Dtos/Dashboard/ProductReadPaginationDto';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ListRange } from '@angular/cdk/collections';
@Injectable({
  providedIn: 'root'
})
export class productOperation {

  constructor(private myClient:HttpClient) { }
  Upload(file :File):Observable<UploadFileDto>
  {
    var form=new FormData();
    form.append("file",file)
    console.log(file);
    return this.myClient.post<UploadFileDto>("https://localhost:7064/api/Products/Dashboard/uploadImages",form)
  }

  

  Upload2(files :File[])
  {
    console.log("inside service");
    console.log(files);

     const form=new FormData();
     files.forEach(file => {
      form.append("files",file);
     });
    return this.myClient.post("https://localhost:7064/api/Products/Dashboard/uploadImages",form)
  }

  AllProducts(){
    return this.myClient.get("https://localhost:7064/api/Products/Dashboard/GetAllProducts");
  }
  public DeleteProduct(productId:any){
    return this.myClient.delete("https://localhost:7064/api/Products/Dashboard" + "/DeleteProduct/" + productId);
  }
  public AddProduct(product:AddProductDto)
  {
    return this.myClient.post("https://localhost:7064/api/Products/Dashboard/addProduct",product)
  }  
  public EditProduct(product:basmagaedit)
  {
    console.log("inside service :")
    console.log(product)
    return this.myClient.patch("https://localhost:7064/dashboard/editproduct/",product);
  } 
  public getProductById(productId:number):Observable<any>
  {
    return this.myClient.get("https://localhost:7064/api/Products/"+productId);
  }
  
  GetAllProductsInPagination(
    page: number,
    countPerPage: number): Observable<ProductReadPaginationDto> {
    return this.myClient.get<ProductReadPaginationDto>(`https://localhost:7064/api/Products/${page}/${countPerPage}`);
  }
}
