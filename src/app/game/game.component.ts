import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any;
  game: Game;
  firestore: Firestore = inject(Firestore); // neu
  test: any;
  gameJson = [];
  url: string = '';
  unsubList;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.game = new Game();

    this.route.params.subscribe((params: any) => {
      this.url = params.id;
    });
    this.unsubList = onSnapshot(doc(this.getData(), this.url), (currentGame: any) => {
      // console.log("current Game: ", currentGame.data());
      this.game.currentPlayer = currentGame.data().currentPlayer;
      this.game.playedCard = currentGame.data().playedCard;
      this.game.players = currentGame.data().players;
      this.game.stack = currentGame.data().stack;
    })
  }

  ngOnDestroy() {
    this.unsubList();
  }

  ngOnInit(): void {
    // this.createNewGame();
  }

  getDoc(docRef: string) {
    return doc(this.getData(), docRef);
  }

  getData() {
    return collection(this.firestore, 'games');
  }

  async createNewGame() {
    await addDoc(this.getData(), this.game.toJson()).catch(
      (err) => { console.log(err) }
    );
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      // this.saveGame();    
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    })

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    })
  }

  async saveGame() {
    let Ref = doc(this.getData(), this.url);   
    let currentplayer  = this.game.toJson().currentPlayer;
    let playedCard = this.game.toJson().playedCard;
    let players = this.game.toJson().players;
    let stack = this.game.toJson().stack;
    console.log('before update: ', currentplayer);
    await updateDoc(Ref, {
      currentplayer: currentplayer,
      playedCard: playedCard,
      players: players,
      stack: stack,
    });
    debugger;
    console.log('after update: ', currentplayer);
  }
}