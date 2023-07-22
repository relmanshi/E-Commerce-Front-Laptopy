import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/services/WishList/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products:any;

  constructor(
    private wishListService:WishListService,
    
    ) { }
  ngOnInit(): void {
  this.GetUserProductsInWishList();
    
  }

  RemoveFromwishList(productId:number)
  {
    this.wishListService.AddOrDeleteWishList(productId).subscribe({
      next:(data)=>{
        console.log("next");
        console.log(data);
        this.GetUserProductsInWishList();
        this.wishListService.GetWishListCount();
      },
      error:(error)=>{
        console.log("error");
        console.log(error);

      }
    })
  }
  generateStars(avgRating: number): string[] {
    const stars = [];
    const roundedRating = Math.floor(avgRating);
    const hasHalfStar = avgRating - roundedRating >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push('full');
      } else if (i === roundedRating && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  }

  GetUserProductsInWishList()
  {
    this.wishListService.GetUserWishListProducts().subscribe({
      next:(data)=>{
        console.log("next");
        console.log(data);
        this.products=data;


      },
      error:(error)=>
      {
        console.log("error");
        console.log(error);
      }
    })
  }


}
