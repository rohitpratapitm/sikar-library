import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class GlobalUtilService {

    public static MICROSOFT_BROWSERS: string[] = ['MSie', 'Trident', 'Edge'];
    // todo: replace server root with https://fantasysports.yahooapis.com/fantasy/v2/
    public static SERVER_ROOT: string = ' https://my-json-server.typicode.com/rohitpratapitm/fake-json-server/';

    constructor(private http: HttpClient) {
    }


    public isBrowserIE(): boolean {
        const userAgent = window.navigator.userAgent;
        return GlobalUtilService.MICROSOFT_BROWSERS.includes(userAgent);
    }

    public isEmpty(object: Object | undefined): boolean {
        if (object === null || object === undefined || object === '') {
            return true;
        } 
        return false;
    }

    public hasServerRoot(): boolean {
        return GlobalUtilService.SERVER_ROOT.length > 0 ;
    }

    public getServerRoot(): string {
        return GlobalUtilService.SERVER_ROOT;
    }

    
    public getRedirectURI(): string {
        return environment.redirect_uri;
    }

    public getAppKey(): string {
        return environment.key;
    }

    public getAppSecret(): string {
        return environment.secret;
    }

    private handleError(err: HttpErrorResponse): void {
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Not able to read config file', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
    }
}
