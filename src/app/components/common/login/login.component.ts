import { Component, OnInit } from '@angular/core';
import { OAuth2Service } from '../services/all';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/skipWhile';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [OAuth2Service]
})
export class LoginComponent implements OnInit {

    readonly AUTHORIZATION_URL;

    constructor(private oAuth2Service: OAuth2Service,
        private router: Router, 
        private activatedRoute: ActivatedRoute) {

        this.AUTHORIZATION_URL = this.oAuth2Service.getAuthorizationURL();
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
            const code: string = queryParams['code'];
            if (code) {
                console.log('found code' + code);
                this.oAuth2Service.getToken(code)
                .skipWhile(response => {
                    return (response === undefined) ? true : false ;
                })
                .subscribe(response => {
                    this.router.navigateByUrl('/players');
                });
            }
        });
    }

    routeToAuthorisationServer(): void {
        this.oAuth2Service.getAuthorizationURL();
    }
}
