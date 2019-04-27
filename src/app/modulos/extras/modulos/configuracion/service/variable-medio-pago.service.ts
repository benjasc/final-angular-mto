import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VariableMedioPagoService {

  variables: any;
  metodo: string;
  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = '';
    this.metodo = '';
  }

  obtenerVariablesMedioPago() {
    return this.variables = [
      { idRegla: '1234', condicion: 'sd = Ripley clave maestra', activo: false, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'sd = Ripley clave maestra', activo: true, editar: true, valor: '12' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '21' },
      { idRegla: '1234', condicion: 'sd = Ripley clave maestra', activo: false, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: false, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'sd = Ripley clave maestra', activo: true, editar: true, valor: '76' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: false, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: false, editar: true, valor: '33' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '75' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: false, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '23' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '1' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '76' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '54' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '33' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '75' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '23' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '1' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '76' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '54' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '33' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '75' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '6' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '23' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '1' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '20' },
      { idRegla: '1234', condicion: 'MP = Ripley clave maestra', activo: true, editar: true, valor: '' }
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

  cambioValorVariableValidacion(idRegla: string, valor: string) {
    console.log('en servicio obtener acreedor sap');
    this.metodo = '/cambioEstadovariableValidacion';
    return this.http.post(this.apiUrl + this.metodo, {
      'idRegla': idRegla,
      'valor': valor
    }).pipe(map(res => res));
  }
}


