import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducer';
import { IncomingExpenses } from 'src/app/models/incomingexpenses.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  incoming: number = 0;
  expenses: number = 0;
  totalExpenses: number = 0;
  totalIncoming: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  incExpSubscription!: Subscription;

  constructor(
    private store: Store<GlobalState>
  ) { }

  ngOnDestroy() {
    
  }

  ngOnInit(): void {
    this.incExpSubscription = this.store.select('incomingExpenses')
      .subscribe(({ items }) => this.generateStatistics(items));
  }

  generateStatistics(items: IncomingExpenses[]) {
    this.incoming= 0;
    this.expenses= 0;
    this.totalExpenses= 0;
    this.totalIncoming= 0;

    for (const item of items) {
      if(item.type === 'incoming') {
        this.totalIncoming += Number(item.amount);
        this.incoming ++;
      } else {
        this.totalExpenses += Number(item.amount);
        this.expenses ++;
      }      
    }
    this.doughnutChartData.datasets = [
      { data: [this.totalIncoming, this.totalExpenses] }
    ]
      
  }

}
