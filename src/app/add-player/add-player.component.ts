import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlayersService } from '../players.service';

export interface PlayerModel {
  name: string;
  gender: string;
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  isSubmitted = false;
  playerList: PlayerModel[] = [];
  playerAddForm = this.fb.group({
    name: '',
    gender: 'male',
  });

  @Output() gameStart = new EventEmitter<PlayerModel[]>();

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('this.checkoutForm.get(name)?.value: ', this.playerAddForm.get('name')?.value)
    if (!this.playerAddForm.get('name')?.value) {
      return;
    }
    this.isSubmitted = true;
    console.log('this.checkoutForm.value(): ', this.playerAddForm.value);
    console.warn('Your order has been submitted', this.playerAddForm.value);
    this.playerList = [...this.playerList, this.playerAddForm.value];
    console.log('playerList: ', this.playerList);
  }

  removeLastPlayer(): void {
    this.playerList.splice(-1,1);
  }

  startGame(): void {
    console.log('Start!');
    this.playersService.addPlayers(this.playerList);
    this.gameStart.emit(this.playerList);
  }
  
  resetPlayers(): void {
    this.playerList = [];
    this.playerAddForm.reset()
  }
}
