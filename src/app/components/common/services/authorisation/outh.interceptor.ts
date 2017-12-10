import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { OAuth2Service } from '../all';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authService: OAuth2Service) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = localStorage.getItem('token');
        if (token && !this.authService.isTokenExpired()) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
