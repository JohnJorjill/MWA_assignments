import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Game } from "./game-list/game-list.component"

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private baseURL : string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getGames(count:number) : Promise<Game[]>{
    const url: string = this.baseURL +"/games/some?offset="+count;
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }

  public getGame(id:string) : Promise<Game>{    
    const url: string = this.baseURL +"/game/"+id;
    return this.http.get(url).toPromise().then(this.gotGame).catch(this.handleErrorGame);
  }

  public addGame(game:object) : Promise<Game>{
    const url: string = this.baseURL +"/games";
    return this.http.post(url,game).toPromise().then((response)=>{console.log(response);
    }).catch(this.handleErrorGame);
  }

  public replaceOneGame(id:string,game:object) : Promise<Game>{
    const url: string = this.baseURL +"/game/"+id;
    return this.http.put(url,game).toPromise().then((response)=>{console.log(response);
    }).catch(this.handleErrorGame);
  }

  private gotGame(response:any){
    return response as Game;
  }

  private handleErrorGame(error:any){
    console.log("Error",error);
    return error;
  }

  private gotGames(response:any){
    return response as Game[];
  }

  private handleError(error:any){
    console.log("Error",error);
    return [];
  }


}
