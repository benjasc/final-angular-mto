import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { ModificarPersonaPedidoModel } from '../../../modulos/sgo/model/modificarPersonaPedidoModel.model';




@Injectable()
export class ModificarPersonaPedidoService {
   
    url_api_usuarios:string = '/usuarios'
    private url_api: string;

  constructor(private http: Http) {
      this.url_api = environment.url_api;
  }

  getPersonas(){
    const FULL_URL = this.url_api + this.url_api_usuarios;
     return this.http.get(FULL_URL).pipe(map(res => res));
  }

  savePersona(objpersona:ModificarPersonaPedidoModel){
    console.log(JSON.stringify(objpersona));
    const FULL_URL = this.url_api + this.url_api_usuarios+"/767";
    this.http.put(FULL_URL,objpersona).subscribe(data  => {
      console.log("POST", data);
    },
    error  => {
      console.log("Error", error);
    });
  }

  updatePersona(objpersona:ModificarPersonaPedidoModel){
    console.log(JSON.stringify(objpersona));
    const FULL_URL = this.url_api + this.url_api_usuarios;
    this.http.post(FULL_URL,objpersona).subscribe(data  => {
      console.log("POST", data);
    },
    error  => {
      console.log("Error", error);
    });
  }

  deletePersona(objpersona:ModificarPersonaPedidoModel){
    console.log(JSON.stringify(objpersona));
    const FULL_URL = this.url_api + this.url_api_usuarios;
    this.http.post(FULL_URL,objpersona).subscribe(data  => {
      console.log("POST", data);
    },
    error  => {
      console.log("Error", error);
    });
  }
}
 

