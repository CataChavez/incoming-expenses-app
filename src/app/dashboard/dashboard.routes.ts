import { Routes } from "@angular/router";
import { DetailComponent } from "../incoming-expenses/detail/detail.component";
import { IncomingExpensesComponent } from "../incoming-expenses/incoming-expenses.component";
import { StatisticsComponent } from "../incoming-expenses/statistics/statistics.component";

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'incoming-expenses', component: IncomingExpensesComponent },
    { path: 'detail', component: DetailComponent },
]