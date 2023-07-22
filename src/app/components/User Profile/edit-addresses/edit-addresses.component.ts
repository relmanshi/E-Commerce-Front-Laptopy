import { Component, OnInit, Inject } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-addresses',
  templateUrl: './edit-addresses.component.html',
  styleUrls: ['./edit-addresses.component.css'],
})
export class EditAddressesComponent {
  address: any;
  id: any;
  defaultt: any;
  constructor(
    public service: UserProfileService,
    public auth: AuthenticationService, myRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<EditAddressesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Id: any }
  ) {
    this.service.getUserAddress().subscribe({
      next: (data) => {
        console.log(data);
        this.address = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.id = data.Id;
  }
  ngOnInit(): void {
    this.service.GetAddressById(this.id).subscribe(
      {
        next: (data) => {

          this.address = data;
          console.log(data)

        },
        error: (err) => { console.log(err) }
      }
    )
  }
  update(id: any, city: any, street: any, phone: any) {
    this.service.GetAddressById(this.id).subscribe();
    let updatedData = { id, city, street, phone }
    this.service.EditUserAddress(updatedData).subscribe({
      next: () => {
        this.address[this.id] = updatedData;
        this.dialogRef.close();
        this.service.getUserAddress().subscribe({
          next: (data)=>{
            this.service.Address$.next(data)
          }
        })
      },
      error: (err) => { console.log(err) }
    })

    // console.log(addressId)
    // this.service.EditDefaultAddress(addressId).subscribe({
    //   next: () => {
    //     this.dialogRef.close()
    //   }
    // })
  }

}
