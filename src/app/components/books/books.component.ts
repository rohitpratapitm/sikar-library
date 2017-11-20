import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { BooksProxy } from './books.proxy';
import { Book } from './book.model';

@Component({
    'selector': 'book-details',
    'template': 
        `<div *ngFor="let book of booksStream|async">
            Book Details : 
            Id : {{book?.id}}
            Title : {{book?.title}}
            Author : {{book?.author}}
        </div>
        `
})
export class BooksComponent implements OnInit {

    booksStream: Observable<Array<Book>>;

    constructor(private booksProxy: BooksProxy) {

    }

    ngOnInit() {
        this.booksStream = this.booksProxy.getBookss();
    }

}
