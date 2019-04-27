import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Globals } from './../../../shared/utils/globals';
import { Router } from '@angular/router';
import { EmisionUnitariaGdeService } from '../../services/emisionUnitariaGde.service';
import { DataTableDirective } from 'angular-datatables';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../util/tableConfig.util';
import { MessageService } from '../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalConfigTransporteComponent } from './configTransporteModal/configTransporte.component';
import { ValidadorDatos } from '../../util/validador.util';
import {
  ConstantFieldForm,
  MessageErrorConstant,
  StorageConstant,
  bookBase64
} from '../../util/constant.util';
import { OrderBuyModel } from '../../vo/ordenBuy.model';
import { DispatchGuideModel } from '../../vo/dispatchGuide/dispatchGuide.model';
import { TransporteModel } from '../../vo/transporteDespacho.model';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import CONSTANTS from '../../../shared/utils/constants';

@Component({
  selector: ' app-emisionunitaria ',
  templateUrl: './emisionUnitariaGde.component.html',
  styleUrls: ['./emisionUnitariaGde.component.scss']
})
export class EmisionUnitariaGdeComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('alertImprimir') alertImprimir;
  @ViewChild('windowWaitPrint') windowWaitPrint;
  @ViewChild('windowWaitPrintPdfViewer') windowWaitPrintPdfViewer;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  radioButtonSelected: String = 'oc';
  inputOCRut: String;
  textInput: String = ConstantFieldForm.INPUT_INIT_OC;
  messageValidBoolean: Boolean;
  messageValid: String;
  check: Boolean;
  pdfSrc: string = 'http://www.agirregabiria.net/g/sylvainaitor/principito.pdf';

  arrayGuiaDespacho: Array<DispatchGuideModel>;
  arrayGuiaDespachoModel: Array<OrderBuyModel>;
  arrayGuiaDespachoSend: Array<OrderBuyModel>;
  objTransportModel: TransporteModel;
  objOrderBuyModel: OrderBuyModel;
  btnActivateTransport: Boolean;
  btnActivatePrint: Boolean;
  btnDisabled: Boolean;
  isModalActive: boolean = false;
  ret: any;

  checkInModal: boolean;
  itsConfigTransport: boolean;

  pdfurl: any;

  constructor(
    public globals: Globals,
    public router: Router,
    public emisionUnitariaGDEService: EmisionUnitariaGdeService,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService,
    public validadorDatos: ValidadorDatos,
    public sanitizer: DomSanitizer
  ) {
    this.inputOCRut = '';
    this.arrayGuiaDespacho = new Array();
    this.arrayGuiaDespachoModel = new Array();
    this.checkInModal = false;
  }

  ngOnInit() {
    this.messageValidBoolean = false;
    this.btnDisabled = false;
    this.dtOptions = this.configTable.dtOptionsExport;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // Funciones utilizas para interactuar con las ordenes de compra

  // Metodo con el cual configuro el transporte a las ordenes de compra
  buscarTransporte() {
    const disposable = this.dialogService
      .addDialog(ModalConfigTransporteComponent, {
        title: '',
        message: '',
        arrayOrdenes: this.arrayGuiaDespachoModel
      })
      .subscribe(isConfirmed => {
        this.checkInModal = true;
        if (isConfirmed) {
          this.objTransportModel = new TransporteModel();
          this.objTransportModel = JSON.parse(
            sessionStorage.getItem(StorageConstant.DRIVER_ORDERS)
          );
          sessionStorage.removeItem(StorageConstant.DRIVER_ORDERS);
          // Seteo la empresa transportista por cada orden de compra
          this.arrayGuiaDespachoModel.forEach(arrayOrder => {
            console.log(this.objTransportModel);
            if (arrayOrder.isSelected) {
              if (this.objTransportModel.conductor !== 0 && this.objTransportModel.patente !== 0) {
                arrayOrder.transport = this.objTransportModel;
              }
            }
          });
          this.arrayGuiaDespachoSend = new Array();
          this.arrayGuiaDespachoModel.forEach(orderElement => {
            if (orderElement.isSelected) {
              console.log(orderElement.nOrdenBoleta);
              this.arrayGuiaDespachoSend.push(orderElement);
            }
          });
          this.messageService.cargando(true);
          this.emisionUnitariaGDEService
            .printDispathGuide(this.arrayGuiaDespachoSend)
            .subscribe(
              (res: any) => (this.ret = res),
              err => {
                this.messageService.cargando(false);
                this.messageService.enviarMensaje(
                  MessageErrorConstant.ERROR_SERVICIO,
                  [MessageErrorConstant.ERROR_CONSUME_SERVICE],
                  MessageErrorConstant.TYPE_MESSAGE_ERROR,
                  this.dialogService
                );
              },
              () => {
                this.messageService.cargando(false);
                this.viewPdf(this.ret.data);
              }
            );
        } else {

        }
      });
  }

  // Metodo con el  cual se validan los campos de busqueda para posteriormente realizar la busqueda
  buscarGuiasUnitarias() {
    this.btnActivateTransport = false;
    this.btnActivatePrint = false;
    if (this.inputOCRut === undefined || this.inputOCRut === '') {
      this.messageValid = ConstantFieldForm.INPUT_EMPTY;
      this.messageValidBoolean = true;
      return;
    }
    if (this.radioButtonSelected === ConstantFieldForm.RUT) {
      const countryUser: string = sessionStorage.getItem('countryUser');
      console.log(countryUser);
      if (countryUser === 'CHILE') {
        console.log('valido Rut');
        if (!this.validadorDatos.validarRut(this.inputOCRut)) {
          this.messageValid = ConstantFieldForm.RUT_INVALIDO;
          this.messageValidBoolean = true;
          return;
        }
      } else if (countryUser === 'PERU') {
      } else {
        this.messageService.enviarMensaje(
          MessageErrorConstant.ERROR_SERVICIO,
          [MessageErrorConstant.ERROR_CONSUME_SERVICE],
          MessageErrorConstant.TYPE_MESSAGE_ERROR,
          this.dialogService
        );
        return;
      }
    } else {
      const isOcValida = this.validadorDatos.validationOc(this.inputOCRut);
      if (!isOcValida) {
        this.messageValid = ConstantFieldForm.OC_INVALIDA;
        this.messageValidBoolean = true;
        return;
      }
    }
    this.getGuiasDespachos();
  }

  // Metodo el cual a traves de un service va a buscar las ordenes de compra
  getGuiasDespachos() {
    this.messageService.cargando(true);
    this.emisionUnitariaGDEService.getGuiasDespacho(this.inputOCRut).subscribe(
      (res: any) => (this.ret = res),
      err => {
        console.log(err);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje(
          MessageErrorConstant.ERROR_SERVICIO,
          [MessageErrorConstant.ERROR_CONSUME_SERVICE],
          MessageErrorConstant.TYPE_MESSAGE_ERROR,
          this.dialogService
        );
      },
      () => {
        this.messageService.cargando(false);
        console.log(this.ret);
        this.arrayGuiaDespacho = this.ret.dispatchGuide;
        this.getOrderByGuide();
      }
    );
  }

  // Metodo que valida las ordenes antes de enviar a imprimir
  validateOrder() {
    // this.itsConfigTransport = Boolean(
    //   JSON.parse(sessionStorage.getItem(StorageConstant.ITSCONFIGURE_TRANSPORT))
    // );
    // sessionStorage.removeItem(StorageConstant.ITSCONFIGURE_TRANSPORT);

    // if (this.checkInModal) {
    //   this.checkInModal = false;
    //   if (!this.itsConfigTransport) {
    //     this.alertImprimir.open();
    //   }
    // } else {
    //   this.imprimirGde();
    // }

    this.imprimirGde();
  }
  // Metodo con el cual se enviaran las ordenes de compra a imprimir
  imprimirGde() {
    this.buscarTransporte();
  }

  // Metodo con el cual se volcan los datos recibidos por el service a un arreglo
  getOrderByGuide() {
    this.arrayGuiaDespachoModel = new Array();
    this.arrayGuiaDespacho.forEach(dispatchGuideUnique => {
      dispatchGuideUnique.orders.forEach(orderElement => {
        orderElement.detail.articles.forEach(articlesElements => {
          this.objOrderBuyModel = new OrderBuyModel();
          this.objOrderBuyModel.isSelected = false;
          this.objOrderBuyModel.buyerName =
            dispatchGuideUnique.header.buyer.name;
          this.objOrderBuyModel.identificationNumberBuyer =
            dispatchGuideUnique.header.buyer.identificationDocument;
          this.objOrderBuyModel.dispacthClientName =
            orderElement.dispatchClient.name;
          this.objOrderBuyModel.idNumberDispatchClient =
            orderElement.dispatchClient.identificationDocument;
          this.objOrderBuyModel.transferType = articlesElements.transferType;
          this.objOrderBuyModel.statusCud = articlesElements.statusCud;
          this.objOrderBuyModel.reasonCud = articlesElements.stateReason;
          this.objOrderBuyModel.statusReasonReservation =
            articlesElements.stateReason;
          this.objOrderBuyModel.cud = articlesElements.cud;
          this.objOrderBuyModel.location = articlesElements.stockBranchOffice;
          this.objOrderBuyModel.sku = articlesElements.sku;
          this.objOrderBuyModel.descriptionSku =
            articlesElements.descriptionSku;
          this.objOrderBuyModel.region = orderElement.dispatchClient.region;
          this.objOrderBuyModel.commune = orderElement.dispatchClient.commune;
          this.objOrderBuyModel.addressDispatch =
            orderElement.dispatchClient.addres;
          this.objOrderBuyModel.nOrdenBoleta = orderElement.orderNumber;
          this.objOrderBuyModel.unitPrice = Number(articlesElements.unitPrice);
          this.objOrderBuyModel.quantity = Number(articlesElements.quantity);
          this.objOrderBuyModel.saleBranchOffice =
            orderElement.detailBranchOffices.saleBranchOffice;
          this.objOrderBuyModel.stockBranchOffice =
            articlesElements.stockBranchOffice;
          this.objOrderBuyModel.dispatBranchOffice =
            orderElement.detailBranchOffices.dispatchBranchOffice;
          this.objOrderBuyModel.nCarton = Number(articlesElements.nroCarton);
          this.objOrderBuyModel.header = dispatchGuideUnique.header;
          this.objOrderBuyModel.dispatchClient = orderElement.dispatchClient;
          this.objOrderBuyModel.refencedDocuments =
            dispatchGuideUnique.referencedDocuments;
          this.objOrderBuyModel.footer = dispatchGuideUnique.footer;
          this.objOrderBuyModel.generals = dispatchGuideUnique.generals;
          this.objOrderBuyModel.item = Number(articlesElements.item);
          this.objOrderBuyModel.codeArticle = Number(articlesElements.code);
          this.objOrderBuyModel.descripcion = articlesElements.description;
          this.objOrderBuyModel.dispatchType = articlesElements.transferType;
          this.objOrderBuyModel.ticketNumber = orderElement.ticketNumber;
          this.arrayGuiaDespachoModel.push(this.objOrderBuyModel);
        });
      });
    });
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // Metodo con el cual se eliminan un objeto dentro de un arreglo
  removerAtributos(array: any, item: any) {
    const i = array.indexOf(item);
    if (i !== -1) {
      array.splice(i, 1);
    }
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  // Metodo con el cual muestro un pdf en base 64 en pantalla
  viewPdf(pdf: string) {
    const base64EncodedPDF = pdf;
    const decodedPdfContent = atob(base64EncodedPDF);
    const byteArray = new Uint8Array(decodedPdfContent.length);
    for (let i = 0; i < decodedPdfContent.length; i++) {
      byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    const blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
    const _pdfurl = URL.createObjectURL(blob);
    this.pdfurl = this.sanitizer.bypassSecurityTrustResourceUrl(_pdfurl);

    this.isModalActive = !this.isModalActive;
  }

  // <-------------------------------------------------------------------------------------->
  // Funciones utilizadas para modificar apariencia de la pantalla en base a ciertas acciones

  // Metodo con el cual se cambian los textos en base al radio button seleccionado
  radioButtonChange(evt: any) {
    this.radioButtonSelected = evt.srcElement.value;
    if (this.radioButtonSelected === ConstantFieldForm.RUT) {
      this.textInput = ConstantFieldForm.INPUT_INIT_RUT;
      this.inputOCRut = undefined;
    } else {
      this.textInput = ConstantFieldForm.INPUT_INIT_OC;
      this.inputOCRut = undefined;
    }
  }

  // Metodo el cual muestra u oculta mensaje en pantalla
  hide() {
    this.messageValidBoolean = true ? false : true;
    console.log(this.inputOCRut.length);

    if (this.inputOCRut.length === 0) {
      this.btnDisabled = false;
    }
  }

  // Metodo con el cual se activan los botones de transporte e imprimir en base a las ordenes de compra seleccionada
  activateBtnTransport() {
    let count = 0;
    this.arrayGuiaDespachoModel.forEach(elements => {
      if (elements.isSelected) {
        count++;
      }
    });
    count > 0
      ? (this.btnActivateTransport = true)
      : (this.btnActivateTransport = false);
    count > 0
      ? (this.btnActivatePrint = true)
      : (this.btnActivatePrint = false);
  }

  // Metodo con el cual se refresca la grilla mostrada en pantalla
  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // Metodo con el cual activo el boton buscar
  activateInputIDOC(event) {
    if (this.inputOCRut !== undefined && this.inputOCRut !== null ) {
      if (this.inputOCRut.length === 0) {
        this.btnDisabled = false;
      } else {
        this.btnDisabled = true;

        if (sessionStorage.getItem('countryUser') === 'CHILE' && this.radioButtonSelected === ConstantFieldForm.RUT) {
          this.onlyNumber(event);
          this.rutFormat();
        }
      }
    }
  }

  // Metodo para cerrar modal
  cerrar() {
    this.alertImprimir.close();
  }

  // Metodo que autoformate el rut
  rutFormat() {
    // tslint:disable-next-line: prefer-const
        let rut = this.rutClean(this.inputOCRut);
        console.log('Soy Chileno 2');
        console.log(rut.length);
        if (rut.length <= 1) {
          console.log('Soy Chileno n valido');
            return rut;
        }
        let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
        for (let i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result;
        }
        console.log('Soy Chileno fin');
        console.log(rut);
        this.inputOCRut = result;
      }

  rutClean(value) {
    return typeof value === 'string' ? value.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
  }

  onlyNumber(event) {
    if(sessionStorage.getItem('countryUser') === 'CHILE' && this.radioButtonSelected ===  ConstantFieldForm.RUT) {
      // tslint:disable-next-line:max-line-length
      return (event.charCode === 8 || event.charCode === 0 || event.charCode === 75 || event.charCode === 107) ? null : event.charCode >= 48 && event.charCode <= 57;
    } else if (this.radioButtonSelected ===  ConstantFieldForm.OC) {
      return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

  }
}
