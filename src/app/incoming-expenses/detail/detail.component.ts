import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducer';
import { IncomingExpenses } from 'src/app/models/incomingexpenses.model';
import { IncomingExpensesService } from 'src/app/services/incoming-expenses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy{

  incomingExpenses: IncomingExpenses[] = [];
  incExpSubscription!: Subscription;

  constructor(
    private store: Store<GlobalState>,
    private ieSv: IncomingExpensesService,
  ) { }

  ngOnDestroy(): void { 
    this.incExpSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('incomingExpenses')
      .subscribe(({ items }) => {
        this.incomingExpenses = items;
      })  
  }

  delete(id: any) {
    this.ieSv.deleteIncomingExpense(id)
      .then(() => { Swal.fire('Item Delete', 'Item deleted successfully', 'success') })
      .catch( err => Swal.fire('Error', err.message, 'error'))
    
  }

}
