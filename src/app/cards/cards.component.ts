import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlayerModel } from '../add-player/add-player.component';
import { Card } from '../card/card.component';
import { PlayersService } from '../players.service';
import data from './../../../src/assets/cards.json';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges {
  cards: Card[] = data.cardArray;
  randomSelectedPlayer: PlayerModel = {} as PlayerModel;
  randomCard: Card = {} as Card;

  @Input() players: PlayerModel[] = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log("basically game starts: ", changes);
    this.getRandomPlayer();
    this.getRandomCard();
  }

  getRandomPlayer(): void {
    this.randomSelectedPlayer = this.players[Math.floor(Math.random()*this.players.length)];
  }

  getAnotherRandomPlayerName(): string {
    let randomName = 'Random';
    let filteredNames = this.players.filter(player => player.name !== this.randomSelectedPlayer.name);
    if (filteredNames.length > 0) {
      randomName = filteredNames[Math.floor(Math.random()*filteredNames.length)].name
    } 
    return randomName;
  }

  getRandomCard(): void {
    let randomCard = {...this.cards[Math.floor(Math.random()*this.cards.length)]};
    randomCard.rule = randomCard.rule.replace("%playerX", this.getAnotherRandomPlayerName());
    randomCard.rule = randomCard.rule.replace("%playerY", this.getAnotherRandomPlayerName());

    this.randomCard = randomCard;
  }

  nextCard(): void {
    this.getRandomPlayer();
    this.getRandomCard();
  }

}
