import { Injectable } from '@angular/core';
import { Card } from './card/card.component';
import data from './../../src/assets/cards.json';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: Card[] = data.cardArray;
  allCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  constructor() {
    let allCards: Card[] = [];
    this.cards.forEach(card => {
      for (let i = 0; i < card.amountInDeck; i++) {
        allCards.push(card);
      }
    });
    this.allCards$.next(allCards);
  }

  getCards(): Observable<Card[]> {
    return this.allCards$.asObservable();
  }
}
