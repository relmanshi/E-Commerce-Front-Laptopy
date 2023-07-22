import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';
import { HomeService } from 'src/app/services/Home/home.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  specialProducts: any;
  topProducts: any;
  NewProducts: any;
  carouselOptions = {
    items: 4, // Number of items to show in the carousel
    loop: true, // Enable infinite loop
    margin: 10, // Space between items
    nav: true, // Show navigation buttons
    dots: false, // Hide pagination dots
    autoplay: true, // Enable autoplay
    autoplayTimeout: 3000, // Autoplay interval in milliseconds
    responsive: {
      0: {
        items: 1 // Number of items to show on small screens
      },
      768: {
        items: 3 // Number of items to show on medium screens
      },
      992: {
        items: 4 // Number of items to show on large screens
      }
    }
  };

  constructor(
    private HomeService: HomeService,
    private cartService: CartService,
    private wishlistService: WishListService,
    private authenticationService: AuthenticationService

  ) { }



  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.HomeService.GetSpecialOffers().subscribe({
      next: (data) => { this.specialProducts = data; },
      error: (error) => { console.log(error); }
    }),
      this.HomeService.GetTopProducts().subscribe({
        next: (data) => { this.topProducts = data },
        error: (error) => { console.log(error) }
      });
    this.cartService.getCartProductsCounter();


    this.HomeService.GetNewProducts().subscribe({
      next: (data) => { this.NewProducts = data; console.log(data) },
      error: (error) => { console.log(error) }
    });
    this.authenticationService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }



  ratingOptions = [1, 2, 3, 4, 5];

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


  AddOrRemoveFromwishList(productId: number) {
    this.wishlistService.AddOrDeleteWishList(productId).subscribe({
      next: (data) => {
        this.wishlistService.GetWishListCount();
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      },
    });
  }






















}


