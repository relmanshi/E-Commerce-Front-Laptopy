import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ConfirmCodeDto } from 'src/app/Dtos/user/ConfirmCodeDto';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { RegisterDto } from 'src/app/Dtos/user/RegisterDto';
import { ResetPasswordDto } from 'src/app/Dtos/user/ResetPasswordDto';
import { TokenDto } from 'src/app/Dtos/user/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // declear for logged state for subscripers
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {}

  // Login
  public Login(credentials: LoginDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://localhost:7064/api/User/Login', credentials)
      .pipe(
        tap((TokenDto) => {
          this.isLoggedIn$.next(true);
          if (TokenDto.role === 'Admin') {
            this.isAdmin$.next(true);
          }
          localStorage.setItem('token', TokenDto.token);
          localStorage.setItem('role', TokenDto.role);
        })
      );
  }

  // Forget Password
  public Forget_Password(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    return this.client.post(
      'https://localhost:7064/api/User/Forget_Password',
      formData
    );
  }

  //Verify code
  public Verify_Code(credentials: ConfirmCodeDto): Observable<any> {
    return this.client.post(
      'https://localhost:7064/api/User/Check_Code',
      credentials
    );
  }

  // Reset Password
  public Reset_Password(credentials: ResetPasswordDto): Observable<any> {
    return this.client.post(
      'https://localhost:7064/api/User/Reset_Password',
      credentials
    );
  }

  // Register
  public Register(credentials: RegisterDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://localhost:7064/api/User/Register', credentials)
      .pipe(
        tap((TokenDto) => {
          this.isLoggedIn$.next(true);
          if (TokenDto.role === 'Admin') {
            this.isAdmin$.next(true);
          }
          localStorage.setItem('token', TokenDto.token);
          localStorage.setItem('role', TokenDto.role);
        })
      );
  }
}
