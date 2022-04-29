import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  myForm: FormGroup = this.fb.group({
    name: ['nombre', Validators.required],
    email: ['mail', Validators.required],
    password: ['123456', Validators.required],
  })


  ngOnInit(): void {

  }

  createUser() {
    console.log(this.myForm);
    console.log(this.myForm.valid);
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      console.log('formulario valido');
      this.myForm.markAllAsTouched();
      this.myForm.reset();
    }

  }

  isValid(field: string){ 
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

}
