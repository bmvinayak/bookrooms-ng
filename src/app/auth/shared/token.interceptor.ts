import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();
    if (token) {
        request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token// GET TOKEN HERE
            }
           });
    }
    //return next.handle(request);
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.auth.logout();
      this.router.navigate(['/login', {Access: 'Unauthorised'}]);
    }
  }));
  }
}
