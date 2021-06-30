import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface PlayerModel {
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


  constructor(
    private fb: FormBuilder,
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
  }
  
  resetPlayers(): void {
    this.playerList = [];
    this.playerAddForm.reset()
  }
}
