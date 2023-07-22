import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmationAfterRegisterComponent } from './confirmation-after-register/confirmation-after-register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget_password', component: ForgetPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'new-Password', component: NewPasswordComponent },
  { path: 'ConfirmEmail', component: ConfirmationAfterRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
