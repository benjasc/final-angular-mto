import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
//import { InfoTransportCompanyService } from '../cargaDatosTransporte.service';
import { TransportCompanyModel } from '../../../vo/empresaTransportista.model';
import { ConductorModel } from '../../../vo/conductor.model';
import { MedioTransporteModel } from '../../../vo/medioTransporte.model';
import { DummyServices } from '../../../util/util.model';

export interface ConfirmModel {
  title: String;
  message: String;
}
@Component({
    selector: 'app-mantenedortransportistamodal',
    templateUrl: './mantenedorTransportistaModal.component.html'
})

export class ModalConfigTransporteComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;

  ret: any;
  selectedEmpresaTransportista: String;
  selectedConductor: String;
  selectedPatente: String;

  arrayTransportCompany: Array<TransportCompanyModel>;
  arrayConductores: Array<ConductorModel>;
  arrayCamion: Array<MedioTransporteModel>;


    constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.arrayTransportCompany = [];
    this.arrayCamion = [];
    this.arrayConductores = [];
    this.loadCamiones();
    this.loadConductores();
    this.loadCompanyTransport();
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }

  closeModal() {
    this.close();
  }

  loadCompanyTransport() {
    // this.infoTransportCompany.getEmpresasTransportistas().subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayTransportCompany = this.ret.empresasTransportistas;
    // });
    //this.arrayTransportCompany = DummyServices.arrayEmpresaTransportista;
  }

  loadConductores() {
    // this.infoTransportCompany.getConductores(this.selectedEmpresaTransportista).subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayConductores = this.ret.empresasTransportistas;
    // });
   // this.arrayConductores = DummyServices.arrayConductor;

  }

  loadCamiones() {
    // this.infoTransportCompany.getPatentes(this.selectedEmpresaTransportista).subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayCamion = this.ret.empresasTransportistas;
    // });
    //this.arrayCamion = DummyServices.arrayCamiones;

  }
}
