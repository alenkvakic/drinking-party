import { Injectable } from '@angular/core';
import { PlayerModel } from './add-player/add-player.component';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  players: PlayerModel[] = [];

  constructor() { }

  addPlayers(playerList: PlayerModel[]): void {
    this.players = playerList;
    console.log('added players: ', this.players);
  }

  getPlayers(): PlayerModel[] {
    return this.players;
  }
}
