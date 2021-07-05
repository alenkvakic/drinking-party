import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class CardsComponent implements OnInit, OnChanges {
  cards: Card[] = data.cardArray;
  randomSelectedPlayer: PlayerModel = {} as PlayerModel;
  randomCard: Card = {} as Card;
  playerNamesAlreadyInCards: string[] = [];

  @Input() players: PlayerModel[] = [];

  constructor(
    private playersService: PlayersService,
    private cardsService: CardsService,
    ) { }

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(cards => console.log('subscribed all cards:', cards));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("basically game starts: ", changes);
    this.getRandomPlayer();
    this.getRandomCard();
  }

  getRandomPlayer(): void {
    this.randomSelectedPlayer = this.players[Math.floor(Math.random()*this.players.length)];
  }

  getAnotherRandomPlayerName(gender?: string): string {
    let randomName = 'Random';
    let filteredNames: PlayerModel[] = [];

    if (gender) {
      filteredNames = this.players
        .filter(player => player.gender === gender)
        .filter(player => player.name !== this.randomSelectedPlayer.name)
        .filter(player => !this.playerNamesAlreadyInCards.includes(player.name));
    } else {
      filteredNames = this.players
        .filter(player => player.name !== this.randomSelectedPlayer.name)
        .filter(player => !this.playerNamesAlreadyInCards.includes(player.name));
    }

    if (filteredNames.length > 0) {
      randomName = filteredNames[Math.floor(Math.random()*filteredNames.length)].name
      this.playerNamesAlreadyInCards.push(randomName);
    }
    return randomName;
  }

  getRandomCard(): void {
    const preparedCards = this.setupDeckForGender([...this.cards]);
    let randomCard = {...preparedCards[Math.floor(Math.random()*preparedCards.length)]};

    if (randomCard.rule.includes('%playerX'))
      randomCard.rule = randomCard.rule.replace('%playerX', this.getAnotherRandomPlayerName());

    if (randomCard.rule.includes('%playerY'))
      randomCard.rule = randomCard.rule.replace('%playerY', this.getAnotherRandomPlayerName());

    if (randomCard.rule.includes('%guyX'))
      randomCard.rule = randomCard.rule.replace('%guyX', this.getAnotherRandomPlayerName('male'));

    if (randomCard.rule.includes('%guyY'))
      randomCard.rule = randomCard.rule.replace('%guyY', this.getAnotherRandomPlayerName('male'));

    if (randomCard.rule.includes('%girlX'))
      randomCard.rule = randomCard.rule.replace('%girlX', this.getAnotherRandomPlayerName('female'));

    if (randomCard.rule.includes('%girlY'))
      randomCard.rule = randomCard.rule.replace('%girlY', this.getAnotherRandomPlayerName('female'));

    this.randomCard = randomCard;
  }

  setupDeckForGender(cards: Card[]): Card[] {
    let filteredDeck = [];
    if (this.randomSelectedPlayer.gender === 'female') {
      filteredDeck = cards.filter(card => card.forBoysOrGirls !== 'boys');
    } else {
      filteredDeck = cards.filter(card => card.forBoysOrGirls !== 'girls');
    }
    return filteredDeck;
  }

  nextCard(): void {
    this.playerNamesAlreadyInCards = [];
    this.getRandomPlayer();
    this.getRandomCard();
  }

}
