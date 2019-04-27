import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfCajaService {

  metodo: string;
  apiUrl: string;
  sucursales: any;

  constructor(public http: HttpClient) {
    this.apiUrl = '';
    this.metodo = '';
  }

  obtenerConfiguracionesCaja() {
   return this.sucursales = [
      {nombre: '1',
       cajas: [
        {nombre: '1', horarioCierreFinal: '23:00', horarioCierreParcial: [ '11:00', '12:00', '13:00', '14:00']},
        {nombre: '2', horarioCierreFinal: '21:00', horarioCierreParcial: [ '12:00', '13:00', '14:00', '15:00']},
        {nombre: '3', horarioCierreFinal: '22:00', horarioCierreParcial: [ '13:00', '14:00']},
        {nombre: '4', horarioCierreFinal: '20:00', horarioCierreParcial: [ '14:00', '15:00']},
      ] },
      {nombre: '2',
       cajas: [
        {nombre: '10', horarioCierreFinal: '23:00', horarioCierreParcial: [ '11:00', '12:00']},
        {nombre: '11', horarioCierreFinal: '21:00', horarioCierreParcial: [ '12:00', '13:00']},
        {nombre: '12', horarioCierreFinal: '22:00', horarioCierreParcial: [ '13:00', '14:00']},
        {nombre: '13', horarioCierreFinal: '20:00', horarioCierreParcial: [ '14:00', '15:00']},
      ] },
      {nombre: '3',
       cajas: [
        {nombre: '20', horarioCierreFinal: '23:00', horarioCierreParcial: [ '11:00', '12:00']},
        {nombre: '31', horarioCierreFinal: '21:00', horarioCierreParcial: [ '12:00', '13:00']},
        {nombre: '42', horarioCierreFinal: '22:00', horarioCierreParcial: [ '13:00', '14:00']},
        {nombre: '53', horarioCierreFinal: '20:00', horarioCierreParcial: [ '14:00', '15:00']},
      ] },
      {nombre: '4',
       cajas: [
        {nombre: '60', horarioCierreFinal: '23:00', horarioCierreParcial: [ '11:00', '12:00']},
        {nombre: '61', horarioCierreFinal: '21:00', horarioCierreParcial: [ '12:00', '13:00']},
        {nombre: '62', horarioCierreFinal: '22:00', horarioCierreParcial: [ '13:00', '14:00']},
        {nombre: '63', horarioCierreFinal: '20:00', horarioCierreParcial: [ '14:00', '15:00']},
      ] }
    ];
  }

  // obtenerConfiguracionesCaja() {
  //     console.log('en servicio obtener configuracion Caja');
  //     this.metodo = '/obtenerConfiguracionCaja';
  //     return this.http.get(this.apiUrl + this.metodo, {
  //     }).pipe(map(res => res));
  // }

  enviarConfiguracionCaja(sucursal: string, caja: string, cierreParcial: string[], cierreFinal: string) {
      console.log('en servicio enviar configuracion caja');
      this.metodo = '/enviarConfiguracionCaja';
      return this.http.post(this.apiUrl + this.metodo, {
        'sucursal': sucursal,
        'caja': caja,
        'cierreParcial': cierreParcial,
        'cierreFinal': cierreFinal
      }).pipe(map(res => res));
  }
}
