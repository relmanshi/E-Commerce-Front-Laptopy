import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ChangePasswordDto } from 'src/app/Dtos/user/ChangePasswordDto';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private myClient: HttpClient) {}
  public getUser(): Observable<string[]> {
    return this.myClient.get<string[]>(
      'https://localhost:7064/api/UserProfile/profile'
    );
  }

  public EditUser(user: any): Observable<string[]> {
    return this.myClient.put<string[]>(
      'https://localhost:7064/api/UserProfile/Edit',
      user
    );
  }
  public deleteUser(): Observable<string[]> {
    return this.myClient.delete<string[]>(
      'https://localhost:7064/api/UserProfile/DeleteUser'
    );
  }
  public changePassword(Change: ChangePasswordDto): Observable<any> {
    console.log(Change);
    return this.myClient.post(
      'https://localhost:7064/api/UserProfile/Change_Password',
      Change
    );
  }
  public getOrders(): Observable<string[]> {
    return this.myClient.get<string[]>(
      'https://localhost:7064/api/UserProfile/orders'
    );
  }
  public getOrderDetails(id: any): Observable<string[]> {
    return this.myClient.get<string[]>(
      'https://localhost:7064/api/UserProfile/orderDetails/' + id
    );
  }

  public getUserAddress(): Observable<string[]> {
    return this.myClient.get<string[]>(
      'https://localhost:7064/api/UserAddresses'
    );
  }
  public addAddress(address: any): Observable<string[]> {
    return this.myClient.post<string[]>(
      'https://localhost:7064/api/UserAddresses/AddNewAddress',
      address
    );
  }
  public EditUserAddress(address: any): Observable<string[]> {
    return this.myClient.put<string[]>(
      'https://localhost:7064/api/UserAddresses/Edit',
      address
    );
  }
  public deleteAddress(id: any): Observable<string[]> {
    return this.myClient.delete<string[]>(
      'https://localhost:7064/api/UserAddresses/delete/' + id
    );
  }
  public setAddressDefault(id: any) {
    return this.myClient.put(
      'https://localhost:7064/api/UserAddresses/SetDefault/' + id,
      id
    );
  }
  public GetAddressById(id: any): Observable<string[]> {
    return this.myClient.get<string[]>(
      'https://localhost:7064/api/UserAddresses/address/' + id
    );
  }

  public EditDefaultAddress(addressId : any){
    return this.myClient.put('https://localhost:7064/api/UserAddresses/SetDefault/' + addressId, addressId)
  }

  public Address$ = new BehaviorSubject<any>(null)
}
