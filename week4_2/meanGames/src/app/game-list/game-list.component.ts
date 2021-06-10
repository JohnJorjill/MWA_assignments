import { Component, OnInit } from '@angular/core';

import {GameDataService} from "../game-data.service"
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
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  title = "MEAN Games";
  games: Game[] = []; 
  count: number=5;

  constructor(private gameDataService: GameDataService) { 
    
  }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames():void{
    this.gameDataService.getGames(this.count).then((response)=>this.gotGames(this,response)).catch(this.handleError); 
  }

  private gotGames(gameListComponent:GameListComponent, response: Game[]){
    gameListComponent.games = response;
  }

  private handleError(error:any){
    console.log(error);
  }

  public getPrevGames(){
    if(this.count>5){
      this.count=this.count-5;
      this.gameDataService.getGames(this.count).then((response)=>this.gotGames(this,response)).catch(this.handleError); 
    }else{
      console.log("less than 5");
    }
  }

  public getNextGames(){
    if(this.count<100){
      this.count=this.count+5; 
      this.gameDataService.getGames(this.count).then((response)=>this.gotGames(this,response)).catch(this.handleError); 
    }
  }

  addGame(form: NgForm) {
    const newGame = {
      title: form.value.title,
      price: form.value.price,
      rate: form.value.rating,
      year: form.value.year,
      minPlayers: form.value.minPlayers,
      maxPlayers: form.value.maxPlayers,
      minAge: form.value.minAge,
      designers: form.value.designer
    }
    this.gameDataService.addGame(newGame).then((response)=>{console.log(response);
    })
  }
}
