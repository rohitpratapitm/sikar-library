import { Component, OnInit } from '@angular/core';
import { AuthenticationService, OAuth2Service } from '../services/all';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService, OAuth2Service]
})
export class LoginComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService,
        private oAuth2Service: OAuth2Service) {
    }

    ngOnInit() {

    }

    routeToAuthorisationServer(): void {
        this.oAuth2Service.initiateAuthorizationFlow();
        // this.authenticationService.initiateAuthorizationFlow();
    }
}
