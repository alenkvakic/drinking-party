import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerModel } from '../add-player/add-player.component';
import { Card } from '../card/card.component';
import { CardsService } from '../cards.service';
import data from './../../../src/assets/cards.json';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnChanges {
  cards: Card[] = data.cardArray;
  randomSelectedPlayer: PlayerModel = {} as PlayerModel;
  randomCard: Card = {} as Card;
  playerNamesAlreadyInCards: string[] = [];
  sub = new Subscription();

  @Input() players: PlayerModel[] = [];

  constructor(
    private cardsService: CardsService,
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("basically game starts: ", changes);
    this.cardsService.filterGender(this.players);
    this.getRandomPlayer();
    this.getRandomCard();
  }

  getRandomPlayer(): void {
    this.randomSelectedPlayer = this.cardsService.getRandomPlayer(this.players);
  }

  getRandomCard(): void {
    this.randomCard = this.cardsService.getRandomCard(this.randomSelectedPlayer, this.players);
  }

  nextCard(): void {
    this.cardsService.clearPlayerNamesInCards();
    this.getRandomPlayer();
    this.getRandomCard();
  }
}
