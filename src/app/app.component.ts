import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/Authentication/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverClass]',
})
export class HoverClassDirective {
  @HostBinding('class.table-info') private isHovered = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }
}

@Directive({
  selector: '[appClickClass]',
})
export class ClickClassDirective {
  @HostBinding('class.table-active') private isClicked = false;

  @HostListener('click') onClick() {
    this.isClicked = !this.isClicked;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Final-Project-Demo';

  constructor(
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService.isLoggedIn$.next(true);
    }
    if (localStorage.getItem('role') == 'Admin') {
      this.authService.isAdmin$.next(true);
    }
  }
}
