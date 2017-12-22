import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent, HeaderComponent, FooterComponent } from './header-footer/all';
import { SessionManagerService, LoggerService, GlobalUtilService, OAuth2Service, HttpUtilService } from './services/all';
import { AuthenticationInterceptor } from './services/authorisation/outh.interceptor';

@NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [SpinnerComponent, LoginComponent, HeaderComponent, FooterComponent],
    exports: [SpinnerComponent, LoginComponent, HeaderComponent, FooterComponent]
})
export class CommonModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonModule,
            providers: [SessionManagerService, LoggerService, GlobalUtilService, OAuth2Service,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                }, HttpUtilService],
        };
    }
}
