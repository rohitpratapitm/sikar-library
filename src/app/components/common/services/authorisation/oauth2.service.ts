import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class OAuth2Service  {

    private consumer_key: string = 'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--';
    private consumer_secret: string = 'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44';
    private url: string = 'https://api.login.yahoo.com/oauth2/request_auth';
    private signature_method: string = 'PLAINTEXT';
    private signature_method_hma: string = 'HMAC-SHA1';
    private redirect_uri: string = 'sikar-library.herokuapp.com';

    constructor(private http: HttpClient) {
      
    }

    public initiateAuthorizationFlow() {
        // Authorisation flow
        // 1. Get an authorization URL and authorize access
        this.authorizeAccess().subscribe(response => {
            if (response) {
                console.log('Response is: ' + response);
            } else {
                console.log('Could not retrieve token data');
            }
        });
    }
    private authorizeAccess(): Observable<any> {
        
          // Only support GET in this function
          const method = 'GET';

          // Params need to be sorted by key
          const params: HttpParams = new HttpParams()
          .set('client_id', this.consumer_key)
          .set('redirect_uri', 'http://localhost:8080')
          .set('response_type', 'code')
          .set('language', 'en-us');

        
        return this.http.get(this.url, { params: params, responseType: 'text'});
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
