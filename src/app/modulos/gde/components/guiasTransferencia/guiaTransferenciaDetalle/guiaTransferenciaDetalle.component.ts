
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer,Inject } from '@angular/core';
import { Globals } from '../../../../shared/utils/globals';
import { Router } from '@angular/router';

import { EmisionUnitariaGdeService } from '../../../services/emisionUnitariaGde.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../../util/tableConfig.util';
import { DialogService } from 'ng2-bootstrap-modal';
import { EmisionMasivoGDEModel } from '../../../vo/emisionMasivoGde.model';
import { DummyServices } from '../../../util/util.model';
import { MedioTransporteModel } from '../../../vo/medioTransporte.model';
import { DetalleGuiasMasivosModel } from '../../../vo/detalleGuiasMasivas.model';
import { TransportCompanyModel } from '../../../vo/empresaTransportista.model';
import { ConductorModel } from '../../../vo/conductor.model';
import { GuiaTransferenciaDetalleModel } from '../../../vo/guiaTransferenciaDetalle.model';
import { RouterConstanst } from '../../../util/constant.util';



const EXPRESSION_REGULAR_OC = /^[0-9]{1,20}([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?$/;


@Component({
  selector: ' app-guiatransferenciadetalle',
  templateUrl: './guiaTransferenciaDetalle.component.html'
})
export class GuiaTransferenciaDetalleComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();


  ret: any;
  selectedEmpresaTransportista: String;
  selectedConductor: String;
  selectedPatente: String;

  objManifiest: EmisionMasivoGDEModel;

  arrayTransportCompany: Array<TransportCompanyModel>;
  arrayConductores: Array<ConductorModel>;
  arrayCamion: Array<MedioTransporteModel>;
  arrayGuiaTransferenciaDetalle: Array<GuiaTransferenciaDetalleModel>;

  constructor(public globals: Globals,
    public router: Router,
    public emisionUnitariaGDEService: EmisionUnitariaGdeService,
    public configTable: TableConfigEmisionGDE,
    public dialogService: DialogService) {

      this.arrayGuiaTransferenciaDetalle = new Array();
  }

  ngOnInit() {

    this.dtOptions = this.configTable.dtOptionsWithinScrollX;
    this.loadCamiones();
    this.loadCompanyTransport();
    this.loadConductores();


  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.loadDetalleGuiaTransferencia();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  loadCompanyTransport() {
    // this.infoTransportCompany.getEmpresasTransportistas().subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayTransportCompany = this.ret.empresasTransportistas;
    // });
   // this.arrayTransportCompany = DummyServices.arrayEmpresaTransportista;
  }

  loadConductores() {
    // this.infoTransportCompany.getConductores(this.selectedEmpresaTransportista).subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayConductores = this.ret.empresasTransportistas;
    // });
    //this.arrayConductores = DummyServices.arrayConductor;

  }

  loadCamiones() {
    // this.infoTransportCompany.getPatentes(this.selectedEmpresaTransportista).subscribe((res: any) => this.ret = res,
    // error => () => {},
    // () => {
    //     this.arrayCamion = this.ret.empresasTransportistas;
    // });
    //this.arrayCamion = DummyServices.arrayCamiones;

  }

  loadDetalleGuiaTransferencia() {
    // Debo buscar el detalle de este manifiesto
    // this.objManifiest.manifiesto;


    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   // Se destruye la tabla anterior para ser reemplazada con los nuevos datos
      dtInstance.destroy();
      //   // LLamada a dtTrigger para renderizar datos
      this.dtTrigger.next();
    });

    this.arrayGuiaTransferenciaDetalle = DummyServices.arrayDetalleGuiaTransferencia;
    this.dtTrigger.next();
  }

  guardarCargaTransferencia() {
    console.log('Guardo Configuracion');
  }

  volver() {
    console.log('Imprimo boton');
    this.router.navigate([RouterConstanst.ROUTE_GUIATRANSFERENCIA_INIT]);
  }
}

