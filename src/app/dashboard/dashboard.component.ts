import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, pipe, Subscription } from 'rxjs';
import { GlobalState } from '../app.reducer';
import { setItems } from '../incoming-expenses/incoming-expenses.actions';
import { IncomingExpensesService } from '../services/incoming-expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  incomingExpensesSubscription!: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private store: Store<GlobalState>,
    private ieSv: IncomingExpensesService,
  ) { 
    
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.incomingExpensesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe( ({ user }) => {
        this.incomingExpensesSubscription = this.ieSv.initIncomingExpensesListener( user.uid )
          .subscribe(items => {
            this.store.dispatch(setItems({ items: items }))
        })
      })      
  }

}
