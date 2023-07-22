import { Component } from '@angular/core';
import { DataService } from 'src/app/services/Dashboard/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  data:any

  constructor(private dataServ : DataService) {
    this.fetchData()
  }

  public fetchData(){
    this.dataServ.GetData().subscribe({
      next : (data) => {
        console.log(data)
        this.data = data
      }
    })
  }
}
