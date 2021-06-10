import { Component, OnInit } from '@angular/core';

import {FriendDataService} from "../friend-data.service"
import { NgForm } from '@angular/forms';

export class Friend{
  _id: number = 1;
  firstname: string = "";
  lastname: string = "";
  birthdate!: number;
  interest!: {movie:string,music:string,sport:string};
}

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  title = "MEAN Friends";
  friends: Friend[] = []; 
  count: number=5;

  constructor(private friendDataService: FriendDataService) { 
    
  }

  ngOnInit(): void {
    this.getFriends();
  }

  private getFriends():void{    
    this.friendDataService.getFriends(this.count).then((response)=>this.gotFriends(this,response)).catch(this.handleError); 

  }

  private gotFriends(friendListComponent:FriendListComponent, response: Friend[]){
    console.log(response);
    friendListComponent.friends = response;
  }

  private handleError(error:any){
    console.log(error);
  }

  public getPrevFriends(){
    if(this.count>5){
      this.count=this.count-5;
      this.friendDataService.getFriends(this.count).then((response)=>this.gotFriends(this,response)).catch(this.handleError); 
    }else{
      console.log("less than 5");
    }
  }

  public getNextFriends(){
    if(this.count<100){
      this.count=this.count+5; 
      this.friendDataService.getFriends(this.count).then((response)=>this.gotFriends(this,response)).catch(this.handleError); 
    }
  }

  addFriend(form: NgForm) {
    const newFriend = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      birthdate: form.value.birthdate
    }
    this.friendDataService.addFriend(newFriend).then((response)=>{console.log(response);
    })
  }
}
