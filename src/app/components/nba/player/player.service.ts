import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService, AuthenticationService } from '../../common/services/all';
import { Player } from './player.model';

@Injectable()
export class PlayerService {

    private static END_POINT_URL: string = 'players';

    constructor(private httpUtilService: HttpUtilService,
        private authorisationService: AuthenticationService) {
    }

    public getPlayerStream(): Observable<Array<Player>> {
        this.authorisationService._make_signed_request();
        return this.httpUtilService.doGET(PlayerService.END_POINT_URL);
    }
}
