import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Friend } from "./friend-list/friend-list.component"

@Injectable({
  providedIn: 'root'
})
export class FriendDataService {

  private baseURL : string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getFriends(count:number) : Promise<Friend[]>{
    const url: string = this.baseURL +"/friends";
    return this.http.get(url).toPromise().then(this.gotFriends).catch(this.handleError);
  }

  public getFriend(id:string) : Promise<Friend>{    
    const url: string = this.baseURL +"/friends/"+id;
    return this.http.get(url).toPromise().then(this.gotFriend).catch(this.handleErrorFriend);
  }

  public addFriend(friend:object) : Promise<Friend>{
    const url: string = this.baseURL +"/friends";
    return this.http.post(url,friend).toPromise().then((response)=>{console.log(response);
    }).catch(this.handleErrorFriend);
  }

  public deleteFriend(id:string) : Promise<Friend>{
    const url: string = this.baseURL +"/friends"+id;
    return this.http.delete(url).toPromise().then((response)=>{console.log(response);
    }).catch(this.handleErrorFriend);
  }

  private gotFriend(response:any){
    return response as Friend;
  }

  private handleErrorFriend(error:any){
    console.log("Error",error);
    return error;
  }

  private gotFriends(response:any){
    return response as Friend[];
  }

  private handleError(error:any){
    console.log("Error",error);
    return [];
  }
}
