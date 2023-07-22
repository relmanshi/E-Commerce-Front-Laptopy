import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmationAfterRegisterComponent } from './confirmation-after-register/confirmation-after-register.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  declarations: [
    NewPasswordComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    RegisterComponent,
    ConfirmationAfterRegisterComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
