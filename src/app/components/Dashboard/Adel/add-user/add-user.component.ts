import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterAdminDto } from 'src/app/Dtos/Dashboard/RegisterAdminDto';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  RegisterError: any;
  IsRegisterd: any;
  role:any

  constructor(private userService: UserService, private routerService: Router) { }

  form = new FormGroup({
    fname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(7),
    ]),
    lname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(7),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
  });

  Register() {
    var credentials = new RegisterAdminDto();
    credentials.fname = this.form.controls.fname.value ?? '';
    credentials.lname = this.form.controls.lname.value ?? '';
    credentials.email = this.form.controls.email.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';
    credentials.role = this.form.controls.role.value ?? '';

    console.log(credentials)
    this.userService.AddAdmin(credentials).subscribe({
      next: () => {
        this.routerService.navigateByUrl('/dashboard/users');
      },
      error: (error) => {
        this.RegisterError = error;
        console.log(error)
        this.IsRegisterd = false;
      }
    });
  }
}
