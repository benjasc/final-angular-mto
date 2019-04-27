import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { CommonService } from '../../shared/services/common.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Customer } from '../model/customer';


@Injectable()
export class OcService {

  url_api_rut:string = '/customer'
  private url_api: string;
  constructor(private http: HttpClient,) { 
    this.url_api = environment.url;

  }


  searchByRut(rut:string){

    const FULL_URL = this.url_api  + `/vista360/rut/${rut}`;
    return this.http.get<Customer>(FULL_URL).pipe(map((res:any) => res.data.customer));
  }
  searchByEmail(email:string){

    const FULL_URL = this.url_api+`/vista360/email/${email}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.customer));
  }
  searchByOc(oc:string){
 
    const FULL_URL = this.url_api+`/vista360/oc/${oc}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.customer));
  }
  searchByCud(cud:string){
 
    const FULL_URL = this.url_api+`/vista360/cud/${cud}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.customer));
  }
  searchByDte(dte:string){
 
    const FULL_URL = this.url_api+`/vista360/dte/${dte}`;
    return this.http.get<Customer>(FULL_URL).pipe(map((res:any) => res.data.customer));
  }

  getDetalleCompra(oc:string){
    const FULL_URL = this.url_api+`/vista360/detalle/oc/${oc}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.order));//era order y cambio a order
  }

  showDetails(cud:number){
    const FULL_URL = this.url_api+`/vista360/historial/cud/${cud}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.historial));
  }

  filterByDate(from:string, to:string , filter:string ,type:string){
    if(type === 'RUT/DNI'){
      const FULL_URL = this.url_api+`/vista360/filtro?fechaIni=${from}&fechaFin=${to}&rut=${filter}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.customer));
    }else if(type === 'Email'){
        const FULL_URL = this.url_api+`/vista360/filtro?fechaIni=${from}&fechaFin=${to}&email=${filter}`;
    return this.http.get(FULL_URL).pipe(map((res:any) => res.data.customer));
    }
  }

}
