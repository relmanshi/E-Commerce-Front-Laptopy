import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-after-register',
  templateUrl: './confirmation-after-register.component.html',
  styleUrls: ['./confirmation-after-register.component.css'],
})
export class ConfirmationAfterRegisterComponent implements OnInit {
  ngOnInit(): void {
    var loginBtn = window.document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.style.display = 'none';
    }
  }
}
