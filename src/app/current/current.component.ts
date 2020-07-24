import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import {Item} from '../../app/user.model'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit{
  guest:any;
  itemValue = '';
  itemID
  upvote
  current: Observable<any[]>;  
 

  constructor(public db: AngularFireDatabase, public auth: AuthService) {
    this.current = db.list('current').valueChanges();
   }

   
   ngOnInit() {    
  }
  
  callup(item,user)
  {
    if(item.upvote[user]==1){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote-1});
      this.db.list(`current/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==-1){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1,downvote:item.upvote.downvote-1});
      this.db.list(`current/${item.Name}/upvote`).set(`${user}`,1);
    }
    else if(!item.upvote[user]){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1});
      this.db.list(`current/${item.Name}/upvote`).set(`${user}`,1);
    }
    console.log("Upvote added")
  }

  calldown(item,user)
  {
    if(item.upvote[user]==-1){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote-1});
      this.db.list(`current/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==1){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1,upvote:item.upvote.upvote-1});
      this.db.list(`current/${item.Name}/upvote`).set(`${user}`,-1);
    }
    else if(!item.upvote[user]){
      this.db.list(`current/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1});
      this.db.list(`current/${item.Name}/upvote`).set(`${user}`,-1);
    }
  }

  deletePost(event,item){
    this.db.list(`current/${item}`).remove().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  movePost(item){
    const data = {Name: item.Name,description:item.description,type:item.type,upvote:{upvote:0,downvote:0}, username:item.username,photo:item.photo}
    this.db.list('completed').set(item.Name,data);
    this.db.list(`current/${item.Name}`).remove().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }
  
}
