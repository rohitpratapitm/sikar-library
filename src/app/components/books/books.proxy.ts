import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from '../common/services/http/http-util.service';
import { Book } from './book.model';

@Injectable()
export class BooksProxy {

    private static END_POINT_URL: string = 'posts';

    constructor(private httpUtilService: HttpUtilService) {

    }

    public getBookss(): Observable<Array<Book>> {
        return this.httpUtilService.doGET(BooksProxy.END_POINT_URL);
    }
}
