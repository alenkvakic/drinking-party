import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CardsComponent } from './cards/cards.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DebounceClickDirective } from './debounce-click.directive'

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    CardsComponent,
    FooterComponent,
    CardComponent,
    ConfirmDialogComponent,
    DebounceClickDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
