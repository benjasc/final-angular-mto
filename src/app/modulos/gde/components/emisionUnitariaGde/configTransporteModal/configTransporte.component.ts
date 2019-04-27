import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
// import { InfoTransportCompanyService } from '../cargaDatosTransporte.service';
import { TransportCompanyModel } from '../../../vo/empresaTransportista.model';
import { ConductorModel } from '../../../vo/conductor.model';
import { MedioTransporteModel } from '../../../vo/medioTransporte.model';
import { InfoTransportCompanyService } from '../../../services/cargaDatosTransporte.service';
import { DataTransportDistpacthService } from '../../../services/cargaDatosTransporte.common.service';
import { MessageService } from '../../../../shared/services/message.service';
import { MessageErrorConstant, StorageConstant } from '../../../util/constant.util';
import { TransporteModel } from '../../../vo/transporteDespacho.model';
import { OrderBuyModel } from '../../../vo/ordenBuy.model';

export interface ConfirmModel {
  title: String;
  message: String;
  arrayOrdenes: any;
}
@Component({
    selector: 'app-configtransporte',
    templateUrl: './configTransporte.component.html'
})

export class ModalConfigTransporteComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  arrayOrdenes: any;

  ret: any;
  selectedEmpresaTransportista: String = '0';
  selectedConductor: String = '0';
  selectedPatente:  String = '0';

  arrayTransportCompany: Array<TransportCompanyModel>;
  arrayConductores: Array<ConductorModel>;
  arrayCamion: Array<MedioTransporteModel>;
  transportModel: TransporteModel;
  arrayOrdeness: Array<OrderBuyModel> = this.arrayOrdenes;
  itsConfigureTransport: boolean;

    constructor(dialogService: DialogService,
                public infoTransport: InfoTransportCompanyService,
                public data: DataTransportDistpacthService,
                public messageService: MessageService) {
    super(dialogService);
  }

  ngOnInit() {
    this.loadCompanyTransport();
    this.itsConfigureTransport  = false;
    console.log('Imprimo ordenes')
    console.log(this.arrayOrdenes);
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.transportModel = new TransporteModel();
    this.transportModel.conductor = Number(this.selectedConductor);
    this.transportModel.patente = Number(this.selectedPatente);
    this.transportModel.transporte = Number(this.selectedEmpresaTransportista);
    sessionStorage.setItem(StorageConstant.DRIVER_ORDERS, JSON.stringify(this.transportModel));
    this.result = true;
    this.itsConfigureTransport = true;
    sessionStorage.setItem(StorageConstant.ITSCONFIGURE_TRANSPORT, JSON.stringify(this.itsConfigureTransport));
    this.close();
  }

  closeModal() {
    // this.itsConfigureTransport  = false;
    // sessionStorage.setItem(StorageConstant.ITSCONFIGURE_TRANSPORT, JSON.stringify(this.itsConfigureTransport));
    this.close();
  }

  loadCompanyTransport() {
    this.messageService.cargando(true);
    this.infoTransport.getTransportCompany().subscribe((res: any) => this.ret = res,
    err => {
      this.close();
      this.messageService.cargando(false);
      this.messageService.enviarMensaje(MessageErrorConstant.ERROR_SERVICIO,
                                       [MessageErrorConstant.ERROR_TRYAGAIN],
                                        MessageErrorConstant.TYPE_MESSAGE,
                                        this.dialogService);
    },
    () => {
      this.arrayTransportCompany = this.ret.data;
      this.messageService.cargando(false);
    });
  }

  chargerDriversAndTransport() {
    this.loadConductores();
    this.loadCamiones();
  }


  loadConductores() {
    this.infoTransport.getDriverByCompany(Number(this.selectedEmpresaTransportista)).subscribe((res: any) => this.ret = res,
    err  => {
      this.messageService.enviarMensaje(MessageErrorConstant.ERROR_SERVICIO,
                                        [MessageErrorConstant.ERROR_TRYAGAIN],
                                        MessageErrorConstant.TYPE_MESSAGE,
                                        this.dialogService);
    },
    () => {
      this.arrayConductores = this.ret.data;
    });

  }

  loadCamiones() {
    this.infoTransport.getTransportByCompany(Number(this.selectedEmpresaTransportista)).subscribe((res: any) => this.ret = res,
    err =>  {
      this.messageService.enviarMensaje(MessageErrorConstant.ERROR_SERVICIO,
        [MessageErrorConstant.ERROR_TRYAGAIN],
         MessageErrorConstant.TYPE_MESSAGE,
         this.dialogService);
    },
    () => {
      this.arrayCamion = this.ret.data;
    });
  }

  loadTransportConfigured() {
    this.arrayOrdeness = this.arrayOrdenes;
    this
  }
}
