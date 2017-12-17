import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from '../../common/services/all';
import { Player, FantasyResponseJSON, PlayersJSON, PlayerJSON } from '../fantasy.model';

@Injectable()
export class PlayerService {

    private static END_POINT_URL: string = '/api/game/223/players';
    
    constructor(private httpUtilService: HttpUtilService) {
    }

    public getPlayerStream(): Observable<Array<Player>> {
      
        return this.httpUtilService.doGET<FantasyResponseJSON>(PlayerService.END_POINT_URL)
        .map(fantasyResponse => {
            if (fantasyResponse) {
                return this.mapPlayers(fantasyResponse.fantasy_content.game[1].players);
            }
        });
    }

    private mapPlayers(playersJSON: PlayersJSON): Array<Player> {
        const players: Array<Player> = [];
        for (let index = 0; index < playersJSON.count; index++) {
            players.push(this.mapPlayerProperties(playersJSON[index].player[0]));
        }
        return players;
    }

    private mapPlayerProperties(playerJSON: PlayerJSON): Player {
        const offset: number = playerJSON[3]['injury_note'] ? 0 : -1 ;
        const player: Player = {
            player_key: playerJSON[0]['player_key'],
            player_id: playerJSON[1]['player_id'],
            first_name: playerJSON[2].name['first'],
            last_name: playerJSON[2].name['last'],
            display_name:  playerJSON[2].name['first'] + ' ' + playerJSON[2].name['last'],
            team_id: playerJSON[6 + offset]['editorial_team_full_name'],
            uniform_number: playerJSON[9 + offset]['uniform_number'],
            home_url: playerJSON[11 + offset].headshot.url

        };
        return player;
    }
}
