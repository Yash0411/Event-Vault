import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth:AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    alert("WELCOME TO THE EVENT VAULT OF PCCOE");
    this.router.navigate(['/']);
    return this.updateUserData(credential.user);
  }

   // Sign in with Facebook
   //async FacebookAuth() {
   // const provider = new auth.FacebookAuthProvider();
    //const credential = await this.afAuth.auth.signInWithPopup(provider);
    //return this.updateUserData(credential.user);
  //}  

  

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    alert("SIGNED OUT");
    this.router.navigate(['/']);
  }


  

  canRead(user: User): boolean {
    const allowed = ['admin', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }

}