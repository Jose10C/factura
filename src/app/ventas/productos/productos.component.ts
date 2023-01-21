import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  form!: FormGroup;
  constructor(
    private FormBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      text: ['', [Validators.maxLength(80), Validators.required]],
      category: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    
    /* this.form.valueChanges
    .pipe(
      debounceTime(350)
    )
    .subscribe(value => {
      console.log(value);
    }); */
  }

  guardar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get nameFieldIsValid() {
    return this.nameField?.touched && this.nameField?.valid;
  }

  get nameFieldIsInvalid() {
    return this.nameField?.touched && this.nameField?.invalid;
  }
  /* validaitor for email */
  get emailField() {
    return this.form.get('email');
  }

  get emailFieldIsValid() {
    return this.emailField?.touched && this.emailField?.valid;
  }

  get emailFieldIsInvalid() {
    return this.emailField?.touched && this.emailField?.invalid;
  }

}
