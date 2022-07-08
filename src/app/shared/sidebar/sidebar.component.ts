import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  name: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<GlobalState>
  ) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    
    
    this.userSubscription = this.store.select('user').subscribe(({ user }) => {
      if (user != null) {
        this.name = user.name;        
      } else {
        this.name = 'Sin nombre';
      }
    }) 
  }

  logout() {
    this.spinner.show();
    this.auth.logout()
    .then( () => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    })
  }



}
