import { Injectable } from '@angular/core';
import { GlobalUtilService } from '../all';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LoggerService {

    private isDevMode: boolean;

    constructor() {
        this.isDevMode = !environment.production;
    }

    public debug(message: string): void {
        if (this.isDevMode) {
            console.log(message);
        }
    }

    public log(message: string): void {
        console.log(message);
    }

}
