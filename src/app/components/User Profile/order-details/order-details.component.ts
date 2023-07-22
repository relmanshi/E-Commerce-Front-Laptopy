import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddReviewDto } from 'src/app/Dtos/Review/ReviewDto';
import { ReviewService } from 'src/app/services/Review/review.service';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id:any;
  details:any;
  totalp=0;
  orderStatus:boolean=false;
constructor(myRoute:ActivatedRoute,public service:UserProfileService,private reviewServic:ReviewService,private toastr: ToastrService){
  this.id = myRoute.snapshot.params["id"];
}
ngOnInit(): void {
  
  this.GetOrderDetails();
}


GetOrderDetails()
{
  this.service.getOrderDetails(this.id).subscribe(
    { 
      next:(data)=>{
        this.details=data;
        this.orderStatus=this.details.isOrderDelieverd;
        console.log(data);
       for(let i of this.details.orderProducts)
          {
          this.totalp=this.totalp+(i.quantity*i.productPriceAtThisTime);
        }
        console.log(this.totalp);
      },
      error:(err)=>{console.log(err)}
    }
  )
}
AddReview(comment:string,rating:string,productId:number)
{
  var review=new AddReviewDto();
  review.orderId=this.id;
  review.productId=productId;
  review.rating=+rating;
  review.comment=comment;

  this.reviewServic.AddReview(review).subscribe({
    next:(data)=>{
      console.log(data);
      this.GetOrderDetails();
      this.toastr.success("Review Added Successfully", 'Success' );
      window.scrollTo({ top: 0, behavior: 'smooth' });



    },
    error:(error)=>{
      console.log(error);
    }
  })




}

}
