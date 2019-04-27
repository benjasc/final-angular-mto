import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class GuiasRetiroService {
    private metodo: string;
    public url_api: string;
    ret: any;

    constructor(public http: HttpClient) {
        this.url_api = environment.url_api;
    }

    // Metodo con el cual retorno las guias de despacho a partir de un Rut de cliente
    public getGuiasRetiro (inputOCRUTDNI: String) {
        this.metodo = '/getGuiasDespacho';
        return this.http.get(this.url_api + this.metodo).pipe(map(res => res));
    }
}
