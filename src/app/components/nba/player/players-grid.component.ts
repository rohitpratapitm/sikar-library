import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Player } from '../fantasy.model';
import { PlayerService } from './player.service';


@Component({
    'selector': 'player-details',
    'templateUrl': './player-grid.html',
    'providers': [PlayerService],
    'styleUrls': ['./player.css']
})
export class PlayerComponent  implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
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
        this.playerDataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // defaults to lowercase matches
        this.playerDataSource.filter = filterValue;
      }

}
