import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': this.authService.getToken()
    };

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 500) {
          this.notificationService.warning('Erro interno, contate o suporte');
        }
      }
      return new Observable<HttpEvent<any>>();
    }));
  }
}
