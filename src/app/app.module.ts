import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GlobalUtilService, LoggerService , SessionManagerService, HttpUtilService, OAuth2Service } from './components/common/services/all';
import { PlayerComponent } from './components/nba/player/players-grid.component';
import { LoginComponent } from './components/common/login/login.component';
import { AuthenticationInterceptor } from './components/common/services/authorisation/outh.interceptor';
import { HeaderComponent, FooterComponent, SpinnerComponent } from './components/common/header-footer/all';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'players', component: PlayerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent, SpinnerComponent, LoginComponent, PlayerComponent
  ],
  imports: [RouterModule.forRoot(appRoutes),
    BrowserModule, BrowserAnimationsModule, HttpModule, HttpClientModule, MaterialModule,
  ],
  providers: [
    Title, SessionManagerService, GlobalUtilService, LoggerService, OAuth2Service,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }, HttpUtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
