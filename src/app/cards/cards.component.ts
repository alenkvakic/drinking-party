import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerModel } from '../add-player/add-player.component';
import { Card } from '../card/card.component';
import { CardsService } from '../cards.service';
import { PlayersService } from '../players.service';
import data from './../../../src/assets/cards.json';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges, OnDestroy {
  cards: Card[] = data.cardArray;
  randomSelectedPlayer: PlayerModel = {} as PlayerModel;
  randomCard: Card = {} as Card;
  playerNamesAlreadyInCards: string[] = [];
  sub = new Subscription();

  @Input() players: PlayerModel[] = [];

  constructor(
    private playersService: PlayersService,
    private cardsService: CardsService,
    ) { }

  ngOnInit(): void {
    this.sub = this.cardsService.getCards().subscribe(cards => console.log('subscribed all cards:', cards));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("basically game starts: ", changes);
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
