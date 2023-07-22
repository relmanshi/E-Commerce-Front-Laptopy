import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API, AddProductToCart } from 'src/app/Dtos/Cart/cart';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  relatedProducts: any;
  ratingOptions = [1, 2, 3, 4, 5];
  ProductQuantity:number=1;
  isLogged:boolean=false;

  isLoggedIn: boolean = false;

  constructor(private toastr: ToastrService,myRoute: ActivatedRoute, public ProductDetailsService: ProductService , public cartService:CartService,private AuthService:AuthenticationService,private router:Router,    private wishlistService: WishListService,
    ) {
    this.ID = myRoute.snapshot.params["id"];
    
  }


  ngOnInit(): void {
    this.ProductDetailsService.GetProductDetailsById(this.ID).subscribe({
      next: (data) => {
        console.log(data)
        this.product = data;
        console.log(this.product.categoryName)
        this.fetchRelatedProducts(this.product.categoryName);
      },
      error: (error) => { console.log(error) }
    });
    this.AuthService.isLoggedIn$.subscribe(
    {
      next:(data)=>{
        this.isLogged=data;
      }
    });
  }



  openTab(tabId: string) {
    const tabElement = document.getElementById(tabId);

    if (tabElement) {
      const activeTab = document.querySelector('.nav-link.active');
      const activeTabPane = document.querySelector('.tab-pane.show.active');

      // Remove 'active' class from the currently active tab and tab pane
      if (activeTab) {
        activeTab.classList.remove('active');
      }
      if (activeTabPane) {
        activeTabPane.classList.remove('show', 'active');
      }

      // Add 'active' class to the selected tab and tab pane
      tabElement.classList.add('active');
      const targetTabPane = document.querySelector(tabElement.getAttribute('href') as string);
      if (targetTabPane) {
        targetTabPane.classList.add('show', 'active');
      }
    }
  }



  fetchRelatedProducts(brand: string) {
    this.ProductDetailsService.GetRelatedProducts(brand).subscribe({
      next: (RelatedData) => {
         this.relatedProducts = RelatedData;

         this.relatedProducts = this.relatedProducts.filter((product:any) => product.id != this.product.id);
        console.log(this.relatedProducts)

         },
      error: (err) => { console.log(err) }
    });
  }

  openRelatedProductDetails(clickedProduct: any) {
    this.product.id = clickedProduct.id; // Assign the ID of the clicked product
    this.ProductDetailsService.GetProductDetailsById(this.product.id).subscribe({
      next: (data) => {
        this.product = data;
        this.fetchRelatedProducts(this.product.categoryName) ;
        window.scrollTo({ top: 0, behavior: 'auto' });
      },
      error: (error) => { console.log(error) }
    });
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


   AddProductToUserCart()
  {
    if(!this.isLogged)
    {
       this.router.navigate(["Authentication/login"]) ;
      return;
    }
    console.log(this.ProductQuantity);
    let productToAddToCart = new AddProductToCart();
    productToAddToCart.quantity=this.ProductQuantity;
    productToAddToCart.productId=this.product.id;

    this.cartService.AddProductToCart(productToAddToCart).subscribe(
      {
        next:(data)=>{
          console.log("next");
          console.log(data);
          var message = data as any // data come here as object we cannot call data.message

          this.toastr.success(message.message);
          // alert(message.message);
          this.cartService.getCartProductsCounter();



        },
        error:(error)=>{
          console.log("error cart");
          console.log(error);
          this.toastr.error("Failed to Add to cart",'error',{timeOut:2000,});
          this.cartService.getCartProductsCounter();
        }

      }
    );

  }


  


  // Component code
getReviewStars(rating: number): number[] {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating - fullStars >= 0.5; // Check if there is a half star
  const totalStars = fullStars + (hasHalfStar ? 1 : 0); // Total number of stars

  return Array(totalStars).fill(0).map((_, index) => {
    if (index < fullStars) {
      return 1; // Full star
    } else if (index === fullStars && hasHalfStar) {
      return 0.5; // Half star
    } else {
      return 0; // Empty star
    }
  });
}



AddOrRemoveFromwishList(productId: number) {
  this.wishlistService.AddOrDeleteWishList(productId).subscribe({
    next: (data) => {
      console.log('next');
      console.log(data);
      this.wishlistService.GetWishListCount();
    },
    error: (error) => {
      console.log('error');
      console.log(error);
    },
  });
}















}
