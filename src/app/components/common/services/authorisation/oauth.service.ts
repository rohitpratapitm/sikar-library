import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

    private consumer_key: string = 'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--';
    private consumer_secret: string = 'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44';
    private url: string = 'https://api.login.yahoo.com/oauth/v2/get_request_token';
    private signature_method: string = 'PLAINTEXT';
    private signature_method_hma: string = 'HMAC-SHA1';

    constructor(private http: HttpClient) {
      
    }

    public _make_signed_request() {
        
          // Only support GET in this function
          const method = 'GET';
        
          let signature: string;
        
          const oauth_nonce = Math.random();
          const oauth_timestamp = Date.now();
          const oauth_version = '1.0';
          
          // Params need to be sorted by key
          
          let params: HttpParams = new HttpParams()
          .set('oauth_callback', 'oob')
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
        this.http.get(this.url, {
            params: params
        }).subscribe(response => {
        console.log('Response is : ' + response);
        });
    }
}
