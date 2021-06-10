import { Component, OnInit } from '@angular/core';

import {GameDataService} from "../game-data.service"
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

export class Game{
  _id: number = 1;
  title: string = "";
  price: number = 0;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
  rate!:number;
  year!:number;
  designers!:string;
}

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  game!: Game;
  id!:string;

  constructor(private gameDataService: GameDataService , private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('gameId') as string;
    this.getGame();
  }

  private getGame():void{
    this.gameDataService.getGame(this.id).then((response)=>this.gotGame(this,response)).catch(this.handleError); 
  }

  private gotGame(gameDetailsComponent:GameDetailsComponent, response: Game){
    gameDetailsComponent.game = response;
  }

  private handleError(error:any){
    console.log(error);
  }

  updateGame(form: NgForm) {
    const editedGame = {
      title: this.game.title,
      price: form.value.price,
      rate: this.game.rate,
      year: this.game.year,
      minPlayers: form.value.minPlayers,
      maxPlayers: form.value.maxPlayers,
      minAge: form.value.minAge,
      designers: this.game.designers
    }

    console.log(editedGame);
    

    this.gameDataService.replaceOneGame(this.id,editedGame).then((response)=>{console.log(response);
    })
  }
}
