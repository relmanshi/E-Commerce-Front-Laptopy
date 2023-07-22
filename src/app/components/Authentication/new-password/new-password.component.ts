import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordDto } from 'src/app/Dtos/user/ResetPasswordDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { EmailService } from 'src/app/services/Authentication/email.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {
  email: string = '';
  respomseError: String = '';
  constructor(
    private emailService: EmailService,
    private authService: AuthenticationService,
    private routerService: Router
  ) {}
  ngOnInit(): void {
    this.email = this.emailService.getEmail();
  }

  form = new FormGroup({
    newPassword: new FormControl<string>('', [Validators.required]),
    confirmNewPassword: new FormControl<string>('', [Validators.required]),
  });

  ResetPassword() {
    var credentials = new ResetPasswordDto();
    credentials.email = this.email;
    credentials.newPassword = this.form.controls.newPassword.value ?? '';
    credentials.confirmNewPassword =
      this.form.controls.confirmNewPassword.value ?? '';

    this.authService.Reset_Password(credentials).subscribe(
      (result: any) => {
        console.log(result);
        this.routerService.navigateByUrl('Authentication/login');
      },
      (e) => {
        this.respomseError = e.error;
      }
    );
  }
}
