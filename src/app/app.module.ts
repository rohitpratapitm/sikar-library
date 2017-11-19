import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GlobalUtilService, HttpUtilService } from './components/common/services/all';
import { BooksComponent } from './components/books/books.component';
import { BooksProxy } from './components/books/books.proxy';


@NgModule({
  declarations: [
    AppComponent, BooksComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule, MaterialModule,
  ],
  providers: [GlobalUtilService, HttpUtilService, BooksProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
