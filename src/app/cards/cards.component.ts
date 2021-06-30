import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import data from './../../../src/assets/cards.json';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: Card[] = data.cardArray;

  constructor() { }

  ngOnInit(): void {
  }

}
