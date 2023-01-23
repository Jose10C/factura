import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppComponent } from './app.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ProductosComponent } from './ventas/productos/productos.component';
import { HomeComponent } from './ventas/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertasComponent,
    ProductosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
