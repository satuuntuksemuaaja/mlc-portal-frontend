import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // check token expiration
    const tokenExpireTime = this.authService.getTokenExpiry();
    const currentTime = new Date().getTime();

    let token = this.authService.getToken();
    if (token) {
      if (tokenExpireTime <= currentTime) {
        await this.authService.refreshToken();
        token = this.authService.getToken();
      }
      req = req.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`
        }
      });
    }
    return await lastValueFrom(
      next.handle(req).pipe(
        catchError((error) => {
          if (error.status === 500) {
            if (error.error) {
              error.error.message =
                'An error occurred processing your request, please try again or contact your administrator.';
            } else {
              error = {
                ...error,
                error: {
                  message:
                    'An error occurred processing your request, please try again or contact your administrator.'
                }
              };
            }
          }
          return throwError(() => error);
        })
      )
    );
  }
}
