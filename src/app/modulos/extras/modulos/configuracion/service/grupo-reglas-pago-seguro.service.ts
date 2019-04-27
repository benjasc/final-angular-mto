import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GrupoReglasPagoSeguroService {
  reglas: any;
  metodo: string;
  apiUrl: string;

  constructor( private http: HttpClient) {
    this.metodo = '';
    this.apiUrl = '';
  }

  obtenerGrupos() {
    return this.reglas = [
      { idGrupo: '1234' , descripcion: 'ddfd = Ripley clave maestra', activo: false},
      { idGrupo: '121' , descripcion: 'dd = Ripley clave maestra', activo: true},
      { idGrupo: '23' , descripcion: 'tr = Ripley clave maestra', activo: false},
      { idGrupo: '543' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '123' , descripcion: 'sd = Ripley clave maestra', activo: true},
      { idGrupo: '555' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: true},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: true},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: true},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
      { idGrupo: '1234' , descripcion: 'sd = Ripley clave maestra', activo: false},
    ];
  }

  cambioEstadoVariableValidacion(idRegla: string, activo: boolean) {
    console.log('en servicio obtener acreedor sap');
    this.metodo = '/cambioEstadovariableValidacion';
    return this.http.post(this.apiUrl + this.metodo, {
      'idRegla': idRegla,
      'activo': activo
    }).pipe(map(res => res));
  }

}
