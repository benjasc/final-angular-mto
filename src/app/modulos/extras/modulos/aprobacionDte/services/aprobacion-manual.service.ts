import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class AprobacionManualService {
  metodo: string;
  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = '';
    this.metodo = '';
  }

  enviarArchivoListadoSku(file: any) {
    this.metodo = '/listadoSkuMasivo';
    return this.http.post(this.apiUrl + this.metodo, {
      'file': file
    }).pipe(map(res => res));
  }

  obtenerDescripcionPorSku(sku: string) {
    this.metodo = '/obtenerDescripcionPorSku';
    return this.http.post(this.apiUrl + this.metodo, {
      'sku': sku
    }).pipe(map(res => res));
  }

  eliminarSku(sku: string) {
    this.metodo = '/eliminarSku';
    return this.http.post(this.apiUrl + this.metodo, {
      'sku': sku
    }).pipe(map(res => res));
  }
}

