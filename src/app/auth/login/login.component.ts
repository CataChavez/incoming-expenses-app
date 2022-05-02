import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  loginForm: FormGroup = this.fb.group({
    email: ['admin@admin.cl', Validators.required],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {

  }

  loginUser() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
    this.spinner.show();
    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        this.spinner.hide();
        this.router.navigate(['/']);
      })
      .catch(err => {

        this.spinner.hide()
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
