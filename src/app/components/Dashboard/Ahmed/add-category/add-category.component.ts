import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CategoryAddDto } from 'src/app/Dtos/Dashboard/CategoryAddDto';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(private toastr: ToastrService,
    private categoryService: CategoryService, 
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    ) {

  }

  form = new FormGroup({
    CategoryName: new FormControl<string>('')
  });

  addCategory() {
    var credentials = new CategoryAddDto();
    credentials.name = this.form.controls.CategoryName.value ?? '';

    this.categoryService.AddCategory(credentials).subscribe({
      next: () => {
        this.dialogRef.close();
        this.toastr.success("Category added successfully");
        this.categoryService.GetAllCategories().subscribe({
          next: (data)=>{
            this.categoryService.Categories$.next(data)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

}
