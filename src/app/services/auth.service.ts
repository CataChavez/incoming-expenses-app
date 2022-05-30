import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.models';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Item } from '@angular/fire/analytics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private itemDoc!: AngularFirestoreDocument<Item>;
  item!: Observable<Item>;
  

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  initAuthListener() { 
    this.auth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    })
  }


  createUser( name: string, email: string | null, password: string) {
    return this.auth.createUserWithEmailAndPassword( email!, password)
      .then(({ user }) => {
        console.log({user})
        const newUser = new User(user!.uid, name, user!.email!)
        this.itemDoc = this.firestore.doc<Item>(`${newUser.uid}/user`);
        
 
      })
  }

  loginUser(email: string, password: string) { 
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState
      .pipe(
      map(fbUser => fbUser != null)
    )
  }
}
