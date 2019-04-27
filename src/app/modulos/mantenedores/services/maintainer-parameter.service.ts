import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable()
export class MaintainerParameterService {
  metodo: string;
  urlApi: string;
  constructor(public http: HttpClient) {
    this.urlApi = environment.url_api;
   }

  obtenerProperties(idTienda: number, idFather: number) {
    this.metodo = '/getProperties';
    return this.http.post(this.urlApi + this.metodo, {
      'idTienda': idTienda,
      'idFather': idFather
    }).pipe(map(res => res));
  }
  modificarProperties(idCategoria: number, idProperty: number, valorAnterior: string,
    valorNuevo: string, cadena: number, idUsuario: number, descripcion: string) {
    this.metodo = '/modificaProperty';
    return this.http.post(this.urlApi + this.metodo, {
      'idCategoria': idCategoria,
      'idProperty': idProperty,
      'valorAnterior': valorAnterior,
      'valorNuevo': valorNuevo,
      'cadena': cadena,
      'idUsuario': idUsuario,
      'descripcion': descripcion
    }).pipe(map(res => res));
  }
}
