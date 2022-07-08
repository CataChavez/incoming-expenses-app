import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '@angular/fire/analytics';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from '../app.reducer';
import * as authActions from '../auth/auth.action';
import { unSetItems } from '../incoming-expenses/incoming-expenses.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private itemDoc: any;
  item!: Observable<Item>;
  userSubscription!: Subscription;
  private _user!: User;

  get user() {
    return { ... this._user }
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<GlobalState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userSubscription = this.firestore.doc(`${user.uid}/user`).valueChanges().subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({ user }));
        })  
      } else {
        this._user = (null as unknown) as User;
        this.store.dispatch(authActions.unSetUser());
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetItems());
      }
    })
  }


  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email!, password)
      .then(({ user }) => {
        const newUser = new User(name, email, user!.uid);
        return this.itemDoc = this.firestore.doc<Item>(`${newUser.uid}/user`).set({ ...newUser });
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
