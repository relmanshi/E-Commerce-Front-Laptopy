import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddReviewDto } from 'src/app/Dtos/Review/ReviewDto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor( private myClient:HttpClient) { }

  AddReview(review:AddReviewDto)
  {
    console.log("inside service");
    console.log(review);
    return this.myClient.post("https://localhost:7064/api/Reviews/AddReview",review);
  }
}
