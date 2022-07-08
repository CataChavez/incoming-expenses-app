import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalState } from '../app.reducer';
import { IncomingExpenses } from '../models/incomingexpenses.model';
import { IncomingExpensesService } from '../services/incoming-expenses.service';
import * as ui from '../shared/ui.actions';


@Component({
  selector: 'app-incoming-expenses',
  templateUrl: './incoming-expenses.component.html',
  styles: [
  ]
})
export class IncomingExpensesComponent implements OnInit, OnDestroy{

  loading: boolean = false;
  type: string = 'incoming';
  loadingSubscription!: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private ieSvc: IncomingExpensesService,
    private store: Store<GlobalState>,
  ) { }

  ngOnDestroy(): void { 
    this.loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.incomingExpensesForm;
    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => isLoading)
  }

  incomingExpensesForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    amount: ['', Validators.required],
  })

  clearForm() {
    this.incomingExpensesForm.reset();
  }
  
  save() {
    this.store.dispatch(ui.isLoading());
    if (this.incomingExpensesForm.valid) {
      const { description, amount } = this.incomingExpensesForm.value;
      
      const incomingExpense = new IncomingExpenses(description, amount, this.type);
      console.log(incomingExpense)
      this.ieSvc.createIncomingExpense(incomingExpense)
        .then((res) => {
          Swal.fire('Success', 'Incoming Expense created', 'success');
          this.clearForm()
        })
        .catch((error) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Error', error.message, 'error');
        })
    }
  }


}
