import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { CompletedComponent } from './completed/completed.component';
import { Identifiers } from '@angular/compiler';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DevelopersComponent } from './developers/developers.component';

const config = {
  apiKey: "---",
    authDomain: "---",
    databaseURL: "---",
    projectId: "---",
    storageBucket: "---",
    messagingSenderId: "---",
    appId: "---",
    measurementId: "---"
};

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    SuggestedComponent,
    CompletedComponent,
    UserProfileComponent,
    DevelopersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class auth {
  user?:boolean
  admin?:boolean
  representative?:boolean
}

export class login {
  Name:string
  auth:string 
  uid:string
  addr:string
  type:auth
}

export class problem {
  name:string
  description:string
  type:string
  upvote:number
  downvote:number
  image:string
}