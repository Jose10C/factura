import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ProductosComponent } from './ventas/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertasComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
