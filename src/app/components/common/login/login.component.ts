import { Component, OnInit } from '@angular/core';
import { OAuth2Service } from '../services/all';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [OAuth2Service]
})
export class LoginComponent implements OnInit {

    readonly AUTHORIZATION_URL;

    constructor(private oAuth2Service: OAuth2Service,
        private router: ActivatedRoute) {

        this.AUTHORIZATION_URL = this.oAuth2Service.getAuthorizationURL();
    }

    ngOnInit() {
        console.log(' Inside Login ');
        this.router.queryParams.subscribe((queryParams: Params) => {
            console.log('Inside subscription');
            const code: string = queryParams['code'];
            if (code) {
                console.log('found code' + code);
                this.oAuth2Service.getAccessToken(code);
            }
        });
    }

    routeToAuthorisationServer(): void {
        this.oAuth2Service.getAuthorizationURL();
    }
}
