import { Component } from '@angular/core';
import { PlayerModel } from './add-player/add-player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drinking-party';
  players: PlayerModel[] = [];

  gameStartEventHandler(event: PlayerModel[]) {
    console.log("gameStartEventHandler: ", event);
    this.players = event;
  }

  resetPlayers() {
    this.players = [];
    console.log('clear players!');
  }
}
