import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { EndpointServiceRest } from '../services/constant.service.util';
import { OrderBuyModel } from '../vo/ordenBuy.model';
import { headersToString } from 'selenium-webdriver/http';
@Injectable()
export class EmisionUnitariaGdeService {
    private metodo: string;
    public url_bt: string;
    public url_api: string;
    ret: any;

    constructor(public http: HttpClient) {
        this.url_bt = environment.url_bt;
        this.url_api = environment.url;
    }

    // Metodo con el cual retorno las guias de despacho a partir de un Rut de cliente
    public getGuiasDespacho (inputOCRut: String) {
        this.metodo = EndpointServiceRest.GET_DISPATCHGUIDE;

        // return this.http.get(this.url_api + this.metodo + '/' + inputOCRut).pipe(map(res => res));
        return this.http.get(this.url_bt + this.metodo).pipe(map(res => res));
    }

    // Metodo con el cual envio a imprimir una guia de despacho unitaria
    public printDispathGuide(arrayOrder: Array<OrderBuyModel>) {
      console.log(JSON.stringify(arrayOrder));
      this.metodo = EndpointServiceRest.PRINTER_DISPATCHGUIDE;
      return this.http.post(this.url_api + this.metodo + '/' + sessionStorage.getItem('countryUser'), arrayOrder);
    }
}
