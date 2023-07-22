import { Component } from '@angular/core';
import { ReviewKeyDto } from 'src/app/Dtos/Dashboard/ReviewKeyDto';
import { ReviewService } from 'src/app/services/Dashboard/review.service';

@Component({
  selector: 'app-reviews-dashboard',
  templateUrl: './reviews-dashboard.component.html',
  styleUrls: ['./reviews-dashboard.component.css']
})
export class ReviewsDashboardComponent {

  reviews: any;
  credentials = new ReviewKeyDto();

  constructor(private readonly reviewService: ReviewService) {
    this.GetReviews();
  }

  public GetReviews() {
    this.reviewService.GetAllReviews().subscribe({
      next: (data) => {
        this.reviews = data
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  public del(productId: any, userId :string) {
    if (confirm("Are you sure you want to delete this Review?")) {
      this.credentials.ProductId = productId
      this.credentials.UserId = userId
      this.reviewService.DeleteReview(this.credentials).subscribe({
        next: () => {
          this.GetReviews()
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
