import { Component, Input, OnInit } from '@angular/core';

export interface Card {
  id:             string;
  amountInDeck:   number;
  rule:           string;
  drink:          boolean;
  intercourse:    boolean;
  forBoysOrGirls: string;
  sexy:           boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  logoPath = "";
  @Input() rule = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt';
  @Input() playerName = 'John Doe';
  @Input() gender = 'male';

  constructor() { }

  ngOnInit(): void {
    this.logoPath = `./../../assets/images/${this.gender}.png`;
  }

}
