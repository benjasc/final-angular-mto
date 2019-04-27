import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BackordersService {

    public url_canalVenta:string = '/canalVentas';
    public url_canalDespacho:string = '/canalDespacho';
    public url_modeloDespacho:string = '/modeloDespacho';
    public url_motivoBackorder:string = '/motivoBackorder';
    public url_backorder:string = '/backorder';
    //faltan agregar las fechas -> Desde - > Hasta

   public url_api : string ;
    constructor(private http : Http){
        console.log("api funcionando!!", this.url_api = environment.url_api);
        
         this.url_api = environment.url_api;

    }

    // obtiene todos los canales de ventas existentes
    getCanalVentas(){
        const FULL_URL = `${this.url_api}${this.url_canalVenta}`;
        return this.http.get(FULL_URL).pipe(map(res=>res));
    }
    // obtiene todos los canales de despacho disponibles
    getCanalDespachos(){
        const FULL_URL = `${this.url_api}${this.url_canalDespacho}`;
        return this.http.get(FULL_URL).pipe(map(res=>res));
    }
   // obtiene todos los modelos de despacho disponibles
    getModeloDespachos(){
        const FULL_URL = `${this.url_api}${this.url_modeloDespacho}`;
        return this.http.get(FULL_URL).pipe(map(res=>res));
    }
   // obtiene todos los motivos por el que pueda tener una backorder
    getMotivosBackorder(){
        const FULL_URL = `${this.url_api}${this.url_motivoBackorder}`;
        return this.http.get(FULL_URL).pipe(map(res=>res));
    }
    //obtiene una o mas backorders segun los filtros dados por el usuario
    getBackorder(idCanalVentas:string, idcanalDespacho:string, idModeloDespacho:string, idMotivoBackorder:string ){        
        const FULL_URL = `${this.url_api}${this.url_backorder}`;
        return this.http.get(`${FULL_URL}?canalVentasid=${idCanalVentas}&canalDespachoid=${idcanalDespacho}&modeloDespachoid=${idModeloDespacho}&motivoBackorderid=${idMotivoBackorder}`).pipe(map(res=>res));
    }


} 