import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { GlobalUtilService } from '../global/global-util.service';
import { ResponseContentType } from '@angular/http/src/enums';
import * as OAuth from 'oauth';

@Injectable()
export class HttpUtilService {

    private static USER: string = 'sm_user';
    private static CONTENT_TYPE: string = 'Content-Type';
    private static MULTIPART_FORM: string = 'multipart/form-data';
    private static MIME_JSON: string = 'application/json';
    private oauth: any;

    constructor(private http: Http, private globalUtilService: GlobalUtilService) {
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
    public initializeDefaultHeaders(existingHeaders?: Headers, enableMultipartForm?: boolean): Headers {

        const headers: Headers = existingHeaders ? existingHeaders : new Headers();
        if (!headers.has(HttpUtilService.CONTENT_TYPE)) {
            if (enableMultipartForm) {
                if (!this.globalUtilService.isBrowserIE()) {
                    headers.append(HttpUtilService.CONTENT_TYPE, HttpUtilService.MULTIPART_FORM);
                }
            } else {
                headers.append(HttpUtilService.CONTENT_TYPE, HttpUtilService.MIME_JSON);
            }
        }
        return headers;
    }

    public doGET<T>(aEndPointURL: string, aHeaders?: Headers): Observable<T> {

        const headers: Headers = this.initializeDefaultHeaders(aHeaders);
        return this.http.get(
            this.getUrl(aEndPointURL),
            { headers: headers, withCredentials: true })
            .map((response: Response) => {
                const toReturn: T = response.json();
                return toReturn;
            }).share()
            .catch((error: Response) => this.handleError(error));
    }

    public doPOST<T>(aEndPointURL: string, aRequestObject: Object, aHeaders?: Headers,
        aResponseType?: ResponseContentType, aParams?: { [key: string]: any | any[]; }): Observable<T> {
            return this.http.post(
                this.getUrl(aEndPointURL),
                this.getRequestObjectAsString(aRequestObject),
                {
                    headers: this.initializeDefaultHeaders(),
                    withCredentials: true,
                    responseType: aResponseType,
                    params: aParams
                }
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
}
