import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<GlobalState>
  ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  
  ngOnInit(): void {
    this.loginForm;
    this.storeSubscribe();
  }
  
  loginForm: UntypedFormGroup = this.fb.group({
    email: ['admin@admin.cl', Validators.required],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  storeSubscribe() {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }

    //this.spinner.show();
    this.store.dispatch(ui.isLoading());
    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        //this.spinner.hide();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        //this.spinner.hide()
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }

  isValid(field: string) {
    return this.loginForm.controls[field].errors
      && this.loginForm.controls[field].touched;
  }

}
