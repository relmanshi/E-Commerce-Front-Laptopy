import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ToastrService ,IndividualConfig} from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  Categories : any

  constructor(private toastr: ToastrService,private readonly CategoryService: CategoryService, private dialog : MatDialog) {
    this.fetchCategory()
    this.CategoryService.Categories$.subscribe({
      next: (data)=>{
        this.Categories = data
      }
    })
  }

  public fetchCategory() {
    this.CategoryService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public del(id: any) {
    if (confirm("Are you sure you want to delete this Category?")) {
      this.CategoryService.DeleteCategory(id).subscribe({
        next: () => {
          this.fetchCategory()
       
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


  openAddPopup() {
    this.dialog.open(AddCategoryComponent).addPanelClass("popupComponent");
  }

  openEditPopup(id : any) {
    this.dialog.open(EditCategoryComponent, {data:{Id : id}}).addPanelClass("popupComponent");
  }
}
