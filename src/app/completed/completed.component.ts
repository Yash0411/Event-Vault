import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  guest:any;
  itemValue = '';
  upValue='';
  completed: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public auth: AuthService) {
    this.completed = db.list('completed').valueChanges();
   }

  ngOnInit() {
  }

  deletePost(event,item){
    this.db.list(`completed/${item}`).remove().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  callup(item,user)
  {
    if(item.upvote[user]==1){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote-1});
      this.db.list(`completed/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==-1){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1,downvote:item.upvote.downvote-1});
      this.db.list(`completed/${item.Name}/upvote`).set(`${user}`,1);
    }
    else if(!item.upvote[user]){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1});
      this.db.list(`completed/${item.Name}/upvote`).set(`${user}`,1);
    }
    console.log("Upvote added")
  }

  calldown(item,user)
  {
    if(item.upvote[user]==-1){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote-1});
      this.db.list(`completed/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==1){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1,upvote:item.upvote.upvote-1});
      this.db.list(`completed/${item.Name}/upvote`).set(`${user}`,-1);
    }
    else if(!item.upvote[user]){
      this.db.list(`completed/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1});
      this.db.list(`completed/${item.Name}/upvote`).set(`${user}`,-1);
    }
  }

}
