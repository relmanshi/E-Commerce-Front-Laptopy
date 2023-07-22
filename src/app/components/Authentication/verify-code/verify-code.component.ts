import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmCodeDto } from 'src/app/Dtos/user/ConfirmCodeDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { EmailService } from 'src/app/services/Authentication/email.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  email: string = '';
  respomseError: string = '';
  constructor(
    private authService: AuthenticationService,
    private routerService: Router,
    private emailService: EmailService
  ) {}
  ngOnInit(): void {
    this.email = this.emailService.getEmail();
  }

  form = new FormGroup({
    code1: new FormControl<string>(''),
    code2: new FormControl<string>(''),
    code3: new FormControl<string>(''),
    code4: new FormControl<string>(''),
    code5: new FormControl<string>(''),
  });

  verify() {
    var credentials = new ConfirmCodeDto();
    const code = [
      this.form.controls.code1.value,
      this.form.controls.code2.value,
      this.form.controls.code3.value,
      this.form.controls.code4.value,
      this.form.controls.code5.value,
    ].join('');

    credentials.email = this.email;
    credentials.code = code;
    console.log(credentials);
    this.authService.Verify_Code(credentials).subscribe(
      (result: any) => {
        console.log(result);
        this.routerService.navigateByUrl('/Authentication/new-Password');
      },
      (e) => {
        // handel error
        this.respomseError = e.error;
      }
    );
  }
}
