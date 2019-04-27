import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SapService {

  metodo: string;
  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = '';
    this.metodo = '';
  }

  crearAcreedorSap(rut: string, nombre: string, distrito: string, region: string, mail: string, telefono: string,
    telefax: string, telex: string, titularCuenta: string, banco: string, cuentaBancaria: string) {
    console.log('en servicio crear acreedor sap');
    this.metodo = '/aprobarMedioPago';

    return this.http.post(this.apiUrl + this.metodo, {
      'rut': rut,
      'nombre': nombre,
      'distrito': distrito,
      'region': region,
      'mail': mail,
      'telefono': telefono,
      'telefax': telefax,
      'telex': telex,
      'titularCuenta': titularCuenta,
      'banco': banco,
      'cuentaBancaria': cuentaBancaria
    }).pipe(map(res => res));
  }

  obtenerAcreedorSap(numeroOc: string) {
    console.log('en servicio obtener acreedor sap');
    this.metodo = '/obtenerAcreedorSap';
    return this.http.post(this.apiUrl + this.metodo, {
      'numeroOC': numeroOc
    }).pipe(map(res => res));
  }
}










