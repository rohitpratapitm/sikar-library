import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Player } from './player.model';
import { PlayerService } from './player.service';


@Component({
    'selector': 'player-details',
    'templateUrl': './player-grid.html',
    'providers': [PlayerService],
    'styleUrls': ['./player.css']
})
export class PlayerComponent  implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    
    columnValues: string [] = ['player_id', 'display_name', 'first_name', 'last_name', 'team_id', 'home_url', 'uniform_number'];

    playerDataSource: MatTableDataSource<Player>;


    constructor(private playerService: PlayerService) {
    }

    ngOnInit() {
        this.playerDataSource = new MatTableDataSource();
        this.playerService.getPlayerStream().subscribe(players => {
            this.playerDataSource.data = players;
        });
    }

    ngAfterViewInit() {
        this.playerDataSource.sort = this.sort;
    }

}
