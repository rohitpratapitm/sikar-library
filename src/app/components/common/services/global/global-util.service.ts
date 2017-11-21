import {Injectable} from '@angular/core';

@Injectable()
export class GlobalUtilService {

    public static MICROSOFT_BROWSERS: string[] = ['MSie', 'Trident', 'Edge'];
    // todo: replace server root with https://fantasysports.yahooapis.com/fantasy/v2/
    public static SERVER_ROOT: string = ' https://my-json-server.typicode.com/rohitpratapitm/fake-json-server/';

    constructor() {

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
}
