import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GlobalUtilService, HttpUtilService, AuthenticationService } from './components/common/services/all';
import { PlayerComponent } from './components/nba/player/players-grid.component';


@NgModule({
  declarations: [
    AppComponent, PlayerComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule, HttpClientModule, MaterialModule
  ],
  providers: [GlobalUtilService, HttpUtilService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
