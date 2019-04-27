import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ReglasDteAutomaticaService {

  metodo: string;
  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = '';
    this.metodo = '';
  }

  editarFactor(factor: string) {
    console.log('en servicio editar factor reglas dte automatica');
    this.metodo = '/editarFactor';

    return this.http.post(this.apiUrl + this.metodo, {
      'factor': factor
    }).pipe(map(res => res));
  }

  obtenerFactor() {
    console.log('en servicio obtener factor reglas dte automatica');
    this.metodo = '/obtenerFactor';
    return this.http.get(this.apiUrl + this.metodo).pipe(map(res => res));
  }
}




