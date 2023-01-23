import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit{

  formventa!: FormGroup;

  public campobuscar = "descripcion";

  @ViewChild('ftotal') titles!: ElementRef;

  productos = [
    {
      id: 1,
      stock: 10,
      descripcion: 'Antivirus ESET NOT32 (1 año)',
      punitario: 80,
    },
    {
      id: 2,
      stock: 5,
      descripcion: 'Office 2020 Basico Word,Excel,Power Point (2 años)',
      punitario: 50,
    },
    {
      id: 3,
      stock: 10,
      descripcion: 'Filmora Wondershare 2022 Premium licencia de por vida',
      punitario: 250,
    },
    {
      id: 4,
      stock: 6,
      descripcion: 'Touch VPN proxy VPN (precio mensual)',
      punitario: 15,
    },
    {
      id: 5,
      stock: 5,
      descripcion: 'Windows 10 Professional x64 1Pc',
      punitario: 60,
    }
  ];
  persona = [
    {
      dni: '12345678',
      nombres: 'Carlos Andrés',
      apellidos: 'Diaz Ojeda',
      direccion: 'Av Garsilaso de la Vega s/n'
    },
    {
      dni: '87654321',
      nombres: 'Diana',
      apellidos: 'Jara Huamani',
      direccion: 'Av Peru s/n'
    },
    {
      dni: '11223344',
      nombres: 'Sandra Camila',
      apellidos: 'Sanchez Garcia',
      direccion: 'Ps Ugarte 0765'
    },
    {
      dni: '00224466',
      nombres: 'Paul Kevin',
      apellidos: 'Marquez Caceres',
      direccion: 'Av Venzuela 0320'
    },
    {
      dni: '11335599',
      nombres: 'Elian Tania',
      apellidos: 'Taboada Cespedes',
      direccion: 'Calle Paraiso Lt-8-323'
    },
  ];
  constructor (
    private FormBuilder: FormBuilder,
    private renderer: Renderer2
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    this.formventa = this.formventa;
  }

  cambiar(): void {
    const titl = this.titles.nativeElement;
    //this.renderer.setStyle(titl,'color','red');
    this.renderer.setValue(titl,'hola');
    console.log(titl);
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

  agregaritems(indice: number) {
    for (let valores of this.productos){
      if(valores.id == indice){
        console.log(valores);
        const itemsForm = this.FormBuilder.group({
          cantidad: ['1'],
          descripcion: [valores.descripcion],
          punitario: [valores.punitario],
          stotal: [valores.punitario],
        });
        this.itemsField.push(itemsForm);
      }
    }
    this.total_pagar();

    
    /* const itemsForm = this.FormBuilder.group({
      cantidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      punitario: ['', Validators.required],
      stotal: ['', Validators.required],
    });
    this.itemsField.push(itemsForm); */
  }

  total_pagar(){
    let total_pagar=0;
    for (let index = 0; index < this.itemsField.length; index++) {
      total_pagar = total_pagar + this.itemsField.value[index]['stotal'];
    }

    console.log('Total s/.'+total_pagar);
  }

  actualizarprecios(indice: number){
    for (let index = 0; index < this.itemsField.length; index++) {
      let cant = this.itemsField.value[index]['cantidad'];
      let pu = this.itemsField.value[index]['punitario'];
      let subtotal = cant*pu;
      this.itemsField.value[index]['stotal'] = subtotal;
      /* this.itemsField.value[0]['stotal'] = subtotal;
      const element = this.itemsField.value[0]['stotal'];
      console.log(element+'-'+indice); */

      console.log('Cantidad:'+cant+' PU:'+pu+' Total:'+subtotal);
    }
    this.total_pagar();
    //console.log(subtotal);
    //return subtotal;
  }

  removeritem(indice: number){
    this.itemsField.removeAt(indice);
    this.total_pagar();
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
