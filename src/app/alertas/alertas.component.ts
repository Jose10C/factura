import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit{

  formventa!: FormGroup;
  constructor (
    private FormBuilder: FormBuilder
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  private buildForm() {
    this.formventa = this.FormBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(11)]],
      razonsocial: ['',[Validators.required, Validators.minLength(5)]],
      direccion: [''],
      items: this.FormBuilder.array([])
    });
  }

  guardar(event: Event) {
    event.preventDefault();
    if (this.formventa.valid) {
      const value = this.formventa.value;
      console.log(value);
    } else {
      this.formventa.markAllAsTouched();
    }
  }

  agregaritems() {
    const itemsForm = this.FormBuilder.group({
      cantidad: '',
      descripcion: '',
      punitario: '',
      stotal: '',
    });
    this.itemsField.push(itemsForm);
  }

  removeritem(indice: number){
    this.itemsField.removeAt(indice);
  }

  limpiar() {
    this.formventa.patchValue({
      ruc: '',
      razonsocial: '',
      direccion: '',
    });
    this.itemsField.controls.splice(0, this.itemsField.length);
  }

  /* validaitor for ruc */
  get rucField() {
    return this.formventa.get('ruc');
  }
  get rucFieldIsValid() {
    return this.rucField?.touched && this.rucField?.valid;
  }
  get rucFieldIsInvalid() {
    return this.rucField?.touched && this.rucField?.invalid;
  }

  /* validaitor for razonsocial */
  get razonsocialField() {
    return this.formventa.get('razonsocial');
  }
  get razonsocialFieldIsValid() {
    return this.razonsocialField?.touched && this.razonsocialField?.valid;
  }
  get razonsocialFieldIsInvalid() {
    return this.razonsocialField?.touched && this.razonsocialField?.invalid;
  }

  get itemsField() {
    return this.formventa.get('items') as FormArray;
  }

}
