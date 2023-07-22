import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/Authentication/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { OrderDetailsComponent } from './components/User Profile/order-details/order-details.component';
import { ReviewComponent } from './components/User Profile/review/review.component';
import { AllAddressesComponent } from './components/User Profile/all-addresses/all-addresses.component';
import { EditAddressesComponent } from './components/User Profile/edit-addresses/edit-addresses.component';
import { AddAddressesComponent } from './components/User Profile/add-addresses/add-addresses.component';
import { ChangePasswordComponent } from './components/User Profile/change-password/change-password.component';
import { ProfileComponent } from './components/User Profile/profile/profile.component';
import { MainProfileComponent } from './components/User Profile/main-profile/main-profile.component';
import { SidebarComponent } from './components/Dashboard/Ahmed/sidebar/sidebar.component';
import { ProductsComponent } from './components/Dashboard/Ahmed/products/products.component';
import { EditProductComponent } from './components/Dashboard/Ahmed/edit-product/edit-product.component';
import { AddProductComponent } from './components/Dashboard/Ahmed/add-product/add-product.component';
import { CategoriesComponent } from './components/Dashboard/Ahmed/categories/categories.component';
import { EditCategoryComponent } from './components/Dashboard/Ahmed/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/Dashboard/Ahmed/add-category/add-category.component';
import { HeaderDashboardComponent } from './components/Dashboard/Ahmed/header-dashboard/header-dashboard.component';
import { UsersComponent } from './components/Dashboard/Adel/users/users.component';
import { UserDetailsComponent } from './components/Dashboard/Adel/user-details/user-details.component';
import { AddUserComponent } from './components/Dashboard/Adel/add-user/add-user.component';
import { OrdersDashboardComponent } from './components/Dashboard/Adel/orders-dashboard/orders-dashboard.component';
import { OrderDetailsDashboardComponent } from './components/Dashboard/Adel/order-details-dashboard/order-details-dashboard.component';
import { ReviewsDashboardComponent } from './components/Dashboard/Adel/reviews-dashboard/reviews-dashboard.component';
import { DashboardComponent } from './components/Dashboard/Adel/dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptor } from './Interceptors/authentication.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersComponent } from './components/User Profile/orders/orders.component';
import { OrderEditDashboardComponent } from './components/Dashboard/Adel/order-edit-dashboard/order-edit-dashboard.component';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WishlistComponent } from './components/User Profile/wishlist/wishlist.component';
import { EditImagePopUpComponent } from './components/Dashboard/Ahmed/edit-image-pop-up/edit-image-pop-up.component';
import { SideBarComponent } from './components/Dashboard/Adel/side-bar/side-bar.component';
import { MainDashboardComponent } from './components/Dashboard/Adel/main-dashboard/main-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactusComponent } from './components/Dashboard/Adel/contactus/contactus.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    AboutUsComponent,
    ContactUsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ReviewComponent,
    AllAddressesComponent,
    EditAddressesComponent,
    AddAddressesComponent,
    ChangePasswordComponent,
    ProfileComponent,
    MainProfileComponent,
    SidebarComponent,
    ProductsComponent,
    EditProductComponent,
    AddProductComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    HeaderDashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    AddUserComponent,
    OrdersDashboardComponent,
    OrderDetailsDashboardComponent,
    ReviewsDashboardComponent,
    DashboardComponent,
    OrderEditDashboardComponent,
    WishlistComponent,
    ContactUsComponent,
    EditImagePopUpComponent,
    AboutUsComponent,
    SideBarComponent,
    MainDashboardComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    NgIf,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    SlickCarouselModule,
    NgxPaginationModule ,
    // ToastrModule.forRoot(), // ToastrModule added
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toasterStyle',
      preventDuplicates: true,
    }),

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
