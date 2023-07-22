import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  LoadingBusy() {
    this.loadingRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-circus',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true,
      showSpinner: true,
    });
  }

  LoadingIdle() {
    this.loadingRequestCount--;
    if (this.loadingRequestCount <= 0) {
      this.spinnerService.hide();
    }
  }
}
