import { Component, OnInit } from '@angular/core';

import {FriendDataService} from "../friend-data.service"
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

export class Friend{
  _id: number = 1;
  firstname: string = "";
  lastname: string = "";
  birthdate!: number;
  interest!: {movie:string,music:string,sport:string};
}

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})
export class FriendDetailsComponent implements OnInit {

  friend!: Friend;
  id!:string;

  constructor(private friendDataService: FriendDataService , private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('friendId') as string;
    this.getFriend();
  }

  private getFriend():void{
    this.friendDataService.getFriend(this.id).then((response)=>this.gotFriend(this,response)).catch(this.handleError); 
  }

  private gotFriend(friendDetailsComponent:FriendDetailsComponent, response: Friend){
    friendDetailsComponent.friend = response;
  }

  private handleError(error:any){
    console.log(error);
  }

  deleteFriend() {
    this.friendDataService.deleteFriend(this.id).then((response)=>{console.log(response);
    })
  }
}
