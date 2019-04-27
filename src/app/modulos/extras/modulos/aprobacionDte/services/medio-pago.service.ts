import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MedioPagoService {
  apiUrl: string;
  metodo: string;
  ordenes: any;

  constructor(public http: HttpClient) {
    this.metodo = '';
    this.apiUrl = 'www.google.cl';
  }

  obtenerOrdenes() {
    console.log('en servicio obtener ordenes');
    this.metodo = '/getOrdenes';
    // return this.http.get(this.apiUrl + this.metodo).pipe(map(res => res));
    return this.ordenes = [
      { orden: 1234 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
       fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 3243 , nombreComprador: 'Juan Lizana', fechaCompra: '12/12/1986',
       fechaEntrega: '15/12/1985', estadoOC: 'Fin Flujo', tipoDocumento: 'Factura', tipoOC: 'Estandar', seleccionado: false },
      { orden: 1233 , nombreComprador: 'Pablo Lizana', fechaCompra: '12/12/1987',
       fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 6543 , nombreComprador: 'Manuel Lizana', fechaCompra: '12/12/1988',
       fechaEntrega: '15/12/1985', estadoOC: 'Fin Flujo', tipoDocumento: 'Factura', tipoOC: 'Estandar', seleccionado: false },
    ];
  }

  obtenerOrden(numeroOC: string, tipoDocumento ) {
    return this.ordenes = [
      { orden: 1234 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
      fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 1111 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
      fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 2222 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
      fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 3333 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
      fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false },
      { orden: 4444 , nombreComprador: 'Esteban Lizana', fechaCompra: '12/12/1985',
      fechaEntrega: '15/12/1985', estadoOC: 'Recepcion', tipoDocumento: 'Boleta', tipoOC: 'Programado', seleccionado: false }
    ];
    // this.metodo = '/getOrden';
    // return this.http.post(this.metodo, {
    //   'numeroOC': numeroOC,
    //   'tipoDocumento': tipoDocumento
    // }, ).pipe(map(res => res));
  }

  aprobarMedioPago(ordenes: any[]) {
    console.log('en servicio aprobar medio pago');
    console.log(ordenes);
    this.metodo = '/aprobarMedioPago';
    return this.http.post(this.apiUrl + this.metodo, {
      'ordenes': ordenes
    }, ).pipe(map(res => res));
  }

  reprobarMedioPago(ordenes: any[]) {
    console.log('en servicio reprobar medio pago');
    console.log(ordenes);
    this.metodo = '/reprobarMedioPago';
    return this.http.post(this.apiUrl + this.metodo, {
      'ordenes': ordenes
    }, ).pipe(map(res => res));
  }

}
