import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Params } from '@angular/router';
import { error } from 'util';

declare var process: any;
/**
 * Authorisation flow
 */
@Injectable()
export class OAuth2Service  {

    private readonly consumer_key: string = 'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--';
    private readonly consumer_secret: string = 'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44';
    private readonly AUTHORIZATION_URL: string = 'https://api.login.yahoo.com/oauth2/request_auth';
    private readonly ACCESS_TOKEN_URL: string = 'https://api.login.yahoo.com/oauth2/get_token';
    private readonly REVERSE_PROXY_URL: string = 'https://dashboard.heroku.com/apps/enigmatic-crag-82503';
    private readonly signature_method: string = 'PLAINTEXT';
    private readonly signature_method_hma: string = 'HMAC-SHA1';
    private readonly REDIRECT_URI: string = 'https://sikar-library.herokuapp.com/login';
    private readonly REDIRECT_URI_LOCAL: string = 'http://127.0.0.1:8080/login';
    private readonly URL_PARAM_SEPARATOR: string = '?';
    private readonly QUERY_PARAM_SEPARATOR: string = '&';
    private readonly QUERY_VALUE_SEPARATOR: string = '=';
    private CONFIG: any;

    constructor(private http: HttpClient) {
    }

    // 1. Get an Authorization URL and authorize access
    public getAuthorizationURL(): string {
        
        let redirect_uri = this.REDIRECT_URI;
        console.log('mode is ' + process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'development') {
            redirect_uri = this.REDIRECT_URI_LOCAL;
        }
        return this.AUTHORIZATION_URL
        .concat(this.URL_PARAM_SEPARATOR).concat('client_id', this.QUERY_VALUE_SEPARATOR, this.consumer_key)
        .concat(this.QUERY_PARAM_SEPARATOR).concat('redirect_uri', this.QUERY_VALUE_SEPARATOR, redirect_uri)
        .concat(this.QUERY_PARAM_SEPARATOR).concat('response_type', this.QUERY_VALUE_SEPARATOR, 'code')
        .concat(this.QUERY_PARAM_SEPARATOR).concat('language', this.QUERY_VALUE_SEPARATOR, 'en-us');
    }

    // 2. GET an ACCESS TOKEN
    public getAccessToken(code: string): void {

        // create header
        const headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic '.concat(btoa(this.consumer_key.concat(':').concat(this.consumer_secret))));

        // construct body
        const body: any = {
            grant_type : 'authorization_code',
            redirect_uri : this.REDIRECT_URI,
            code : code
        };

        const params: HttpParams = new HttpParams()
        .append('grant_type', 'authorization_code')
        .append('redirect_uri', this.REDIRECT_URI)
        .append('code', code);

        console.log('calling post request');
        this.http.post(this.ACCESS_TOKEN_URL, JSON.stringify(body), { headers: headers, params: params})
        .subscribe(response => {
            if (response) {
                console.log(' Response is : ' + response);
            }
        }, ((err: HttpErrorResponse) => this.handleError(err)));
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
