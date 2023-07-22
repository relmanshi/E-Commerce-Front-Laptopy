import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { productOperation } from 'src/app/services/Dashboard/productOperation.service';
import { productGetUpdate } from 'src/app/Dtos/Dashboard/productGetUpdate';
import { AddProductDto } from 'src/app/Dtos/Dashboard/AddProductDto';
import { productEditDto } from 'src/app/Dtos/Dashboard/productEditDto';
import { EditImagePopUpComponent } from '../edit-image-pop-up/edit-image-pop-up.component';
import { basmagaedit } from 'src/app/Dtos/Dashboard/basmagaedit';
import { basmagaGet } from 'src/app/Dtos/Dashboard/basmagaGet';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  property: basmagaedit = new basmagaedit();
  oldProperty: basmagaGet = new basmagaGet();
  snackBar: any;
  ImageUrls: any;

  constructor(
    private productOperation: productOperation,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private categoryService:CategoryService
  ) { }

  private listsData: any;

  selectedCategory = 1;
  categories: any[] = [];
  newImages: File[] = [];
  selectedImages: File[] = [];
  storedImages: string[] = [];
  imageUrl!: SafeUrl;

  ngOnInit(): void {
    this.populateListsData();

    const propertyIdAsString:any = this.route.snapshot.paramMap.get('id');
    if (propertyIdAsString) {
      const propertyId:number=propertyIdAsString;
      this.getPropertyData(propertyId);
    }
  }

  //get all categories
  populateListsData(): void {
    this.categoryService.GetAllCategories().subscribe({
      next: (data) => {
        console.log(data)
        this.listsData = data;

        this.categories = this.listsData;
        console.log(this.categories);
       
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Get list data completed successfully');
      }
    });
  }

  //uploadphotos to get imagesurls
  uploadPhotos(e: Event): void {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    // Delete selected images
    const deletedImages = Array.from(input.files || []).map(file => file.name);

    // Remove deleted images from the storedImages array
    this.storedImages = this.storedImages.filter(url => !deletedImages.includes(url));

    if (files.length === 0) {
      return;
    }

    const filesToUpload = files;
    // Upload each file and save the property data after each successful upload
    filesToUpload.forEach((file) => {
      this.productOperation.Upload(file).subscribe(
        (response) => {
          console.log(response);
          // Add the image URL to the storedImages array
          this.storedImages.push(response.url);
          console.log(this.storedImages);

        },
        (error) => {
          console.log(error);
          // Handle error during image upload
        }
      );
    });
    // Reset the input element's value to clear the selected images
    input.value = '';
  }

  deleteImage(imageUrl: string): void {
    // Remove the image URL from the storedImages array
    this.storedImages = this.storedImages.filter(url => url !== imageUrl);
  }



  openImagePopup(): void {
    const dialogRef = this.dialog.open(EditImagePopUpComponent, {
      data: {
        storedImages: this.storedImages,
        oldPropertyImages: this.oldProperty.ImagesURLs
      },
      maxHeight: '70vh',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe((result: { storedImages: string[], oldPropertyImages: string[] }) => {
      if (result) {
        this.storedImages = result.storedImages;
        this.oldProperty.ImagesURLs = result.oldPropertyImages;
        console.log('Updated storedImages:', this.storedImages);
        console.log('Updated oldPropertyImages:', this.oldProperty.ImagesURLs);
      }
    });
  }






 

  getPropertyData(propertyId: number): void {
    this.productOperation.getProductById(propertyId).subscribe(
      (data) => {
        console.log(data)
        this.oldProperty.name = data.name;
        this.oldProperty.ImagesURLs = data.images.map((image: any) => image);
        console.log(this.oldProperty.ImagesURLs);
        this.oldProperty.id = data.id;      
        this.oldProperty.categories = data.categories;     
        this.oldProperty.description = data.description;
        this.oldProperty.price = data.price;
        this.oldProperty.discount = data.discount;
        this.oldProperty.model = data.model;


        

        // Set the preselected amenities

        // Find the selected country
        
        // Find the selected category
        const selectedCategory = this.categories.find((category) => category.id === this.oldProperty.categoryID);
        if (selectedCategory) {
          this.selectedCategory = selectedCategory.id;
        }

      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Get property data completed successfully');
      }
    );
  }
  // deleteOldImage(imageUrl: string): void {
  //   // Remove the image URL from the storedImages array
  //   this.oldProperty.ImagesURLs = this.oldProperty.ImagesURLs.filter(url => url !== imageUrl);
  // }

  


  updateProperty(propertyForm: NgForm): void {
    if (propertyForm.invalid) {
      return;
    }

    // Set the updated property data
    const updatedProperty: basmagaedit = {
      id: this.oldProperty.id,
      name: this.oldProperty.name.trim(),
      ImagesURLs: this.storedImages.concat(this.oldProperty.ImagesURLs), // Concatenate the existing images with the new images
      price: this.oldProperty.price,
      categoryID: +this.selectedCategory,
      description: this.oldProperty.description.trim(),
      discount:this.oldProperty.discount,
      model:this.oldProperty.model


    };

    console.log('Updated Property:', updatedProperty); // Log the updated property object

    this.productOperation.EditProduct(updatedProperty).subscribe(
      () => {
        console.log('Property updated successfully');
        this.router.navigate(["/dashboard/products"])
        // this.router.navigate(['HostDashboardComponent'], { queryParams: { showHostProperty: true } });
        // Show snackbar message
        // this.snackBar.open('Property Updated successfully', 'Close', {
        //   duration: 4000, // Duration in milliseconds
        //   verticalPosition: "top",
        // });
      },
      (error) => {
        console.log('Error updating property:', error);
      }
    );
  }
}

