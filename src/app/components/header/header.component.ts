import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductChildDto } from 'src/app/Dtos/Product/ProductChildDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  isAdmin = false;
  products: ProductChildDto[] = [];
  noProductsMessage: any;
  cartCouter: number = 0;
  whishListCouter: number = 0;

  constructor(
    private authService: AuthenticationService,
    private productServic: ProductService,
    private routerService: Router,
    private cartService: CartService,
    private whishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((islogged) => {
      this.isUserLoggedIn = islogged;
    });
    this.authService.isAdmin$.subscribe((isAdminTrue) => {
      this.isAdmin = isAdminTrue;
    });
    if (this.isUserLoggedIn) {
      this.cartService.getCartProductsCounter();
    }
    this.cartService.cartCounter$.subscribe((data) => {
      this.cartCouter = data;
      var cart = document.getElementById("testelcart");
      cart?.classList.add("fa-shake")
      setTimeout(() => {
        cart?.classList.remove("fa-shake")
      }, 3000);

    });
    if (this.isUserLoggedIn) {
      this.whishListService.GetWishListCount();
    }
    this.whishListService.wishListCounter$.subscribe((data) => {
      this.whishListCouter = data;
      var wishList = document.getElementById("testelwishlist");
      wishList?.classList.add("fa-flip");
      setTimeout(() => {
        wishList?.classList.remove("fa-flip")
      }, 3000);
    });
  }

  // log Out
  LogOut() {
    localStorage.clear();
    this.authService.isLoggedIn$.next(false);
    this.whishListCouter=0;
    this.cartCouter=0;
    this.authService.isAdmin$.next(false);
    this.routerService.navigateByUrl('/');
  }

  // search field
  onEnterKey(e: any) {
    this.routerService.navigateByUrl(`/Products?q=${e}`);
  }
}
