import { Component, OnDestroy, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<GlobalState>
  ) { }

  myForm: UntypedFormGroup = this.fb.group({
    name: ['admin', Validators.required],
    email: ['admin@admin.cl', Validators.required],
    password: ['123456', Validators.required],
  })

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.myForm;
    this.storeSubscribe();
  }

  storeSubscribe() {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  createUser() {
    if (this.myForm.valid) {
      this.myForm.markAllAsTouched();
    }

    //this.spinner.show();
    this.store.dispatch(ui.isLoading());
    const { name, email, password } = this.myForm.value;
    this.authService.createUser(name, email, password)
      .then(credentials => {
        //this.spinner.hide()
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        //this.spinner.hide();
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

  isValid(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

}
