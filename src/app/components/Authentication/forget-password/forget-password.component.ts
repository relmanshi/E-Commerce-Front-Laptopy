import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { EmailService } from 'src/app/services/Authentication/email.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  respomseError: String = '';
  constructor(
    private authService: AuthenticationService,
    private routerService: Router,
    private emailService: EmailService
  ) {}

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  ConfirmEmail(e: Event) {
    const email = this.form.controls.email.value ?? '';
    this.emailService.setEmail(email);
    this.authService.Forget_Password(email).subscribe(
      (result: any) => {
        // console.log(result);
        this.routerService.navigateByUrl('/Authentication/verify-code');
      },
      (e) => {
        // handle error
        this.respomseError = 'Cannot Send Email';
        // console.log(e.error);
      }
    );
  }
}
