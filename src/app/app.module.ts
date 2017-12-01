import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GlobalUtilService, HttpUtilService, AuthenticationService, OAuth2Service } from './components/common/services/all';
import { PlayerComponent } from './components/nba/player/players-grid.component';
import { LoginComponent } from './components/common/login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/players', component: PlayerComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent, LoginComponent, PlayerComponent
  ],
  imports: [ RouterModule.forRoot(appRoutes, {enableTracing: true}), 
    BrowserModule, BrowserAnimationsModule, HttpModule, HttpClientModule, MaterialModule,
  ],
  providers: [Title, GlobalUtilService, HttpUtilService, AuthenticationService, OAuth2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
