import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { TransportCompanyModel } from '../vo/empresaTransportista.model';
import { ConductorModel } from '../vo/conductor.model';
import { MedioTransporteModel } from '../vo/medioTransporte.model';
import { EndpointServiceRest } from './constant.service.util';

@Injectable()
export class InfoTransportCompanyService {
    private metodo: string;
    public url_api: string;
    ret: any;
    arrayTransporte: Array<TransportCompanyModel>;
    arrayConductores: Array<ConductorModel>;
    arrayCamiones: Array<MedioTransporteModel>;


    constructor(public http: HttpClient) {
        this.url_api = environment.url;
    }

    // Metodo con el cual se recuperan todas las empresas transportistas desde
    public getTransportCompany () {
        this.metodo = EndpointServiceRest.GET_TRANSPORTSCOMPANYS;
        return this.http.get(this.url_api + this.metodo + '/' + sessionStorage.getItem('countryUser')).pipe(map(res => res));
    }

    // Metodo con el cual se recuperan los conductores a partir de una empresa especifica
    public getDriverByCompany(idTransportCompany: Number) {
       this.metodo = EndpointServiceRest.GET_DRIVERBYCOMPANY;
    // tslint:disable-next-line: max-line-length
       return this.http.get(this.url_api +  this.metodo + '/' + idTransportCompany + '/' + sessionStorage.getItem('countryUser')).pipe(map(res => res));
    }

    // Metodo con el cual se recuperan las patentes a partir de una empresa especifica
    public getTransportByCompany(idTransportCompany: Number) {
      this.metodo = EndpointServiceRest.GET_TRANSPORTBYCOMPANY;
    // tslint:disable-next-line: max-line-length
      return this.http.get(this.url_api + this.metodo + '/' +  idTransportCompany + '/' + sessionStorage.getItem('countryUser')).pipe(map(res => res));
    }





}
