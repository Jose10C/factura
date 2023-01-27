import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formventa!: FormGroup;

  public campobuscar = "descripcion";
  vsubt = 0.0;
  vigv = 0.0;
  vtotal = 0.0;

  images = 'assets/img/help.png';
  mostrar = true;
  constructor(
    private FormBuilder: FormBuilder
  ) {
    this.buildForm();
  }

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

  ngOnInit(): void {
  }

  private buildForm() {
    this.formventa = this.FormBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(11)]],
      razonsocial: ['', [Validators.required, Validators.minLength(5)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      items: this.FormBuilder.array([])
    });
  }

  get itemsField() {
    return this.formventa.get('items') as FormArray;
  }

  agregaritems(indice: number) {
    for (let valores of this.productos) {
      if (valores.id == indice) {
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
  }

  removeritem(indice: number) {
    Swal.fire({
      title: 'Confirmación',
      text: "¿Está seguro que quiere Borrar?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemsField.removeAt(indice);
        this.total_pagar();
        Swal.fire(
          'Borrado',
          'Se ha borrado el registro',
          'success'
        )
      }
    })
    this.mostratAyuda();
  }
  valores = [{ id: [], valor: [] }];
  actualizarprecios(indice: number) {
    for (let index = 0; index < this.itemsField.length; index++) {
      let cant = this.itemsField.value[index]['cantidad'];
      let pu = this.itemsField.value[index]['punitario'];
      let subtotal = cant * pu;

      this.itemsField.value[index]['stotal'] = subtotal;

      console.log('Cantidad:' + cant + ' PU:' + pu + ' Total:' + subtotal);
    }
    this.total_pagar();
  }

  total_pagar() {
    let total_pagar = 0;
    for (let index = 0; index < this.itemsField.length; index++) {
      total_pagar = total_pagar + this.itemsField.value[index]['stotal'];
    }
    this.vsubt = (total_pagar - (total_pagar * 0.18));
    this.vigv = parseFloat((total_pagar * 0.18).toFixed(2));
    this.vtotal = total_pagar;
    console.log('Total s/.' + total_pagar);
  }

  guardar(event: Event) {
    event.preventDefault();
    if (this.formventa.valid) {
      Swal.fire({
        title: 'Confirmación',
        text: "Está seguro de Guardar",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          /* aqui la confirmacion */
          const value = this.formventa.value;
          /* console.log(value);
          alert('La venta fue realizado correctamente'); */
          this.formventa.reset();
          this.vsubt = 0.0;
          this.vigv = 0.0;
          this.vtotal = 0.0;
          this.itemsField.clear();
          Swal.fire(
            'Guardado',
            'Venta Guardado Correctamente',
            'success'
          )
        }
      })
    } else {
      this.formventa.markAllAsTouched();
    }
  }

  /* validaitor for ruc */
  get rucField() {
    return this.formventa.get('ruc');
  }
  get rucFieldIsInvalid() {
    return this.rucField?.touched && this.rucField?.invalid;
  }

  /* validaitor for razonsocial */
  get razonsocialField() {
    return this.formventa.get('razonsocial');
  }
  get razonsocialFieldIsInvalid() {
    return this.razonsocialField?.touched && this.razonsocialField?.invalid;
  }

  /* validaitor for direccion */
  get direccionField() {
    return this.formventa.get('direccion');
  }
  get direccionFieldIsInvalid() {
    return this.direccionField?.touched && this.direccionField?.invalid;
  }
  /* get pintarBoton() {
    return this.
  } */
  labelRuc = 'R.U.C';
  labelcuadro = 'FACTURA';
  labelfactura = 'is-dark';
  labelboleta = 'is-dark is-outlined';
  t_max_length = 11;
  /* cambiar emision */
  cambiarEmision(valor: number) {

    let getruc = this.formventa.get("ruc");
    if (valor == 1) {
      /* factura */
      getruc?.clearValidators();
      getruc?.addValidators([Validators.required, Validators.minLength(11)]);
      this.t_max_length = 11;
      this.labelRuc = 'R.U.C.';
      this.labelcuadro = 'FACTURA';
      this.labelfactura = 'is-dark';
      this.labelboleta = 'is-dark is-outlined';
    }
    if (valor == 2) {
      /* boleta */
      getruc?.clearValidators();
      getruc?.addValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.t_max_length = 8;
      this.labelRuc = 'D.N.I.';
      this.labelcuadro = 'BOLETA';
      this.labelfactura = 'is-dark is-outlined';
      this.labelboleta = 'is-dark';
    }
    getruc?.markAsDirty();
    getruc?.updateValueAndValidity();

  }



  /* extras */
  mostratAyuda() {
    this.mostrar = true;
    this.images = 'assets/img/help.png';
  }
  mostrarRUC() {
    this.mostrar = false;
    this.images = 'assets/img/ruc-02.gif';
  }
  mostrarRazon() {
    this.mostrar = false;
    this.images = 'assets/img/seniores-01.gif';
  }
  mostrarBuscador() {
    this.mostrar = false;
    this.images = 'assets/img/buscar-03.gif';
  }
  mostrarVenta() {
    this.mostrar = false;
    this.images = 'assets/img/confirmar-04.gif';
  }
  mostrarBorrar() {
    this.mostrar = false;
    this.images = 'assets/img/borrar-05.gif';
  }
  mostrarDni() {
    this.mostrar = false;
    this.images = 'assets/img/borrar-05.gif';
  }
}
