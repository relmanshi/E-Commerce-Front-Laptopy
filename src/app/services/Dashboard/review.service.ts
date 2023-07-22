import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewKeyDto } from 'src/app/Dtos/Dashboard/ReviewKeyDto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private readonly myClient:HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/Reviews/Dashboard/Reviews";
  
  public GetAllReviews(){
    return this.myClient.get(this.BaseUrl);
  }

  public DeleteReview(reviewKey : ReviewKeyDto){
    return this.myClient.delete(this.BaseUrl + "/Delete", {
      body: reviewKey
    })
  }
}
