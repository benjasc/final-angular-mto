import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { TransportCompanyModel } from '../vo/empresaTransportista.model';
import { ConductorModel } from '../vo/conductor.model';
import { MedioTransporteModel } from '../vo/medioTransporte.model';
import { EndpointServiceRestMassiveDispatch } from './constant.service.util';

@Injectable()
export class EmisionMasivaGdeService {
    public metodo: string;
    public url_api: string;
    public url_bt: string;
    ret: any;
    arrayTransporte: Array<TransportCompanyModel>;
    arrayConductores: Array<ConductorModel>;
    arrayCamiones: Array<MedioTransporteModel>;


    constructor(public http: HttpClient) {
        this.url_api = environment.url;
        this.url_bt = environment.url_bt;
    }

    // Metodo con el cual se recuperan todas las empresas transportistas desde
    public getBeanchOfficeByCountry () {
        this.metodo =  EndpointServiceRestMassiveDispatch.GET_BRANCHOFFICEBYCOUNTRY;
        return this.http.get(this.url_api + this.metodo + '/' + sessionStorage.getItem('countryUser')).pipe(map(res => res));
    }

    public getManifiestos(manifiesto: String) {
        this.metodo = EndpointServiceRestMassiveDispatch.GET_MANIFESTBYSUCURSAL;
        return this.http.get(this.url_bt + this.metodo).pipe(map(res => res));
    }
}
