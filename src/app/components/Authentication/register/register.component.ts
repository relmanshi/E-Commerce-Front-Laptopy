import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/Dtos/user/RegisterDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  respomseError: any = [];
  constructor(
    private authService: AuthenticationService,
    private routerService: Router
  ) {}

  form = new FormGroup({
    fname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    lname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  Register() {
    var credentials = new RegisterDto();
    credentials.fname = this.form.controls.fname.value ?? '';
    credentials.lname = this.form.controls.lname.value ?? '';
    credentials.email = this.form.controls.email.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Register(credentials).subscribe(
      (result: any) => {
        console.log(result);
        this.routerService.navigateByUrl('/');
      },
      (r) => {
        console.log(r.error);
        this.respomseError = [];
        // let test: any = r.error;
        for (let i of r.error) {
          if (i.code == 'DuplicateUserName') {
            continue;
          }
          this.respomseError.push(i.description);
          console.log(i);
        }
        console.log(this.respomseError);
      }
    );
  }
}
