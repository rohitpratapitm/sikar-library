import { Injectable } from '@angular/core';
import { OAuth } from 'oauth';

@Injectable()
export class AuthenticationService {

    private oauth: OAuth;

    constructor() {
        console.log(' trying to authorize');
        this.oauth = new OAuth.OAuth(
            null, 'https://api.login.yahoo.com/oauth/v2/get_request_token',
            null, 'https://api.login.yahoo.com/oauth/v2/get_token',
            'dj0yJmk9Yjdsek5yV01FakJGJmQ9WVdrOWRUbGlXR2RuTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--',
            'db2f69ad9c2d7ac4e3fa53f9c2947e1b6a4f8e44',
            '1.0',
            null,
            'HMAC-SHA1'
          );
        console.log(' successfully authorized');
    }
}
