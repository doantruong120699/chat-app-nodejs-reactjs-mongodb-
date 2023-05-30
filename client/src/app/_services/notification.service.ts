import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string | undefined, title = '') {
    this.toastr.success(message, title, {
      extendedTimeOut: 3000,
      timeOut: 3000,
      enableHtml: true,
      tapToDismiss: false,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  showError(message: string | undefined, title = '') {
    this.toastr.error(message, title, {
      extendedTimeOut: 3000,
      timeOut: 3000,
      enableHtml: true,
      tapToDismiss: false,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  showInfo(message: string | undefined, title = '') {
    this.toastr.info(message, title, {
      extendedTimeOut: 3000,
      timeOut: 3000,
      enableHtml: true,
      tapToDismiss: false,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  showWarning(message: string | undefined, title = '') {
    this.toastr.warning(message, title, {
      extendedTimeOut: 3000,
      timeOut: 3000,
      enableHtml: true,
      tapToDismiss: false,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
