import { Component, OnInit } from '@angular/core';
import { AuthenticationService, OAuth2Service } from '../services/all';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService, OAuth2Service]
})
export class LoginComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService,
        private oAuth2Service: OAuth2Service,
        private router: ActivatedRoute) {
    }

    ngOnInit() {

        this.router.queryParams.subscribe((queryParams: Params) => {
            let code: string = queryParams['code'];
            if (code) {
                this.oAuth2Service.getAccessToken(code);
            }
        });
    }

    routeToAuthorisationServer(): void {
        this.oAuth2Service.getAuthorizationURL();
    }
}
