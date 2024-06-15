import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, onSnapshot, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private firestore: Firestore ,private router: Router) {

  }

  async newGame() {
    let game = new Game();
    await addDoc(collection(this.firestore, 'games'), game.toJson()).catch(
      (err) => { console.log(err) }
    ).then( (gameInfo:any)=>{
      this.router.navigateByUrl('/game/'+ gameInfo.id);
    })
  }
}