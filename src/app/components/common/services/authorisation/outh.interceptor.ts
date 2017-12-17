import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpEventType } from '@angular/common/http/src/response';
import { OAuth2Service } from './oauth2.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SessionManagerService } from '../all';
import { TokenResponse } from './token.model';
import 'rxjs/operator/catch';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor, OnInit {

    private authService: OAuth2Service;

    constructor(private injector: Injector, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isAuthCall(req.url)) {
            this.authService = this.injector.get(OAuth2Service);
            if (this.authService.isDevMode()) {
                console.log('Inside Interceptor for Request : ' + this.getRequestDetails(req));
            }
            const authReq = this.setAuthorizationHeader(req, this.sessionManager.getToken<TokenResponse>().token);
            console.log('Modified Request : ' + this.getRequestDetails(req));
            return next.handle(authReq).catch((res: Response, c) => {
                if (res.status === 401 || res.status === 403) {
                    return this.authService.getToken().map(token => {
                        if (token) {
                            const clonedReq = this.setAuthorizationHeader(req, token);
                            console.log('Reissue Request : ' + this.getRequestDetails(req));
                            return next.handle(clonedReq);
                        } else {
                            return Observable.throw(c);
                        } 
                    });
                } else {
                    return Observable.throw(c);
                }
            });
        } else {
            return next.handle(req);
        }
    }

    private isAuthCall(url: string): boolean {
        return url.search('/oauth2/get_token') > -1;
    }
    private setAuthorizationHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
        const newHeaders: HttpHeaders = new HttpHeaders().append('Authorization', 'Bearer '.concat(token));
        const authReq: HttpRequest<any> = req.clone({
            headers: newHeaders
        });
        return authReq;
    }

    private getRequestDetails(request: HttpRequest<any>): string {
        return 'URL: ' + request.urlWithParams + '\n'
            + 'Headers: ' + this.getRequestHeaders(request.headers) + '\n'
            + 'Method Type: ' + request.method + '\n'
            + 'Body: ' + JSON.stringify(request.body);
    }

    private getRequestHeaders(headers: HttpHeaders): string {
        let headerString: string = '';
        headers.keys().forEach(headerName => {
            headerString = headerString.concat(headerName + ':' + headers.get(headerName));
            headerString = headerString.concat('\n');
        });
        return headerString;
    }
}
