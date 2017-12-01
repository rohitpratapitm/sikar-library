import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class AuthenticationService  {

    private consumer_key: string = 'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--';
    private consumer_secret: string = 'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44';
    private url: string = 'https://api.login.yahoo.com/oauth/v2/get_request_token';
    private signature_method: string = 'PLAINTEXT';
    private signature_method_hma: string = 'HMAC-SHA1';

    constructor(private http: HttpClient) {
      
    }

    public initiateAuthorizationFlow() {
        // Authorisation flow

        // 1. Get the request token data
        this.getToken().subscribe(response => {
            if (response) {
                // extract token data
                const tokenData: string[] = response.split('&');
                const token: string = tokenData[0].split('=')[1];
                const tokenSecret: string = tokenData[1].split('=')[1];
                const tokenExpires: string = tokenData[2].split('=')[1];
                let authenticationURL: string = tokenData[3].split('=')[1];
                // decode url
                authenticationURL = decodeURIComponent(authenticationURL);
        // 2. Direct user to Yahoo! for authentication (retriever verifier)
                const userWindow = window.open(authenticationURL);
                
                

            } else {
                console.log('Could not retrieve token data');
            }
        });
    }
    private getToken(): Observable<string> {
        
          // Only support GET in this function
          const method = 'GET';
        
          let signature: string;
        
          const oauth_nonce = Math.random();
          const oauth_timestamp = Date.now();
          const oauth_version = '1.0';
          
          // Params need to be sorted by key
          
          let params: HttpParams = new HttpParams()
          .set('oauth_callback', 'sikar-library.herokuapp.com')
          .set('oauth_consumer_key', this.consumer_key)
          .set('oauth_nonce', String(oauth_nonce))
          .set('oauth_signature_method', this.signature_method)
          .set('oauth_timestamp', String(oauth_timestamp))
          .set('oauth_version', oauth_version)
          .set('xoauth_lang_pref', 'en-us');

        // Urlencode params and generate param string
        const paramArray: string[] = [];     
        params.keys().forEach(key => {
            paramArray.push(key.concat('=').concat(params.get(key)));
        });
        const paramString: string = paramArray.join('&');
        const base_string: string = encodeURI(method).concat('&').concat(encodeURI(this.url)).concat('&').concat(encodeURI(paramString));
        // Generate secret
        const secret = encodeURI(this.consumer_secret).concat('&').concat(encodeURI(''));
         
        if (this.signature_method === 'PLAINTEXT' ) {
            signature = secret;
        } else if (this.signature_method === 'HMAC-SHA1' ) {
            signature = '' ; // base64_encode( hash_hmac( 'sha1', base_string, secret, true ) );
          }

        params = params.set('oauth_signature', encodeURI(signature));
        
        return this.http.get(this.url, { params: params, responseType: 'text'})
          .map(response => {
              if (response) {
                  return response;
              }
          }, (error: HttpErrorResponse) => this.handleError(error));
    }

    private handleError(error: HttpErrorResponse): void {
        if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
    }
}
