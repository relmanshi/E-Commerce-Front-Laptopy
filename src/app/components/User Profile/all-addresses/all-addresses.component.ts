import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditAddressesComponent } from '../edit-addresses/edit-addresses.component';
@Component({
  selector: 'app-all-addresses',
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.css'],
})
export class AllAddressesComponent implements OnInit {
  address: any;
  id: any;
  constructor(
    myRoute: ActivatedRoute,
    public service: UserProfileService,
    public auth: AuthenticationService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fetchData()
    this.service.Address$.subscribe({
      next: (data) => {
        this.address = data
      }
    })
  }

  fetchData() {
    this.service.getUserAddress().subscribe({
      next: (data) => {
        this.address = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    let msg = `Do yow want to delete this address?`;
    if (confirm(msg) == true) {
      this.service.deleteAddress(id).subscribe({
        next: () => {
          console.log("deleted")
          this.fetchData()
        }
      })
    }
  }

  update(id: any, city: any, street: any, phone: any) {
    this.service.GetAddressById(this.id).subscribe();
    let updatedData = { id, city, street, phone }
    this.service.EditUserAddress(updatedData).subscribe({
      next: () => {
        this.address[this.id] = updatedData;
      },
      error: (err) => { console.log(err) }
    })
  }

  default(id: any) {
    this.service.setAddressDefault(id).subscribe({
      next: (data) => {
        let d = document.getElementById('Default');

        if (this.address.defaultAddress == true) {
          d?.focus();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openAddPopup(id: any) {
    this.dialog.open(EditAddressesComponent, { data: { Id: id } }).addPanelClass("bigpopupComponent");
  }
}
