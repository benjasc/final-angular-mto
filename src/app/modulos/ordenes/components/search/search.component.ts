import { Utils } from './../../../shared/utils/utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from './../../../shared/services/searchservice';
import { OrderTypeService } from './../../../shared/services/ordertypeservice';
import { IMyDateModel } from 'mydatepicker';
import { DateFormat } from './dateFormat';
import { GLOBAL } from './../../../shared/services/global';
import * as XLSX from 'xlsx';

import { MessageService } from './../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { EmailService } from './../../../shared/services/email.service';
import { Usuario } from './../../../shared/vo/usuario';
import { Globals } from './../../../shared/utils/globals';
import { MenuProfile } from './../../../shared/vo/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private menu: MenuProfile[];
  searchservice: SearchService;
  fechaCompraDesde: Date;
  fechaCompraHasta: Date;
  desdeString: String;
  hastaString: String;
  ordernumber: String;
  fechaEntregaDesde: Date;
  fechaEntregaHasta: Date;
  entregaDesdeString: String;
  entregaHastaString: String;

  // Paginador
  pgCurrent: Number;
  pgrows: Number;

  // Exportar
  ws: XLSX.WorkSheet;
  wb: XLSX.WorkBook;

  // ordenar
  orderProperty: String;
  currentColumn: any;
  currentDirection: any;
  dir: any;

  // datePicker
  myDatePickerOptionsDesde: any;
  myDatePickerOptionsHasta: any;
  myDatePickerOptionsCopy: any;
  formatoFechaDesde: DateFormat;
  formatoFechaHasta: DateFormat;

  myDatePickerOptionsEntregaDesde: any;
  myDatePickerOptionsEntregaHasta: any;
  myDatePickerOptionsCopyEntrega: any;
  formatoFechaEntregaDesde: DateFormat;
  formatoFechaEntregaHasta: DateFormat;

  // Rut
  cuerpoRut: string;
  dvRut: string;

  private usuario: Usuario;
  private config: any;
  editable: Boolean;
  exportEnable: Boolean;
  loadings: boolean;

  dc: Number;
  url: String;

  results: any[];
  public listTypeOrders: any;
  resultsEmailByOC: Object[];
  resultsDetail: any;
  utils: Utils;

  // Datos recuperados
  volver: string;
  rut: string;
  dni: string;
  orden: string;
  sku: string;
  nombreRetira: string;
  ret: any;
  nombreDestinatario: string;
  comprador: string;
  codigoClubes: string;
  fechaCompraDesdeRecuperada: string;
  fechaCompraHastaRecuperada: string;
  fechaEntregaDesdeRecuperada: string;
  fechaEntregaHastaRecuperada: string;
  nombreFlujos: string;
  valorFlujos: string;
  flujos: any[];

  @ViewChild('myModal') myModal;
  @ViewChild('myModalEmailInfo') myModalEmailInfo;

  constructor(public searchInfo: SearchService, public emailInfo: EmailService, public messageService: MessageService,
    public dialogService: DialogService, public globals: Globals, public router: Router, public orderTypeService: OrderTypeService) {
    this.pgCurrent = 1;
    this.pgrows = GLOBAL.paginador_rows;
    this.orderProperty = '+ordernumber';
    searchInfo.tipoDoc = 'rut';
    this.config = this.globals.getValue();
    this.resultsDetail = [];
    this.utils = new Utils(this.messageService, this.router, this.dialogService);
  }

  ngOnInit() {
    this.messageService.cargando(true);
    this.cleanResults();
    // usuario
    this.usuario = this.config[1].val;
    // menu
    this.menu = this.config[2].val;
    // url
    this.url = this.router.url;
    // console.log('Access : ' + JSON.stringify(this.menu) + ' / ' + this.usuario.idUser + ' / ' + this.router.url);

    for (let i = 0; i < this.menu.length; i++) {
      for (let j = 0; j < this.menu[i].subItems.length; j++) {
        // console.log('Access Menu: ' + this.menu[i].idAccess + ' / ' + this.menu[i].idModule + ' / ' +
        // this.menu[i].name + ' / ' + this.menu[i].url);

        // console.log('Access SubMenu: ' + this.menu[i].subItems[j].idAccess + ' / ' + this.menu[i].subItems[j].idModule +
        //     ' / ' + this.menu[i].subItems[j].name + ' / ' + ' / ' + this.menu[i].subItems[j].url);

        if (this.router.url === this.menu[i].subItems[j].url) {
          if (this.menu[i].subItems[j].idAccess >= 2) {
            // console.log('true');
            this.editable = true;
          } else {
            // console.log('false');
            this.editable = false;
          }

          if (this.menu[i].subItems[j].idAccess === 3) {
            this.exportEnable = true;
          } else {
            this.exportEnable = false;
          }
        }
      }
    }
    console.log('Editable : ' + this.editable + ' exportEnable : ' + this.exportEnable);

    this.orderTypeService.getOrderType().subscribe(
      result => {
        this.listTypeOrders = this.utils.validarRespuestaFormatear(result);
        // this.listTypeOrders = result.message.replace(/\n/ig, '');
        // this.listTypeOrders = JSON.parse(this.listTypeOrders);
        this.listTypeOrders = this.listTypeOrders.listTypeOrders;
        this.messageService.cargando(false);
      },
      error => {
        console.log(<any>error);
      }
    );

    this.volver = sessionStorage.getItem('volverSearch');
    sessionStorage.removeItem('volverSearch');
    // const volverSearch = sessionStorage.getItem('volverSearch');
    // console.log('volverSearch ' + volverSearch);
    if (sessionStorage.getItem('resultadosBusqueda') !== null &&
      sessionStorage.getItem('resultadosBusqueda') !== undefined && this.volver === 'SI') {
      this.results = JSON.parse(sessionStorage.getItem('resultadosBusqueda'));

      this.rut = sessionStorage.getItem('formRut') !== null &&
        sessionStorage.getItem('formRut') !== undefined ? sessionStorage.getItem('formRut') : '';

      this.searchInfo.tipoDoc = this.rut !== '' ? 'rut' : 'dni';

      this.dni = sessionStorage.getItem('formDni') !== null &&
        sessionStorage.getItem('formDni') !== undefined ? sessionStorage.getItem('formDni') : '';

      this.orden = sessionStorage.getItem('formOC') !== null &&
        sessionStorage.getItem('formOC') !== undefined ? sessionStorage.getItem('formOC') : '';

      this.sku = sessionStorage.getItem('formSku') !== null &&
        sessionStorage.getItem('formSku') !== undefined ? sessionStorage.getItem('formSku') : '';

      this.nombreRetira = sessionStorage.getItem('formNombreRetira') !== null &&
        sessionStorage.getItem('formNombreRetira') !== undefined ? sessionStorage.getItem('formNombreRetira') : '';

      this.comprador = sessionStorage.getItem('formComprador') !== null &&
        sessionStorage !== undefined ? sessionStorage.getItem('formComprador') : '';

      this.nombreDestinatario = sessionStorage.getItem('formDest') !== null &&
        sessionStorage.getItem('formDest') !== undefined ? sessionStorage.getItem('formDest') : '';

      this.codigoClubes = sessionStorage.getItem('formCodPe') !== null &&
        sessionStorage.getItem('formCodPe') !== undefined ? sessionStorage.getItem('formCodPe') : '';

      this.valorFlujos = sessionStorage.getItem('formTypeOrder') !== null &&
        sessionStorage.getItem('formTypeOrder') !== undefined ? sessionStorage.getItem('formTypeOrder') : '';
      console.log(sessionStorage.getItem('listTypeOrders'));
      this.flujos = JSON.parse(sessionStorage.getItem('listTypeOrders'));

      if (this.valorFlujos !== null && this.valorFlujos !== undefined && this.valorFlujos !== '' &&
        this.flujos !== null && this.flujos !== undefined) {
        console.log('entro en el if');
        this.flujos.forEach(element => {
          console.log('entro en el for');
          if (element.orderType === Number(this.valorFlujos)) {
            this.nombreFlujos = element.name;
            console.log(this.nombreFlujos);
          }
        });
      }
      console.log('rut: ' + this.rut);
      console.log('dni: ' + this.dni);
      console.log('searchInfo.tipoDoc: ' + this.searchInfo.tipoDoc);


      // this.fechaCompraDesdeRecuperada = sessionStorage.getItem('formFechaDesde') !== null &&
      //   sessionStorage.getItem('formFechaDesde') !== undefined ? sessionStorage.getItem('formFechaDesde') : '';

      // this.fechaEntregaDesdeRecuperada = sessionStorage.getItem('formFechaEntregaDesde') !== null &&
      //   sessionStorage.getItem('formFechaEntregaDesde') !== undefined ? sessionStorage.getItem('formFechaEntregaDesde') : '';

      // this.fechaEntregaHastaRecuperada = sessionStorage.getItem('formFechaEntregaHasta') !== null &&
      //   sessionStorage.getItem('formFechaEntregaHasta') !== undefined ? sessionStorage.getItem('formFechaEntregaHasta') : '';

      // this.fechaCompraHastaRecuperada = sessionStorage.getItem('formFechaHasta') !== null &&
      // sessionStorage.getItem('formFechaHasta') !== undefined ? sessionStorage.getItem('formFechaHasta') : '';
      //   console.log(this.fechaCompraDesdeRecuperada);
      //   console.log(this.fechaCompraHastaRecuperada);
      // this.fechaCompraDesde = this.fechaCompraDesdeRecuperada !== null &&
      //   this.fechaCompraDesdeRecuperada !== undefined ? new Date(this.fechaCompraDesdeRecuperada) : new Date();

      // this.fechaCompraHasta = this.fechaCompraHastaRecuperada !== null &&
      //   this.fechaCompraHastaRecuperada !== undefined ? new Date(this.fechaCompraHastaRecuperada) : new Date();

      // this.fechaEntregaDesde = this.fechaEntregaDesdeRecuperada !== null &&
      //   this.fechaEntregaDesdeRecuperada !== undefined ? new Date(this.fechaEntregaDesdeRecuperada) : new Date();

      // this.fechaEntregaHasta = this.fechaEntregaHastaRecuperada !== null &&
      //   this.fechaEntregaHastaRecuperada !== undefined ? new Date(this.fechaEntregaHastaRecuperada) : new Date();

      // console.log(this.fechaCompraDesde);
      // console.log(this.fechaCompraHasta);
      // console.log(this.fechaEntregaDesde);
      // console.log(this.fechaEntregaHasta);

      // const dire = sessionStorage.getItem('formDire');

      // const comprador = sessionStorage.getItem('formComprador');
      // const codPe = sessionStorage.getItem('formCodPe');
      // const fechaDesde = sessionStorage.getItem('formFechaDesde');
      // const fechaHasta = sessionStorage.getItem('formFechaHasta');

      // const fechaEntregaDesde = sessionStorage.getItem('formFechaEntregaDesde');
      // const fechaEntregaHasta = sessionStorage.getItem('formFechaEntregaHasta');
      // const formTypeOrder = sessionStorage.getItem('formTypeOrder');
    } else {
      sessionStorage.removeItem('resultadosBusqueda');
      sessionStorage.removeItem('volverSearch');
      sessionStorage.removeItem('formRut');
      sessionStorage.removeItem('formDni');
      sessionStorage.removeItem('formOC');
      sessionStorage.removeItem('formSku');
      sessionStorage.removeItem('formNombreRetira');
      sessionStorage.removeItem('formComprador');
      sessionStorage.removeItem('formDest');
      sessionStorage.removeItem('formCodPe');
      sessionStorage.removeItem('formFechaDesde');
      sessionStorage.removeItem('formFechaHasta');
      sessionStorage.removeItem('formTypeOrder');
      sessionStorage.removeItem('listTypeOrders');
    }
    // if (volverSearch === 'SI') {
    //   console.log('Se ejecuta boton volver');
    //   sessionStorage.removeItem('volverSearch');
    //   // this.rutRec = sessionStorage.getItem('formRut');
    //   const rut = sessionStorage.getItem('formRut');
    //   const dni = sessionStorage.getItem('formDni');
    //   this.ordenCompraRec = sessionStorage.getItem('formOC');
    //   const oc = sessionStorage.getItem('formOC');
    //   const sku = sessionStorage.getItem('formSku');
    //   const dire = sessionStorage.getItem('formDire');
    //   const dest = sessionStorage.getItem('formDest');
    //   const comprador = sessionStorage.getItem('formComprador');
    //   const codPe = sessionStorage.getItem('formCodPe');
    //   const fechaDesde = sessionStorage.getItem('formFechaDesde');
    //   const fechaHasta = sessionStorage.getItem('formFechaHasta');
    //   const formNombreRetira = sessionStorage.getItem('formNombreRetira');
    //   const fechaEntregaDesde = sessionStorage.getItem('formFechaEntregaDesde');
    //   const fechaEntregaHasta = sessionStorage.getItem('formFechaEntregaHasta');
    //   const formTypeOrder = sessionStorage.getItem('formTypeOrder');

    //   this.loadings = true;
    //   this.messageService.cargando(this.loadings);

    //   this.searchInfo.search(rut, dni, oc, sku, dire, dest, comprador, codPe, fechaDesde, fechaHasta,
    //       formNombreRetira, fechaEntregaDesde, fechaEntregaHasta, formTypeOrder).subscribe(
    //       res => {
    //         if (res.code === 0 && res.code !== undefined) {
    //           res = this.utils.validarRespuesta(res);
    //           this.results = res.message.replace(/\n/ig, '');
    //           this.results = JSON.parse(this.results.toString());
    //           console.log(this.results);
    //           this.loadings = false;
    //           this.messageService.cargando(this.loadings);
    //           if (this.results.length === 0) {
    //             this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
    //           }
    //         } else if (res.code === 12) {
    //           this.messageService.cargando(false);
    //           this.messageService.enviarMensaje('Alerta', [res.message], 'warn', this.dialogService);
    //           this.router.navigate(['/login']);
    //         } else {
    //             this.messageService.cargando(false);
    //             this.messageService.enviarMensaje('Error', ['Ha ocurrido un error al obtener parametros'], 'warn', this.dialogService);
    //         }
    //       },
    //       err => {
    //         this.loadings = false;
    //         this.messageService.cargando(this.loadings);
    //         this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
    //       }
    //     );
    // } else {
    //   console.log('No se ha ejecutado el boton volver');
    // }

    this.formatoFechaDesde = new DateFormat();
    this.formatoFechaHasta = new DateFormat();

    this.formatoFechaEntregaDesde = new DateFormat();
    this.formatoFechaEntregaHasta = new DateFormat();

    // Fecha Desde
    const d: Date = new Date();
    this.formatoFechaDesde.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
    this.formatoFechaDesde.myDatePickerOptions.disableUntil = { year: d.getFullYear(), month: d.getMonth() - 12, day: d.getDate() };
    this.myDatePickerOptionsDesde = this.formatoFechaDesde.myDatePickerOptions;
    // Fecha Hasta
    this.formatoFechaHasta.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
    this.formatoFechaHasta.myDatePickerOptions.disableUntil = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
    this.myDatePickerOptionsHasta = this.formatoFechaHasta.myDatePickerOptions;

    // Fecha Entrega Desde
    this.formatoFechaEntregaDesde.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
    this.formatoFechaEntregaDesde.myDatePickerOptions.disableUntil = { year: d.getFullYear(), month: d.getMonth() - 12, day: d.getDate() };
    this.myDatePickerOptionsEntregaDesde = this.formatoFechaEntregaDesde.myDatePickerOptions;
    // Fecha Entrega Hasta
    this.formatoFechaEntregaHasta.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 4, day: d.getDate() + 1 };
    this.formatoFechaEntregaHasta.myDatePickerOptions.disableUntil = { year: d.getFullYear(), month: d.getMonth() + 4, day: d.getDate() + 1 };
    this.myDatePickerOptionsEntregaHasta = this.formatoFechaEntregaHasta.myDatePickerOptions;
  }

  cambiaFechaDesde(event: IMyDateModel) {
    // Fecha Hasta
    this.fechaCompraHasta = undefined;
    if (event.date.year) {
      const d: Date = new Date();
      const d2: Date = new Date();
      this.myDatePickerOptionsCopy = Object.assign({}, this.formatoFechaHasta.myDatePickerOptions);
      this.formatoFechaHasta.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
      this.myDatePickerOptionsCopy.disableUntil = { year: event.date.year, month: event.date.month, day: event.date.day - 1 };
      const months = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getMonth() - d.getMonth();
      const days = event.date.day;
      const diasDif = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getTime() - d.getTime();
      const dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
      const meses = Math.round(dias / 31);
      const date = new Date();
      const primerDiaMesAnterior = new Date(event.date.year, event.date.month - 1, 1);
      const ultimoDiaMesAnterior = new Date(event.date.year, event.date.month - 1, 0);
      const ultimoYearsAnterior = new Date(event.date.year - 1, event.date.month, 0);

      if (+meses <= -3) {
        if (days === 1) {
          if (dias < -92) {
            this.myDatePickerOptionsCopy.disableSince = { year: event.date.year, month: event.date.month + 3, day: event.date.day + 1 };
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          } else {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          }
        } else {
          if (dias < -92) {
            this.myDatePickerOptionsCopy.disableSince = { year: event.date.year, month: event.date.month + 3, day: event.date.day + 1 };
          } else {
            this.myDatePickerOptionsCopy.disableUntil = { year: event.date.year, month: event.date.month, day: event.date.day - 1 };
          }
        }
      } else {
        if (days === 1) {
          if (ultimoDiaMesAnterior.getMonth() === 11) {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year - 1, month: ultimoDiaMesAnterior.getMonth() + 1, day: ultimoDiaMesAnterior.getDate()
            };
          } else {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          }
        }
      }
      this.myDatePickerOptionsHasta = this.myDatePickerOptionsCopy;
    }
    this.fechaCompraDesde = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  cambiaFechaHasta(event: IMyDateModel) {
    this.fechaCompraHasta = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  cambiaFechaEntregaDesde(event: IMyDateModel) {
    // Fecha Hasta
    this.fechaEntregaHasta = undefined;
    if (event.date.year) {
      const d: Date = new Date();
      const d2: Date = new Date();
      this.myDatePickerOptionsCopyEntrega = Object.assign({}, this.formatoFechaEntregaHasta.myDatePickerOptions);
      // tslint:disable-next-line:max-line-length
      this.formatoFechaEntregaHasta.myDatePickerOptions.disableSince = { year: d.getFullYear(), month: d.getMonth() + 4, day: d.getDate() + 1 };
      this.myDatePickerOptionsCopyEntrega.disableUntil = { year: event.date.year, month: event.date.month, day: event.date.day - 1 };
      const months = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getMonth() - d.getMonth();
      const days = event.date.day;
      const diasDif = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getTime() - d.getTime();
      const dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
      const meses = Math.round(dias / 31);
      const date = new Date();
      const primerDiaMesAnterior = new Date(event.date.year, event.date.month - 1, 1);
      const ultimoDiaMesAnterior = new Date(event.date.year, event.date.month - 1, 0);
      const ultimoYearsAnterior = new Date(event.date.year - 1, event.date.month, 0);

      if (+meses <= -3) {
        if (days === 1) {
          if (dias < -92) {
            this.myDatePickerOptionsCopyEntrega.disableSince = {
              year: event.date.year, month: event.date.month + 3, day: event.date.day + 1
            };
            this.myDatePickerOptionsCopyEntrega.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          } else {
            this.myDatePickerOptionsCopyEntrega.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          }
        } else {
          if (dias < -92) {
            this.myDatePickerOptionsCopyEntrega.disableSince = {
              year: event.date.year, month: event.date.month + 3, day: event.date.day + 1
            };
          }
        }
      } else {
        if (days === 1) {
          if (ultimoDiaMesAnterior.getMonth() === 11) {
            this.myDatePickerOptionsCopyEntrega.disableUntil = {
              year: event.date.year - 1, month: ultimoDiaMesAnterior.getMonth() + 1, day: ultimoDiaMesAnterior.getDate()
            };
          } else {
            this.myDatePickerOptionsCopyEntrega.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()
            };
          }
        }
      }
      this.myDatePickerOptionsEntregaHasta = this.myDatePickerOptionsCopyEntrega;
    }
    this.fechaEntregaDesde = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  cambiaFechaEntregaHasta(event: IMyDateModel) {
    this.fechaEntregaHasta = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  doSearch(rut: string, dni: string, oc: string, sku: string, dire: string, dest: string,
    comprador: string, codppe: string, nombreretira: string, typeOrder: String) {
    // Validar que venga almenos un campo
    if (rut === '' && dni === '' && oc === '' && sku === '' && dire === '' && dest === '' && comprador === '' && codppe === '' &&
      this.fechaCompraDesde === undefined && this.fechaCompraHasta === undefined && this.fechaEntregaDesde === undefined &&
      this.fechaEntregaHasta === undefined && nombreretira === '') {
      this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar filtro de búsqueda'], 'info', this.dialogService);
      return;
    } else if ((this.fechaCompraDesde != null && this.fechaCompraHasta == null) ||
      (this.fechaCompraDesde == null && this.fechaCompraHasta != null)) {
      this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar fecha Desde/Hasta'], 'info', this.dialogService);
      return;
    } else if ((this.fechaEntregaDesde != null && this.fechaEntregaHasta == null) ||
      (this.fechaEntregaDesde == null && this.fechaEntregaHasta != null)) {
      this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar fecha entrega Desde/Hasta'], 'info', this.dialogService);
      return;
    } else if (oc !== '') {
      if (!this.validationOc(oc)) {
        this.messageService.enviarMensaje('Error Editar',
          ['Orden de Compra no válida. Puede ingresar mas de uno separados por comas sin espacios'], 'info', this.dialogService);
        return;
      }
    }

    // Validar sku largo minimo 6
    if (sku !== '' && sku.length < 6) {
      console.log('Error, sku largo mínimo 6');
      this.messageService.enviarMensaje('Error búsqueda', ['SKU Ingresado no es válido'], 'info', this.dialogService);
      return;
    }

    // Si se ingresaron fechas formatear
    if (this.fechaCompraDesde != null && this.fechaCompraHasta != null) {
      this.desdeString =
        this.leadingZero(this.fechaCompraDesde.getDate()) + '/' + this.leadingZero(this.fechaCompraDesde.getMonth() + 1) + '/' +
        this.fechaCompraDesde.getFullYear();
      this.hastaString = this.leadingZero(this.fechaCompraHasta.getDate()) + '/' + this.leadingZero(this.fechaCompraHasta.getMonth() + 1) +
        '/' + this.fechaCompraHasta.getFullYear();
    } else {
      this.desdeString = null;
      this.hastaString = null;
    }

    // Si se ingresaron fechas entrega formatear
    if (this.fechaEntregaDesde != null && this.fechaEntregaHasta != null) {
      this.entregaDesdeString = this.leadingZero(this.fechaEntregaDesde.getDate()) + '/' +
        this.leadingZero(this.fechaEntregaDesde.getMonth() + 1) + '/' + this.fechaEntregaDesde.getFullYear();
      this.entregaHastaString = this.leadingZero(this.fechaEntregaHasta.getDate()) + '/' +
        this.leadingZero(this.fechaEntregaHasta.getMonth() + 1) + '/' + this.fechaEntregaHasta.getFullYear();
    } else {
      this.entregaDesdeString = null;
      this.entregaHastaString = null;
    }

    // Quitar puntos, guion, dv del y validar RUT
    if (rut != null && rut !== '' && this.searchInfo.tipoDoc === 'rut') {
      rut = rut.split('.').join('');
      rut = rut.replace('-', '');

      this.cuerpoRut = rut.slice(0, -1);
      this.dvRut = rut.slice(-1).toUpperCase();

      if (!this.validarRut(this.cuerpoRut, this.dvRut)) {
        this.messageService.enviarMensaje('Error búsqueda', ['Rut no válido'], 'info', this.dialogService);
        return;
      }
      console.log('buscando por rut : ' + rut);
      rut = this.cuerpoRut;
    } else {
      rut = '';
    }

    // Buscar por DNI
    if (dni != null && dni !== '' && this.searchInfo.tipoDoc === 'dni') {
      console.log('buscando por dni : ' + dni);
    } else {
      dni = '';
    }

    /*Guardo en un local stage input form*/
    if (rut === '') {
      sessionStorage.removeItem('formRut');
    } else {
      sessionStorage.setItem('formRut', rut + this.dvRut);
    }
    if (dni === '') {
      sessionStorage.removeItem('formDni');
    } else {
      sessionStorage.setItem('formDni', dni);
    }
    if (oc === '') {
      sessionStorage.removeItem('formOC');
    } else {
      sessionStorage.setItem('formOC', oc);
    }
    if (sku === '') {
      sessionStorage.removeItem('formSku');
    } else {
      sessionStorage.setItem('formSku', sku);
    }
    if (dire === '') {
      sessionStorage.removeItem('formDire');
    } else {
      sessionStorage.setItem('formDire', dire);
    }
    if (dest === '') {
      sessionStorage.removeItem('formDest');
    } else {
      sessionStorage.setItem('formDest', dest);
    }
    if (nombreretira === '') {
      sessionStorage.removeItem('formNombreRetira');
    } else {
      sessionStorage.setItem('formNombreRetira', nombreretira);
    }
    if (comprador === '') {
      sessionStorage.removeItem('formComprador');
    } else {
      sessionStorage.setItem('formComprador', comprador);
    }

    if (codppe === '') {
      sessionStorage.removeItem('formCodPe');
    } else {
      sessionStorage.setItem('formCodPe', codppe);
    }

    if (this.desdeString === null) {
      sessionStorage.removeItem('formFechaDesde');
      console.log('desdeString1 ');
    } else {
      console.log('desdeString2 ');
      sessionStorage.setItem('formFechaDesde', '' + this.desdeString);
    }
    if (this.hastaString === null) {
      sessionStorage.removeItem('formFechaHasta');
    } else {
      sessionStorage.setItem('formFechaHasta', '' + this.hastaString);
    }

    if (this.entregaDesdeString === null) {
      sessionStorage.removeItem('formFechaEntregaDesde');
    } else {
      sessionStorage.setItem('formFechaEntregaDesde', '' + this.entregaDesdeString);
    }
    if (this.entregaHastaString === null) {
      sessionStorage.removeItem('formFechaEntregaHasta');
    } else {
      sessionStorage.setItem('formFechaEntregaHasta', '' + this.entregaHastaString);
    }

    if (typeOrder === '') {
      sessionStorage.removeItem('formTypeOrder');
    } else {
      sessionStorage.setItem('formTypeOrder', typeOrder.toString());
      sessionStorage.setItem('listTypeOrders', JSON.stringify(this.listTypeOrders));
    }

    console.log('Cargando respuesta');

    this.loadings = true;
    this.messageService.cargando(this.loadings);

    this.searchInfo.search(rut, dni, oc, sku, dire, dest, comprador, codppe, this.desdeString, this.hastaString, nombreretira,
      this.entregaDesdeString, this.entregaHastaString, typeOrder).subscribe(
        res => {
          this.results = this.utils.validarRespuestaFormatear(res);
          // this.results = res.message.replace(/\n/ig, '');
          // this.results = JSON.parse(this.results.toString());
          console.log(this.results);
          sessionStorage.setItem('resultadosBusqueda', '' + JSON.stringify(this.results));
          this.loadings = false;
          this.messageService.cargando(this.loadings);
          if (this.results.length === 0) {
            this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
          }
        },
        err => {
          this.loadings = false;
          this.messageService.cargando(this.loadings);
          this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
          console.log(err);
        }
      );
    // this.searchInfo.search(rut, dni, oc, sku, dire, dest, comprador, codppe, this.desdeString, this.hastaString, nombreretira);
    this.searchInfo.orderNumber = oc;
  }

  selectTipoDoc(tipoDocSelected: string) {
    this.searchInfo.tipoDoc = tipoDocSelected;
    console.log('tipo doc : ' + this.searchInfo.tipoDoc);
  }

  validarRut(cuerpoIn: any, dvIn: string) {
    let suma: any;
    let multiplo: any;
    let i: any;
    let index: any;
    let valor: any;
    let dvEsperado: string;

    valor = cuerpoIn + '' + dvIn;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpoIn.length < 7) {
      console.log('Rut no cumple con largo minimo');
      return false;
    }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    for (i = 1; i <= cuerpoIn.length; i++) {
      index = multiplo * valor.charAt(cuerpoIn.length - i);
      suma = suma + index;
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11) + '';

    // Casos Especiales (0 y K)
    dvIn = dvIn === 'K' ? '10' : dvIn;
    dvIn = dvIn === '0' ? '11' : dvIn;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado !== dvIn) {
      console.log('Rut no coincide con dv');
      return false;
    }

    console.log('Rut válido');
    return true;
  }

  doSearchDetail(oc: string) {
    this.searchInfo.orderNumber = oc;

    // search detail order
    this.searchInfo.searchDetail(oc);

    // open Modal
    this.myModal.open();
  }

  doSearchCorreos(oc: string) {
    if (this.resultsDetail !== []) {
      this.resultsDetail = [];
    }
    if (this.resultsEmailByOC !== []) {
      this.resultsEmailByOC = [];
    }

    this.loadings = true;
    this.messageService.cargando(this.loadings);

    this.searchInfo.searchDetail(oc).subscribe(
      res => {
        this.resultsDetail = this.utils.validarRespuestaFormatear(res);
        console.log(this.resultsDetail);
        this.loadings = false;
        this.messageService.cargando(this.loadings);
        // this.resultsDetail = res.message.replace(/\n/ig, '');
        // this.resultsDetail = JSON.parse(this.resultsDetail);
      },
      err => {
        this.loadings = false;
        this.messageService.cargando(this.loadings);
        console.log(err);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda detalle'], 'info', this.dialogService);
      }
    );
    // this.searchInfo.searchDetail(oc);
    this.emailInfo.detailAllEmailByOC(oc).subscribe(
      res => {
        this.resultsEmailByOC = this.utils.validarRespuestaFormatear(res);
        // this.resultsEmailByOC = res.message.replace(/\n/ig, '');
        // this.resultsEmailByOC = JSON.parse(this.resultsEmailByOC.toString());
        if (this.resultsEmailByOC.length === 0) {
          this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
        }
      },
      err => {
        console.log(err);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
      }
    );
    // this.emailInfo.detailAllEmailByOC(oc);

    // open Modal
    this.myModalEmailInfo.open();
  }

  updateEmailCustomer(oldMail: String, oc: string, email: string) {
    this.usuario = this.config[1].val;
    if (!this.validationEmail(email)) {
      this.messageService.enviarMensaje('Error búsqueda', ['Email no válido'], 'info', this.dialogService);
      return;
    } else {
      this.loadings = true;
      this.messageService.cargando(this.loadings);
      this.emailInfo.editMailInfo(oc, email, oldMail, this.usuario.idUser + '').subscribe(
        res => {
          this.results = this.utils.validarRespuestaFormatear(res);
          // this.results = res.message.replace(/\n/ig, '');
          // this.results = JSON.parse(this.results.toString());
          this.loadings = false;
          this.messageService.cargando(this.loadings);

          if (this.results === null) {
            this.loadings = false;
            this.messageService.cargando(this.loadings);
            this.messageService.enviarMensaje('Error actualizar mail', ['Error Actualizar Campo Email'], 'info', this.dialogService);
          } else {
            this.loadings = false;
            this.messageService.cargando(this.loadings);

            // Recargo modal
            console.log('searchDetail');
            this.resultsDetail = [];

            this.loadings = true;
            this.messageService.cargando(this.loadings);

            this.searchInfo.searchDetail(oc).subscribe(
              resSearchDetail => {
                this.resultsDetail = this.utils.validarRespuestaFormatear(resSearchDetail);
                this.loadings = false;
                this.messageService.cargando(this.loadings);
                // this.resultsDetail = resSearchDetail.message.replace(/\n/ig, '');
                // this.resultsDetail = JSON.parse(this.resultsDetail);
                console.log(this.resultsDetail);
              },
              err => {
                this.loadings = false;
                this.messageService.cargando(this.loadings);
                console.log(err);
                this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda detalle'],
                  'info', this.dialogService);
              }
            );

            this.messageService.enviarMensaje('Actualizar Mail', ['Campo email actualizado correctamente'],
              'info', this.dialogService);
          }
        },
        err => {
          this.loadings = false;
          this.messageService.cargando(this.loadings);
          console.log(err);
          this.messageService.enviarMensaje('Error actualizar mail', ['Error servicio actualizar mail'], 'info', this.dialogService);
        }
      );
    }
  }

  reenviarEmail(endpoints: string, oc: string, emailType: string, orderType: string, idFailedEmail: Number) {
    const agrupar = '1';
    this.loadings = true;
    this.messageService.cargando(this.loadings);
    this.emailInfo.forwardEmail(oc, endpoints, emailType, orderType, idFailedEmail, this.usuario.idUser + '')
      .subscribe((res: any) => this.ret = res,
      (err) => {
        console.log(err);
        this.loadings = false;
        this.messageService.cargando(this.loadings);
        this.messageService.enviarMensaje('Error Envio', ['Error en reenvio de correo'], 'info', this.dialogService);
      },
        () => {
          if (this.ret.code === 0 && this.ret.code !== undefined) {
            this.loadings = false;
            this.messageService.cargando(this.loadings);
            this.myModalEmailInfo.close();

            // this.cleanResults();
            this.resultsEmailByOC = [];

            // search detail order
            console.log('recargar dropdown oc : ' + oc);
            if (agrupar === '1') {
              this.loadings = true;
              this.messageService.cargando(this.loadings);
              this.emailInfo.detailAllEmailByOC(oc).subscribe(
                resDetailAllEmailByOC => {
                  this.resultsEmailByOC = this.utils.validarRespuestaFormatear(resDetailAllEmailByOC);
                  // this.resultsEmailByOC = resDetailAllEmailByOC.message.replace(/\n/ig, '');
                  // this.resultsEmailByOC = JSON.parse(this.resultsEmailByOC.toString());
                  console.log(this.resultsEmailByOC);
                  this.loadings = false;
                  this.messageService.cargando(this.loadings);

                  if (this.resultsEmailByOC.length === 0) {
                    this.loadings = false;
                    this.messageService.cargando(this.loadings);

                    this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
                    // this.myModalEmailInfo.close();
                  }
                },
                err => {
                  this.loadings = false;
                  this.messageService.cargando(this.loadings);

                  console.log(err);
                  this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
                }
              );
            } else {
              this.loadings = true;
              this.messageService.cargando(this.loadings);
              this.emailInfo.detailEmailByOC(oc).subscribe(
                resDetailEmailByOC => {
                  this.resultsEmailByOC = this.utils.validarRespuestaFormatear(resDetailEmailByOC);
                  this.loadings = false;
                  this.messageService.cargando(this.loadings);
                  if (this.resultsEmailByOC.length === 0) {
                    this.loadings = false;
                    this.messageService.cargando(this.loadings);

                    this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
                    // this.myModalEmailInfo.close();
                  }
                },
                err => {
                  this.loadings = false;
                  this.messageService.cargando(this.loadings);

                  console.log(err);
                  this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
                }
              );
            }
            this.messageService.enviarMensaje('Email Envío', ['Se ha reenviado el correo exitosamente'], 'info', this.dialogService);
            // resolve();
          } else if (this.ret.code === 12) {
            this.messageService.cargando(false);
            this.messageService.enviarMensaje('Alerta', [this.ret.message], 'warn', this.dialogService);
            this.router.navigate(['/login']);
          } else {
            this.messageService.cargando(false);
            this.messageService.enviarMensaje('Error', ['Ha ocurrido un error al obtener parametros'], 'warn', this.dialogService);
          }
        }
      );
    // argumento '0' buscar agrupado, '1' todos
    /*this.emailInfo.forwardEmail(
      oc,
      endpoints,
      '1',
      emailType,
      orderType,
      idFailedEmail,
      this.usuario.idUser + ''
    );*/
  }

  validationEmail(email: any) {
    const EMAIL_REGEXP = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    if (EMAIL_REGEXP.test(email.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  validationOc(oc: any) {
    // tslint:disable-next-line:max-line-length
    const FACTOR_REGEXP = /^[0-9]{1,20}([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?$/;
    if (FACTOR_REGEXP.test(oc)) {
      return true;
    } else {
      return false;
    }
  }


  leadingZero(value) {
    if (value < 10) {
      return '0' + value.toString();
    }
    return value.toString();
  }

  doExport() {
    this.ws = XLSX.utils.aoa_to_sheet([['Búsqueda OC']]);

    XLSX.utils.sheet_add_json(this.ws, this.results, { origin: 1 });

    // workbook
    this.wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(this.wb, this.ws, 'Búsqueda OC');

    // XLSX file
    XLSX.writeFile(this.wb, 'Exportar.xlsx');
  }

  sortProperty(column) {
    this.currentColumn = this.orderProperty.slice(1);
    this.currentDirection = this.orderProperty.slice(0, 1);
    this.dir = '+';

    if (column === this.currentColumn) {
      this.dir = this.currentDirection === '+' ? '-' : '+';
    }
    this.orderProperty = this.dir + column;
  }

  sortPropertyDate(column) {
    // Si ya fue ordenado por date queda con el *
    if (this.orderProperty.slice(0, 1) === '*') {
      this.orderProperty = this.orderProperty.slice(1);
    }

    this.currentColumn = this.orderProperty.slice(1);
    this.currentDirection = this.orderProperty.slice(0, 1);
    this.dir = '+';

    if (column === this.currentColumn) {
      this.dir = this.currentDirection === '+' ? '-' : '+';
    }
    this.orderProperty = '*' + this.dir + column;
  }

  onlyNumberKey(event) {
    return event.charCode === 8 || event.charCode === 0 ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  skuValidator(event, sku) {
    alert(sku);

    return null;
  }

  cleanResults() {
    this.searchInfo.cleanResults();
    // sessionStorage.removeItem('resultadosBusqueda');
    this.results = null;
    this.resultsDetail = [];
    this.loadings = false;
    this.fechaCompraDesde = undefined;
    this.fechaCompraHasta = undefined;
    this.fechaEntregaDesde = undefined;
    this.fechaEntregaHasta = undefined;
    sessionStorage.removeItem('volverIc');
    sessionStorage.removeItem('volverEmail');
  }
}
