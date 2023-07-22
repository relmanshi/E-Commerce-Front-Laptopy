import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-addresses',
  templateUrl: './add-addresses.component.html',
  styleUrls: ['./add-addresses.component.css']
})
export class AddAddressesComponent {
  address: any;
  defaultt = "true";
  form = new FormGroup({
    city: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    street: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^01\d{9}$/)

    ]),
  })
  constructor(public service: UserProfileService, public auth: AuthenticationService, private router: Router) {
    this.service.getUserAddress().subscribe({
      next: (data) => {
        this.address = data;
      },
      error: (err) => { console.log(err) }
    })
  }
  add() {

    var city = this.form.controls.city.value ?? '';
    var street = this.form.controls.street.value ?? '';
    var phone = this.form.controls.phone.value ?? '';

    let newad = { city, street, phone };
    this.service.addAddress(newad).subscribe({
      next: () => {
        this.router.navigateByUrl('/Address');
      }
    });
  }
  default(id: any) {
    this.service.setAddressDefault(id).subscribe({
      //defaultAddress:this.form.controls.defaultAddress.value;
      next: (data) => {
        if (this.address.defaultAddress.value == 'true') {
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
