import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomingExpensesComponent } from './incoming-expenses/incoming-expenses.component';
import { StatisticsComponent } from './incoming-expenses/statistics/statistics.component';
import { DetailComponent } from './incoming-expenses/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomingExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
