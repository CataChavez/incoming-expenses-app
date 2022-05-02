import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  myForm: FormGroup = this.fb.group({
    name: ['admin', Validators.required],
    email: ['admin@admin.cl', Validators.required],
    password: ['123456', Validators.required],
  })


  ngOnInit(): void {

  }

  createUser() {
    if (this.myForm.valid) {
      this.myForm.markAllAsTouched();
    }
    this.spinner.show();
    const { name, email, password } = this.myForm.value;
    this.authService.createUser(name, email, password)
      .then(credentials => {
          this.spinner.hide()
          this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err)
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

  isValid(field: string){ 
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

}
