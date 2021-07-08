import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlayerModel } from '../add-player/add-player.component';

export interface Card {
  id: string;
  amountInDeck: number;
  title?: string;
  rule: string;
  drink: boolean;
  intercourse: boolean;
  forBoysOrGirls: string;
  expectsBoyOrGirl: string;
  sexy: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  logoPath = "";
  @Input() card: Card = {} as Card;
  @Input() player: PlayerModel = {name: 'Random Dude', gender: 'male'};

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) { 
    this.logoPath = `./../../assets/images/${this.player.gender}.png`;
  }

}
