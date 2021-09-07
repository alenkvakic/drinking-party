import { Injectable } from '@angular/core';
import { Card } from './card/card.component';
import data from './../../src/assets/cards.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerModel } from './add-player/add-player.component';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  storedCards: Card[] = [];
  cards: Card[] = data.cardArray;
  allCardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  randomIndex: number | undefined = undefined;
  randomCard!: Card;
  randomSelectedPlayer: PlayerModel = {} as PlayerModel;
  playerNamesAlreadyInCards: string[] = [];
  initial = true;
  isFinished = false;
  dirtyMode = true;

  constructor() {
    this.resetCards();
  }

  filterGender(players: PlayerModel[]) {
    let allCards: Card[] = [...this.storedCards];
    const hasGirls = players.some(player => player.gender === 'female')
    const hasBoys = players.some(player => player.gender === 'male')

    if (!hasGirls) {
      allCards = allCards.filter(card => card.forBoysOrGirls !== 'girls' && card.expectsBoyOrGirl !== 'girl');
    }
    if (!hasBoys) {
      allCards = allCards.filter(card => card.forBoysOrGirls !== 'boys' && card.expectsBoyOrGirl !== 'boy');
    }
    if (!this.dirtyMode) {
      allCards = allCards.filter(card => !card.sexy);
    }

    this.storedCards = allCards;
    this.allCardsSubject.next(allCards);
  }

  resetCards(): void {
    this.isFinished = false;
    this.initial = true;
    let allCards: Card[] = [];
    this.cards.forEach(card => {
      for (let i = 0; i < card.amountInDeck; i++) {
        allCards.push(card);
      }
    });
    this.storedCards = allCards;
    this.allCardsSubject.next(allCards);
  }

  getCards$(): Observable<Card[]> {
    return this.allCardsSubject.asObservable();
  }

  toggleDirtyMode(flag: boolean): void {
    this.dirtyMode = flag;
  }

  setupDeckForGender(player: PlayerModel, cards: Card[]): Card[] {
    let filteredDeck = [];
    if (player.gender === 'female') {
      filteredDeck = cards.filter(card => card.forBoysOrGirls !== 'boys');
    } else {
      filteredDeck = cards.filter(card => card.forBoysOrGirls !== 'girls');
    }
    return filteredDeck;
  }

  clearPlayerNamesInCards() {
    this.playerNamesAlreadyInCards = [];
  }

  getAnotherRandomPlayerName(players: PlayerModel[], gender?: string): string {
    let randomName = 'Random';
    let filteredNames: PlayerModel[] = [];

    if (gender) {
      filteredNames = players
        .filter(player => player.gender === gender)
        .filter(player => player.name !== this.randomSelectedPlayer.name)
        .filter(player => !this.playerNamesAlreadyInCards.includes(player.name));
    } else {
      filteredNames = players
        .filter(player => player.name !== this.randomSelectedPlayer.name)
        .filter(player => !this.playerNamesAlreadyInCards.includes(player.name));
    }

    if (filteredNames.length > 0) {
      randomName = filteredNames[Math.floor(Math.random()*filteredNames.length)].name
      this.playerNamesAlreadyInCards.push(randomName);
    }
    return randomName;
  }

  getRandomPlayer(players: PlayerModel[]): PlayerModel {
    this.randomSelectedPlayer = players[Math.floor(Math.random()*players.length)];
    return this.randomSelectedPlayer;
  }

  getRandomCard(selectedPlayer: PlayerModel, allPlayers: PlayerModel[]): Card {
    this.removeCard();
    const preparedCards = this.setupDeckForGender(selectedPlayer, [...this.storedCards]);
    this.randomIndex = Math.floor(Math.random()*preparedCards.length);
    this.randomCard = {...preparedCards[this.randomIndex]};

    if (preparedCards.length > 0) {
      if (this.randomCard.rule.includes('%playerX'))
        this.randomCard.rule = this.randomCard.rule.replace('%playerX', this.getAnotherRandomPlayerName(allPlayers));

      if (this.randomCard.rule.includes('%playerY'))
        this.randomCard.rule = this.randomCard.rule.replace('%playerY', this.getAnotherRandomPlayerName(allPlayers));

      if (this.randomCard.rule.includes('%guyX'))
        this.randomCard.rule = this.randomCard.rule.replace('%guyX', this.getAnotherRandomPlayerName(allPlayers, 'male'));

      if (this.randomCard.rule.includes('%guyY'))
        this.randomCard.rule = this.randomCard.rule.replace('%guyY', this.getAnotherRandomPlayerName(allPlayers, 'male'));

      if (this.randomCard.rule.includes('%girlX'))
        this.randomCard.rule = this.randomCard.rule.replace('%girlX', this.getAnotherRandomPlayerName(allPlayers, 'female'));

      if (this.randomCard.rule.includes('%girlY'))
        this.randomCard.rule = this.randomCard.rule.replace('%girlY', this.getAnotherRandomPlayerName(allPlayers, 'female'));
    } else {
      this.isFinished = true;
      return {
        id: "finish",
        amountInDeck: 1,
        title: "The End",
        rule: "Unlucky you! Finish your drink and the game is over",
        drink: true,
        intercourse: false,
        forBoysOrGirls: "both",
        expectsBoyOrGirl: "both",
        sexy: false
      }
    }
  
    console.log('preparedCards (done filtering for gender and available cards for this player): ', preparedCards);

    this.initial = false;
    return this.randomCard;
  }

  removeCard(): void {
    if (this.randomIndex !== undefined && !this.initial) {
      const indexToRemove = this.storedCards.indexOf(this.randomCard);
      console.log('card to remove: ', this.randomCard);
      this.storedCards.splice(indexToRemove, 1);
      console.log('deck after remove: ', this.storedCards);
      this.allCardsSubject.next(this.storedCards);
    }
  }
}
