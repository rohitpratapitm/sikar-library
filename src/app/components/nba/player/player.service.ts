import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from '../../common/services/all';
import { Player } from './player.model';

@Injectable()
export class PlayerService {

    private static END_POINT_URL: string = 'players';

    constructor(private httpUtilService: HttpUtilService) {
    }

    public getPlayerStream(): Observable<Array<Player>> {
        return this.httpUtilService.doGET(PlayerService.END_POINT_URL);
    }
}
