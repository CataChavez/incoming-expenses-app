import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubscrition!: Subscription;
  userName: string = '';

  constructor(
    private store : Store<GlobalState>
  ) { }

  ngOnDestroy(): void { 
    this.userSubscrition?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscrition = this.store.select('user').subscribe(({ user }) => { 
      if (user != null) {
        this.userName = user.name
      } else {
        this.userName = 'Eser'
      }
    })
  }


}
