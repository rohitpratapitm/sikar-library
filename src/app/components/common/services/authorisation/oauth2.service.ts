import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Params, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { GlobalUtilService } from '../global/global-util.service';


/**
 * Authorisation flow
 */
@Injectable()
export class OAuth2Service  {

    private readonly AUTHORIZATION_URL: string = 'https://api.login.yahoo.com/oauth2/request_auth';
    private readonly ACCESS_TOKEN_URL: string = '/api/get_token';
    
    private readonly URL_PARAM_SEPARATOR: string = '?';
    private readonly QUERY_PARAM_SEPARATOR: string = '&';
    private readonly QUERY_VALUE_SEPARATOR: string = '=';
    private CONFIG: any;

    constructor(private http: HttpClient,
        private router: ActivatedRoute, 
        private global: GlobalUtilService) {
    }

    // 1. Get an Authorization URL and authorize access
    public getAuthorizationURL(): string {
        
        return this.AUTHORIZATION_URL
        .concat(this.URL_PARAM_SEPARATOR).concat('client_id', this.QUERY_VALUE_SEPARATOR, this.global.getAppKey())
        .concat(this.QUERY_PARAM_SEPARATOR).concat('redirect_uri', this.QUERY_VALUE_SEPARATOR, this.global.getRedirectURI())
        .concat(this.QUERY_PARAM_SEPARATOR).concat('response_type', this.QUERY_VALUE_SEPARATOR, 'code')
        .concat(this.QUERY_PARAM_SEPARATOR).concat('language', this.QUERY_VALUE_SEPARATOR, 'en-us');
    }

    // 2. GET an ACCESS TOKEN
    public getAccessToken(code?: string, refreshToken?: string): void {

        // create header
        const headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic '.concat(btoa(this.global.getAppKey().concat(':').concat(this.global.getAppSecret()))));

        // construct body
        const body: URLSearchParams = new URLSearchParams();
        const grantType: string = code ? 'authorization_code' : refreshToken;
        body.append('grant_type', grantType);
        body.append('redirect_uri', encodeURI(this.global.getRedirectURI()));
        // either set code OR refresh toen
        code ? body.append('code', code) : body.set('refresh_token', refreshToken);

        this.http.post(this.ACCESS_TOKEN_URL, body.toString(), { headers: headers})
        .subscribe(response => {
            if (response) {
    // 3.   dispach the token to store
               this.setTokenResponse(response);
            }
        }, ((err: HttpErrorResponse) => this.handleError(err)));
    }

    public refreshToken(): void {
        this.getAccessToken(undefined, localStorage.getItem('refresh_token'));
    }

    public isTokenExpired(): boolean {
        const validTill: number = Number(localStorage.getItem('validTill'));
        if (validTill < new Date().getMilliseconds()) {
            return true;
        }
        return false;
    }

    public getToken(): void {
        const token: string = localStorage.getItem('token');
        if (token) {
            // check if it is still valid
            if (this.isTokenExpired) {
                // refresh it
                this.refreshToken();
            }
        } 
    }
    private setTokenResponse(response: Object): void {
        localStorage.setItem('token', response['access_token']);
        localStorage.setItem('refresh_token', response['refresh_token']);
        localStorage.setItem('token_type', response['token_type']);
        // set the time untill this token is valid
        const validTill = new Date().getMilliseconds() + response['expires_in'];
        localStorage.setItem('validTill', validTill);
    }

    private handleError(err: HttpErrorResponse): void {
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
    }
}
