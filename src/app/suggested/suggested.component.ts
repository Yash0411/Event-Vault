import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.css']
})
export class SuggestedComponent implements OnInit {
 guest:any;
  itemValue = []
  comment =[]
  suggested: Observable<any[]>;
  commt: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public auth: AuthService) {
    this.suggested = db.list('suggested').valueChanges();
   }
   
  ngOnInit() {
  }

  
  
  imageSrc;
  sellersPermitFile: any;
  
  sellersPermitString: string;
  
  public picked(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
  }
  

  onSubmit(user) {
    const data = {Name: this.itemValue[0],description:this.itemValue[1],type:this.itemValue[2],upvote:{upvote:0,downvote:0}, username:user.displayName,photo:user.photoURL,comment:[]}
    this.db.list(`suggested/`).set(this.itemValue[0],data);
    this.itemValue=[]
    this.sellersPermitString=''
  }

  deletePost(item){
    this.db.list(`suggested/${item}`).remove().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  movePost(item){
    const data = {Name: item.Name,description:item.description,type:item.type,upvote:{upvote:0,downvote:0}, username:item.username,photo:item.photo}
    this.db.list('current').set(item.Name,data);
    this.db.list(`suggested/${item.Name}`).remove().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }







  callup(item,user)
  {
    if(item.upvote[user]==1){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote-1});
      this.db.list(`suggested/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==-1){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1,downvote:item.upvote.downvote-1});
      this.db.list(`suggested/${item.Name}/upvote`).set(`${user}`,1);
    }
    else if(!item.upvote[user]){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {upvote:item.upvote.upvote+1});
      this.db.list(`suggested/${item.Name}/upvote`).set(`${user}`,1);
    }
    console.log("Upvote added")
  }



  calldown(item,user)
  {
    if(item.upvote[user]==-1){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote-1});
      this.db.list(`suggested/${item.Name}/upvote/${user}`).remove();
    }
    else if(item.upvote[user]==1){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1,upvote:item.upvote.upvote-1});
      this.db.list(`suggested/${item.Name}/upvote`).set(`${user}`,-1);
    }
    else if(!item.upvote[user]){
      this.db.list(`suggested/${item.Name}/`).update(`upvote`, {downvote:item.upvote.downvote+1});
      this.db.list(`suggested/${item.Name}/upvote`).set(`${user}`,-1);
    }
  }




  addcomment(item,Name,photo,y){
    let c
    if(!item.comment){c="0"}
    else{
      c=item.comment.length
      console.log(c);
      c=c.toString()
    }
    this.db.list(`suggested/${item.Name}/comment`).set(c,{comm:this.comment[y],id:Name,photo:photo})
    this.comment[y]=''
  }

}
