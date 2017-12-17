export interface FantasyResponseJSON {
    fantasy_content: FantasyContentJSON;
}

export interface FantasyContentJSON {
    game: Array<GameJSON>;
    time: string;
}
export interface GameJSON {
    players: PlayersJSON;
}

export interface PlayersJSON {
    player: Array<PlayerJSON>;
    count: number;
}

export interface PlayerJSON {
    player: Object[][];
}

export interface Player {
    player_key?: string;
    player_id?: string;
    display_name?: string;
    last_name?: string;
    first_name?: string;
    team_id?: string;
    home_url?: string;
    uniform_number?: number;
    // todo: add other properties
}
