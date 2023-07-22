import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/User Profile/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UsersComponent } from './components/Dashboard/Adel/users/users.component';
import { UserDetailsComponent } from './components/Dashboard/Adel/user-details/user-details.component';
import { OrdersDashboardComponent } from './components/Dashboard/Adel/orders-dashboard/orders-dashboard.component';
import { OrderDetailsDashboardComponent } from './components/Dashboard/Adel/order-details-dashboard/order-details-dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthenticationGuardGuard } from './Guards/authentication.guard';
import { AddUserComponent } from './components/Dashboard/Adel/add-user/add-user.component';
import { OrderEditDashboardComponent } from './components/Dashboard/Adel/order-edit-dashboard/order-edit-dashboard.component';
import { CategoriesComponent } from './components/Dashboard/Ahmed/categories/categories.component';
import { AddCategoryComponent } from './components/Dashboard/Ahmed/add-category/add-category.component';
import { EditCategoryComponent } from './components/Dashboard/Ahmed/edit-category/edit-category.component';
import { OrderDetailsComponent } from './components/User Profile/order-details/order-details.component';
import { ReviewComponent } from './components/User Profile/review/review.component';
import { AddAddressesComponent } from './components/User Profile/add-addresses/add-addresses.component';
import { AllAddressesComponent } from './components/User Profile/all-addresses/all-addresses.component';
import { EditAddressesComponent } from './components/User Profile/edit-addresses/edit-addresses.component';
import { MainProfileComponent } from './components/User Profile/main-profile/main-profile.component';
import { ChangePasswordComponent } from './components/User Profile/change-password/change-password.component';
import { ProfileComponent } from './components/User Profile/profile/profile.component';
import { ReviewsDashboardComponent } from './components/Dashboard/Adel/reviews-dashboard/reviews-dashboard.component';
import { WishlistComponent } from './components/User Profile/wishlist/wishlist.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AddProductComponent } from './components/Dashboard/Ahmed/add-product/add-product.component';
import { SidebarComponent } from './components/Dashboard/Ahmed/sidebar/sidebar.component';
import { ProductsComponent } from './components/Dashboard/Ahmed/products/products.component';
import { EditProductComponent } from './components/Dashboard/Ahmed/edit-product/edit-product.component';
import { DashboardComponent } from './components/Dashboard/Adel/dashboard/dashboard.component';
import { AdminAuthenticationGuard } from './Guards/admin-authentication.guard';
import { MainDashboardComponent } from './components/Dashboard/Adel/main-dashboard/main-dashboard.component';
import { ContactusComponent } from './components/Dashboard/Adel/contactus/contactus.component';
const routes: Routes = [
  // Abdo
  { path: '', component: HomeComponent },
  {
    path: 'cart',
    canActivate: [AuthenticationGuardGuard],
    component: CartComponent,
  },
  {
    path: 'checkout',
    canActivate: [AuthenticationGuardGuard],
    component: CheckoutComponent
  },
  {
    path: 'wishList',
    canActivate: [AuthenticationGuardGuard],
    component: WishlistComponent
  },
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  // Ali

  // Making an Lazy Loading
  {
    path: 'Authentication',
    loadChildren: () =>
      import('./components/Authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },

  // Adel
  {
    path: 'dashboard', canActivate: [AdminAuthenticationGuard], component: MainDashboardComponent, children: [
      { path: 'users', canActivate: [AdminAuthenticationGuard], component: UsersComponent },
      { path: 'users/:id', canActivate: [AdminAuthenticationGuard], component: UserDetailsComponent },
      { path: 'register/admin', canActivate: [AdminAuthenticationGuard], component: AddUserComponent },
      { path: 'orders', canActivate: [AdminAuthenticationGuard], component: OrdersDashboardComponent },
      { path: 'orders/:id', canActivate: [AdminAuthenticationGuard], component: OrderDetailsDashboardComponent },
      { path: 'edit/order/:id', canActivate: [AdminAuthenticationGuard], component: OrderEditDashboardComponent },
      { path: 'categories', canActivate: [AdminAuthenticationGuard], component: CategoriesComponent },
      { path: 'add/category', canActivate: [AdminAuthenticationGuard], component: AddCategoryComponent },
      { path: 'categories/:id', canActivate: [AdminAuthenticationGuard], component: EditCategoryComponent },
      { path: 'reviews', canActivate: [AdminAuthenticationGuard], component: ReviewsDashboardComponent },
      { path: 'home', canActivate: [AdminAuthenticationGuard], component: DashboardComponent },
      { path: 'addProduct', canActivate: [AdminAuthenticationGuard], component: AddProductComponent },
      { path: 'products', canActivate: [AdminAuthenticationGuard], component: ProductsComponent },
      { path: 'products/:id', canActivate: [AdminAuthenticationGuard], component: EditProductComponent },
      { path: 'contacts', canActivate: [AdminAuthenticationGuard], component: ContactusComponent },
    ]
  },
  // Reham Abdelrhman
  { path: 'Home', component: HomeComponent },
  { path: 'Products', component: ProductComponent },
  { path: 'Products/:id', component: ProductDetailsComponent },

  // Reham Sayed
  {
    path: 'Orders',
    canActivate: [AuthenticationGuardGuard],
    component: OrdersComponent,
  },
  { path: 'Order/Details/:id',
      canActivate: [AuthenticationGuardGuard],
  component: OrderDetailsComponent },
  {
    path: 'General',
    canActivate: [AuthenticationGuardGuard],
    component: MainProfileComponent,
  },
  { path: 'Profile',    canActivate: [AuthenticationGuardGuard],
  component: ProfileComponent },
  {
    path: 'Address',
    canActivate: [AuthenticationGuardGuard],
    component: AllAddressesComponent,
  },
  {
    path: 'Address/update/:id',
    canActivate: [AuthenticationGuardGuard],
    component: EditAddressesComponent,
  },
  {
    path: 'Address/Add',
    canActivate: [AuthenticationGuardGuard],
    component: AddAddressesComponent,
  },
  // { path: 'Review', component: ReviewComponent },
  {
    path: 'Change-password',
    canActivate: [AuthenticationGuardGuard],
    component: ChangePasswordComponent,
  },

  // Ahmed Hamdi
  { path: 'dashboard', canActivate: [AdminAuthenticationGuard], component: SidebarComponent },
  { path: '**',  component: HomeComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
