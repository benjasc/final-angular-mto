import { TransportCompanyModel } from '../vo/empresaTransportista.model';
import { ConductorModel } from '../vo/conductor.model';
import { MedioTransporteModel } from '../vo/medioTransporte.model';
import { DummyServices } from '../util/util.model';
import { Injectable } from '@angular/core';
import { InfoTransportCompanyService } from './cargaDatosTransporte.service';

@Injectable()
export class DataTransportDistpacthService  {
  ret: any;
  arrayTransportCompany: Array<TransportCompanyModel>;
  arrayConductores: Array<ConductorModel>;
  arrayCamion: Array<MedioTransporteModel>;

  constructor(public infoTransportCompany: InfoTransportCompanyService) {

  }

  loadCompanyTransport(): any {
    this.infoTransportCompany.getTransportCompany().subscribe((res: any) => this.ret = res,
    error => () => {
      console.log(error);
      console.log(this.ret);
    },
    () => {
        this.arrayTransportCompany = this.ret.transportCompany;
        return this.arrayTransportCompany;
    });

  }

  loadConductores(idTransportCompany: Number) {
    this.infoTransportCompany.getDriverByCompany(idTransportCompany).subscribe((res: any) => this.ret = res,
    error => () => {},
    () => {
        this.arrayConductores = this.ret.empresasTransportistas;
    });
    return this.arrayConductores;

  }

  loadCamiones(idTransportCompany: Number) {
    this.infoTransportCompany.getTransportByCompany(idTransportCompany).subscribe((res: any) => this.ret = res,
    error => () => {},
    () => {
        this.arrayCamion = this.ret.empresasTransportistas;
    });
    return this.arrayCamion;

  }
}
