import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  User: any;
  Id: any;

  constructor(private readonly route: ActivatedRoute, private readonly UserService: UserService) {
    this.getUser()
  }

  public getUser() {
    this.Id = this.route.snapshot.params['id'];
    this.UserService.GetUserDetails(this.Id).subscribe({
      next: (data) => {
        this.User = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
