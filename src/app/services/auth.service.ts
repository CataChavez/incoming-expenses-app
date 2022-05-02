import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
  ) { }

  initAuthListener() { 
    this.auth.authState.subscribe(user => {
      console.log(user)
      console.log(user?.email)
      console.log(user?.uid)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    })
  }


  createUser( name: string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email: string, password: string) { 
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }
}
