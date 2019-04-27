import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { EndpointServiceRest } from './constant.service.util';


@Injectable()
export class UtilGDEService {
    private metodo: string;
    public url_api: string;
    ret: any;

    constructor(public http: HttpClient) {
        this.url_api = environment.url_api;
    }

    // Metodo con el cual retorno las guias de despacho a partir de un Rut de cliente
    public getCountryUser () {
        this.metodo = EndpointServiceRest.GET_PAIS_USUARIO;
        const idUser = sessionStorage.get('idUser');
        return this.http.get(this.url_api + this.metodo + idUser).pipe(map(res => res));
    }
}
