import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.route';
import { AppComponent } from './app.component';
import { CommonModule } from './components/common/common.module';
import { NBAModule } from './components/nba/nba.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [RouterModule.forRoot(appRoutes),
    BrowserModule, BrowserAnimationsModule, HttpModule, HttpClientModule,
    CommonModule.forRoot(), NBAModule, 
  ],
  providers: [ Title ],
  bootstrap: [AppComponent]
})
export class AppModule { }
