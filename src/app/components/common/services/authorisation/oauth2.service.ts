import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Params, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { GlobalUtilService } from '../global/global-util.service';
import { SessionManagerService } from '../session-manager/session-manager.service';
import { TokenResponse } from './token.model';

/**
 * Authorisation flow
 */
@Injectable()
export class OAuth2Service {

    private readonly AUTHORIZATION_URL: string = 'https://api.login.yahoo.com/oauth2/request_auth';
    private readonly ACCESS_TOKEN_URL: string = '/oauth2/get_token';

    private readonly URL_PARAM_SEPARATOR: string = '?';
    private readonly QUERY_PARAM_SEPARATOR: string = '&';
    private readonly QUERY_VALUE_SEPARATOR: string = '=';
    private tokenResponse: TokenResponse;

    constructor(private http: HttpClient,
        private router: ActivatedRoute,
        private sessionManager: SessionManagerService,
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

    public getToken(code?: string): Observable<string> {
        this.tokenResponse = this.sessionManager.getToken();
        if (this.tokenResponse && this.tokenStillValid) {
            return Observable.of(this.tokenResponse.token);
        } else {
            return this.getAccessToken(code).map(response => {
                if (response) {
                    this.setTokenResponse(response);
                } else {
                    console.warn('No token found : ' + response);
                }
                return this.tokenResponse.token;
            });   
        }
    }

    public isDevMode(): boolean {
        return this.global.isDevMode();
    }

    public logOut(): void {
        this.sessionManager.deleteToken();
    }
    // 2. GET an ACCESS TOKEN
    private getAccessToken(code?: string): Observable<Object> {

        // create header
        const headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic '.concat(btoa(this.global.getAppKey().concat(':').concat(this.global.getAppSecret()))));

        // construct body
        const body: URLSearchParams = new URLSearchParams();
        const grantType: string = code ? 'authorization_code' : this.tokenResponse.refreshToken;
        body.append('grant_type', grantType);
        body.append('redirect_uri', encodeURI(this.global.getRedirectURI()));
        // either set code OR refresh toen
        code ? body.append('code', code) : body.set('refresh_token', this.tokenResponse.refreshToken);

        return this.http.post(this.ACCESS_TOKEN_URL, body.toString(), { headers: headers });
    }

    private setTokenResponse(response: Object): void {
        this.tokenResponse = {
            token: response['access_token'],
            refreshToken: response['refresh_token'],
            tokenType: response['token_type'],
            expiresIn: response['expires_in']
        };
        // set the time untill this token is valid
        this.tokenResponse.validTill = new Date().getMilliseconds() + response['expires_in']; 
        // store
        this.sessionManager.setToken(this.tokenResponse);
    }

    private tokenStillValid(): boolean {
        const validTill: number = Number(this.sessionManager.getToken<TokenResponse>().validTill);
        if (validTill > new Date().getMilliseconds()) {
            return true;
        }
        return false;
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
