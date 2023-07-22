import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { productOperation} from 'src/app/services/Dashboard/productOperation.service';
import{CategoryService} from 'src/app/services/Dashboard/category.service'
import{AddProductDto} from 'src/app/Dtos/Dashboard/AddProductDto';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit{
ImageUrls:string[]=[];
categories:any;
selectedCategory:number=0;
selectedImages:File[]=[];

product: AddProductDto=new AddProductDto();


constructor(private toastr: ToastrService,private productService:productOperation,
  private categoriesService:CategoryService,private router:Router,private snackBar: MatSnackBar)
  {}
  
  ngOnInit(): void {
    this.categoriesService.GetAllCategories().subscribe({
      next:(data)=>{this.categories=data},
      error:(err)=>{console.log(err)}
    })
}

addProduct(productForm:NgForm):void{
  if(productForm.invalid)return;
  this.productService.Upload2(this.selectedImages).subscribe((responses :any)=>{
    console.log(responses);
    this.ImageUrls=responses;


  this.product.Name=this.product.Name.trim(),
  this.product.Price=+this.product.Price;
  this.product.Description=this.product.Description;
  this.product.Image=this.ImageUrls;

  this.product.Model=this.product.Model.trim();
  this.product.Discount=this.product.Discount;
  this.product.CategoryID=this.selectedCategory;
  this.productService.AddProduct(this.product).subscribe(
    {
      next:(data)=>{console.log(data);this.router.navigate(["dashboard/products"])},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log("product adding success")
    }
    }
  )
   this.toastr.success("product adding success");

    },
    (error)=>{console.log("error uploading photos:",error);
   
      } )  
  
}

 uploadPhotos(e:Event){
    const input= e.target as HTMLInputElement  ;
   this.selectedImages=Array.prototype.slice.call(input.files) as File[]; 
   console.log(this.selectedImages);
    
    }

// uploadPhotos(e:Event){
//   const input= e.target as HTMLInputElement  ;
//   const files=Array.prototype.slice.call(input.files) as File[];
//    if(files.length===0)return;
//   const uploadObservables=files.map((file)=>{
//     return this.productService.Upload(file);
//   });
//  forkJoin(uploadObservables).subscribe((responses :any)=>{
//   console.log(responses);
//   this.ImageUrls=responses.map((response: any)=>response.url);
//   //console.log(this.ImageUrls);
//   },
//   (error)=>{console.log("error uploading photos:",error);
 
//     } )  
//   }


 
  
}


