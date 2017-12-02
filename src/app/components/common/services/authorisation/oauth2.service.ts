import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Params } from '@angular/router';
import { error } from 'util';

/**
 * Authorisation flow
 */
@Injectable()
export class OAuth2Service  {

    private readonly consumer_key: string = 'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--';
    private readonly consumer_secret: string = 'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44';
    private readonly AUTHORIZATION_URL: string = 'https://api.login.yahoo.com/oauth2/request_auth';
    private readonly ACCESS_TOKEN_URL: string = 'https://api.login.yahoo.com/oauth2/get_token';
    private readonly signature_method: string = 'PLAINTEXT';
    private readonly signature_method_hma: string = 'HMAC-SHA1';
    private readonly redirect_uri: string = 'http://sikar-library.herokuapp.com/login';
    private readonly QUERY_PARAM_SEPARATOR: string = '?';

    constructor(private http: HttpClient) {
      
    }

    // 1. Get an Authorization URL and authorize access
    public getAuthorizationURL(): string {
        
        return this.AUTHORIZATION_URL
        .concat(this.QUERY_PARAM_SEPARATOR).concat('client_id', this.consumer_key)
        .concat(this.QUERY_PARAM_SEPARATOR).concat('redirect_uri', this.redirect_uri)
        .concat(this.QUERY_PARAM_SEPARATOR).concat('response_type', 'code')
        .concat(this.QUERY_PARAM_SEPARATOR).concat('language', 'en-us');
    }

    // 2. GET an ACCESS TOKEN
    public getAccessToken(code: string): void {

        // create header
        const headers: HttpHeaders = new HttpHeaders()
        .append('Authorization', 'Basic '.concat(btoa(this.consumer_key.concat(':').concat(this.consumer_secret))));

        // construct body
        const params: HttpParams = new HttpParams()
        .append('grant_type', 'authorization_code')
        .append('redirect_uri', this.redirect_uri)
        .append('code', code);

        this.http.post(this.ACCESS_TOKEN_URL, params, {
            headers: headers, responseType: 'text'
        }).subscribe(response => {
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
            console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
    }
}
