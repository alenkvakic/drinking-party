import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerModel } from './add-player/add-player.component';
import { CardsService } from './cards.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drinking-party';
  players: PlayerModel[] = [];

  constructor(public dialog: MatDialog, private cardsService: CardsService) {}

  gameStartEventHandler(event: PlayerModel[]) {
    console.log("gameStartEventHandler: ", event);
    this.players = event;
  }

  resetPlayers() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(reset => {
      if (reset) {
        this.players = [];
        this.cardsService.resetCards();
      }
    });
  }
}
