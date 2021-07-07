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
  randomIndex = 0;
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
    let randomCard = {...preparedCards[this.randomIndex]};

    if (preparedCards.length > 0) {
      if (randomCard.rule.includes('%playerX'))
        randomCard.rule = randomCard.rule.replace('%playerX', this.getAnotherRandomPlayerName(allPlayers));

      if (randomCard.rule.includes('%playerY'))
        randomCard.rule = randomCard.rule.replace('%playerY', this.getAnotherRandomPlayerName(allPlayers));

      if (randomCard.rule.includes('%guyX'))
        randomCard.rule = randomCard.rule.replace('%guyX', this.getAnotherRandomPlayerName(allPlayers, 'male'));

      if (randomCard.rule.includes('%guyY'))
        randomCard.rule = randomCard.rule.replace('%guyY', this.getAnotherRandomPlayerName(allPlayers, 'male'));

      if (randomCard.rule.includes('%girlX'))
        randomCard.rule = randomCard.rule.replace('%girlX', this.getAnotherRandomPlayerName(allPlayers, 'female'));

      if (randomCard.rule.includes('%girlY'))
        randomCard.rule = randomCard.rule.replace('%girlY', this.getAnotherRandomPlayerName(allPlayers, 'female'));
    } else {
      this.isFinished = true;
      return {
        id: "finish",
        amountInDeck: 1,
        rule: "Unlucky you! Finish your drink and the game is over",
        drink: true,
        intercourse: false,
        forBoysOrGirls: "both",
        expectsBoyOrGirl: "both",
        sexy: false
      }
    }

    console.log('preparedCards: ', preparedCards);
    this.initial = false;
    return randomCard;
  }

  removeCard(): void {
    if (this.randomIndex !== undefined && !this.initial) {
      this.storedCards.splice(this.randomIndex, 1);
      this.allCardsSubject.next(this.storedCards);
    }
  }
}
