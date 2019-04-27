import { MessageService } from './../../../../../shared/services/message.service';
import { TableConfig } from './../../../shared/util/tableConfig.util';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ClienteNC } from '../../vo/clienteNC';
import { RechazoStock } from '../../vo/rechazoStock';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-generar-ncmanual',
  templateUrl: './generar-ncmanual.component.html',
  styleUrls: ['./generar-ncmanual.component.scss']
})
export class GenerarNcmanualComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  oc: string;
  montoTotal: string;
  codPais: string;
  cliente: ClienteNC;
  rechazosTotalStock: RechazoStock[] = [];
  rechazosParcialStock: RechazoStock[] = [];
  rechazosParcialesElegidos: RechazoStock[] = [];

  numeroServiciosEnCarga: number;
  errores: boolean[] = [];
  isVisible: boolean;

  constructor(public configTable: TableConfig, private router: Router, private dialogService: DialogService,
    private messageService: MessageService, private notaCreditoService: NotaCreditoService) {
      this.cliente = new ClienteNC();
      this.numeroServiciosEnCarga = 1;
      this.isVisible = false;
  }

  ngOnInit() {
    // if (sessionStorage.getItem('numeroOC') === null || sessionStorage.getItem('numeroOC') === undefined) {
    //   this.limpiarElementosSession();
    //   this.router.navigate(['/buscarNC']);
    // } else {
      // this.messageService.cargando(true);
      this.oc = sessionStorage.getItem('numeroOC');
      this.montoTotal = sessionStorage.getItem('monto');
      this.codPais = sessionStorage.getItem('codPais');
      this.limpiarElementosSession();
      // servicios que traen datos requeridos
      this.obtenerDetalleCliente();
      this.obtenerDetalleRechazoStock();
      this.dtOptions = this.configTable.dtOptionsExport;
    // }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refrescarTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  limpiarElementosSession() {
    sessionStorage.removeItem('numeroOC');
    sessionStorage.removeItem('monto');
    sessionStorage.removeItem('pais');
  }

  volver() {
    this.router.navigate(['/buscarNC']);
  }

  obtenerDetalleCliente() {
    this.cliente = this.notaCreditoService.detalleClienteNC(this.oc);
  }
  // obtenerDetalleCliente() {
  //   this.notaCreditoService.detalleClienteNC(this.oc).subscribe(
  //     response => {
  //       console.log(response);
  //       this.cliente = response.cliente;
  //       this.refrescarTable();
  //       this.numeroServiciosEnCarga = this.validarCarga(this.numeroServiciosEnCarga, 4, false);
  //     },
  //     err => {
  //       console.log(err.status);
  //       this.numeroServiciosEnCarga = this.validarCarga(this.numeroServiciosEnCarga, 4, true);
  //     }
  //   );
  // }
  obtenerDetalleRechazoStock() {
    this.rechazosTotalStock = this.notaCreditoService.detalleRechazoStockNC(this.oc);
    this.rechazosParcialStock = this.rechazosTotalStock;
  }

  // obtenerDetalleRechazoStock() {
  //   this.notaCreditoService.detalleRechazoStockNC(this.oc).subscribe(
  //     response => {
  //       console.log(response);
  //       this.rechazosTotalStock = response.cliente;
  //       this.rechazosParcialStock = this.rechazosTotalStock;
  //       this.refrescarTable();
  //       this.numeroServiciosEnCarga = this.validarCarga(this.numeroServiciosEnCarga, 4, false);
  //     },
  //     err => {
  //       console.log(err.status);
  //       this.numeroServiciosEnCarga = this.validarCarga(this.numeroServiciosEnCarga, 4, true);
  //     }
  //   );
  // }

  validarCarga(numero: number, numeroDeMetodos: number, err: boolean) {
    this.errores[numero] = err;
    console.log('numero: ' + numero);
    console.log('numeroMetodos: ' + numeroDeMetodos);
    if (numero === numeroDeMetodos) {
      console.log('entro al if');
      this.messageService.cargando(false);
      let error = false;
      this.errores.forEach(element => {
        if (element) {
          console.log('entro a errores');
          error = true;
        }
      });
      if (error) {
        this.messageService.enviarMensaje('Error', ['Problema al Cargar la OC'], 'info', this.dialogService);
        // this.router.navigate(['/buscarNC']);
      }
    } else {
      numero = numero + 1;
      return numero;
    }
  }

  confirmarRechazosParciales() {
    this.messageService.cargando(true);
    this.rechazosParcialesElegidos = [];
    this.rechazosParcialStock.forEach(rechazos => {
        if (rechazos.isSelected) {
          this.rechazosParcialesElegidos.push(rechazos);
        }
    });
    console.log(this.rechazosParcialesElegidos);
    this.notaCreditoService.ingresarRechazoParcial(this.rechazosParcialesElegidos).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Mensaje', ['Se han confirmado los rechazos con éxito'], 'info', this.dialogService);
        this.router.navigate(['/buscarNC']);
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      }
    );
  }

  confirmarRechazoTotal() {
    this.messageService.cargando(true);
    console.log(this.rechazosTotalStock);
    this.notaCreditoService.ingresarRechazoTotal(this.rechazosTotalStock).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Mensaje', ['Se han confirmado los rechazos con éxito'], 'info', this.dialogService);
        this.router.navigate(['/buscarNC']);
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      }
    );
  }

  validarParcialesElegidas() {
    this.isVisible = false;
    this.rechazosParcialStock.forEach(rechazos => {
        if (rechazos.isSelected) {
          this.isVisible = true;
        }
    });
  }
}
