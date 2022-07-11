import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { orderItemsPipe } from '../pipes/order-of-Items.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomingExpensesComponent } from './incoming-expenses.component';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomingExpenseReducer } from './incoming-expenses.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomingExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    orderItemsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomingExpenses', incomingExpenseReducer),
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ]
})
export class IncomingExpensesModule { }
