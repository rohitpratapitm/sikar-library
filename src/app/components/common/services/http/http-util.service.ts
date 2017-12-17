import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { GlobalUtilService } from '../global/global-util.service';
import { ResponseContentType } from '@angular/http/src/enums';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

    private static USER: string = 'sm_user';
    private static CONTENT_TYPE: string = 'Content-Type';
    private static MULTIPART_FORM: string = 'multipart/form-data';
    private static MIME_JSON: string = 'application/json';
    private static AUTHORIZATION: string = 'Authorization';

    constructor(private http: HttpClient, private globalUtilService: GlobalUtilService) {
    }

    /**
     * The Below getRequestObjectAsString is used to convert the Request Object to JSON string.
     * @param requestObject 
     */
    public getRequestObjectAsString<T>(requestObject: T): string {
        return JSON.stringify(requestObject);
    }

    public handleError(error: Response): ErrorObservable {
        if (error === null || error.json() === null || error.json() === undefined || error.json().length === 0) {
            return Observable.throw('Server did not return any error code');
        }
        return Observable.throw(error.json() || 'server error');
    }

    /**
     * Append headers used for sppofing.
     * Also sets content-type to application/json
     * @param existingHeaders 
     * @param enableMultipartForm 
     */
    public initializeDefaultHeaders(): HttpHeaders {

        const headers: HttpHeaders = new HttpHeaders();
        headers.append(HttpUtilService.AUTHORIZATION, 'Bearer ' + localStorage.getItem('token'));
        return headers;
    }

    public doGET<T>(aEndPointURL: string, params?: HttpParams): Observable<T> {

        return this.http.get(aEndPointURL, {
            params: this.defaultParams(params)
        }).share().catch((error: Response) => this.handleError(error));
    }

    public doPOST<T>(aEndPointURL: string, aRequestObject: Object, aHeaders?: Headers,
        aResponseType?: ResponseContentType, aParams?: { [key: string]: any | any[]; }): Observable<T> {
            return this.http.post(
                this.getUrl(aEndPointURL),
                this.getRequestObjectAsString(aRequestObject)
            )
            .map((response: Response) => {
                const toReturn: T = response.json();
                return toReturn;
            }).share()
            .catch((error: Response) => this.handleError(error));
        }

    private getUrl(endPointURL: string): string {

        if (!this.globalUtilService.isEmpty(endPointURL)) {
            if (this.globalUtilService.hasServerRoot()) {
                return this.globalUtilService.getServerRoot() + endPointURL;
            } else {
                return endPointURL;
            }
        } else {
            throw new Error('Error: End point url is empty');
        }
    }

    private defaultParams(userParams?: HttpParams): HttpParams {
        return userParams ? userParams.set('format', 'json') : new HttpParams().set('format', 'json');
    }
}
