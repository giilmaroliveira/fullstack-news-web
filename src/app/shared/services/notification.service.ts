import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private config: MatSnackBarConfig;
  constructor(private snackBar: MatSnackBar) {
    this.config = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['']
    };
  }

  public error(message: string) {
    this.config.panelClass = ['error-snackbar'];
    this.showMessage(message);
  }

  public success(message: string) {
    this.config.panelClass = ['success-snackbar'];
    this.showMessage(message);
  }

  public warning(message: string) {
    this.config.panelClass = ['warning-snackbar'];
    this.showMessage(message);
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'X', this.config);
  }
}
