import { MessageService } from './../../../../../shared/services/message.service';
import { MedioPagoService } from './../../services/medio-pago.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfiguration } from './../../../shared/util/tableContiguration.util';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-autorizar-medio-pago',
  templateUrl: './autorizar-medio-pago.component.html',
  styleUrls: ['./autorizar-medio-pago.component.scss']
})
export class AutorizarMedioPagoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  ordenes: any;
  ocSeleccionadas: any[];

  numeroNC: string;
  tipoDocumento: string;
  isVacio: boolean;

  constructor(private medioPagoService: MedioPagoService, public configTable: TableConfiguration,
    private messageService: MessageService, private dialogService: DialogService) {
    this.ocSeleccionadas = [];
    this.tipoDocumento = '0';
    this.numeroNC = '';
    this.isVacio = true;
  }

  ngOnInit() {
    this.dtOptions = this.configTable.dtOptionsExport;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  aprobar() {
    this.messageService.enviarMensaje('Aprobar Orden', ['Ordenes aprobadas con éxito'], 'info', this.dialogService);
    // this.refrescarTable();
    this.removerOcTabla();
    this.refrescarTable();
  }
  // aprobar() {
  //   this.messageService.cargando(true);
  //   if (this.ocSeleccionadas.length > 0) {
  //     console.log(this.ocSeleccionadas);
  //     this.medioPagoService.aprobarMedioPago(this.ocSeleccionadas).subscribe(
  //       response => {
  //         console.log(response);
  //         this.removerOcTabla();
  //            this.messageService.cargando(false);
  //         this.messageService.enviarMensaje('Aprobar Orden', ['Ordenes aprobadas con éxito'], 'info', this.dialogService);
  //       },
  //       err => {
  //         console.log(err.status);
  //         this.messageService.cargando(false);
  //         this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'error', this.dialogService);
  //       }
  //     );
  //   } else {
  //     console.log('vacio');
  //     this.messageService.cargando(false);
  //     this.messageService.enviarMensaje('Error', ['Debes Seleccionar al menos una oc'], 'error', this.dialogService);
  //   }
  // }
  rechazar() {
    this.messageService.cargando(true);
    this.messageService.enviarMensaje('Rechazar Orden', ['Ordenes rechazadas con éxito'], 'success', this.dialogService);
    this.removerOcTabla();
    this.refrescarTable();
    this.messageService.cargando(false);
  }
  // rechazar() {
  //   this.messageService.cargando(true);
  //   if (this.ocSeleccionadas.length > 0) {
  //     console.log(this.ocSeleccionadas);
  //     this.medioPagoService.reprobarMedioPago(this.ocSeleccionadas).subscribe(
  //       response => {
  //         console.log(response); // aqui hay que quitar la orden de la tabla
  //            this.removerOcTabla();
  //            this.refrescarTable();
  //            this.messageService.cargando(false);
  //         this.messageService.enviarMensaje('Rechazar Orden', ['Ordenes rechazadas con éxito'], 'success', this.dialogService);
  //       },
  //       err => {
  //         console.log(err.status);
  //         this.messageService.cargando(false);
  //         this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'error', this.dialogService);
  //       }
  //     );
  //   } else {
  //     console.log('vacio');
  //     this.messageService.cargando(false);
  //     this.messageService.enviarMensaje('Error', ['Debes Seleccionar al menos una oc'], 'error', this.dialogService);
  //   }
  // }

  buscar() {
    this.messageService.cargando(true);
    if ((this.numeroNC === '' || this.numeroNC === null || this.numeroNC === undefined) && this.tipoDocumento === '0') {
      console.log('busqueda sin filtro');
      this.ordenes = this.medioPagoService.obtenerOrdenes();
      this.refrescarTable(); // quitar cuando termine
      this.messageService.cargando(false);
      // .subscribe(
      //   response => {
      //     console.log(response);
      //     if (this.ordenes.length > 0) {
      //       this.ordenes.forEach(item => {
      //         if (item.seleccionado) {
      //           this.ocSeleccionadas.push(item);
      //           this.isVacio = false;
      //         }
      //       });
      //       this.refrescarTable();
      //       this.messageService.cargando(false);
      //     }
      //   },
      //   err => {
      //     console.log(err.status);
      //     this.messageService.cargando(false);
      //     this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      //   }
      // );
    } else {
      this.messageService.cargando(true);
      console.log('busqueda con filtro');
      this.ordenes = this.medioPagoService.obtenerOrden(this.numeroNC, this.tipoDocumento);
      this.messageService.cargando(false);
      // .subscribe(
      //   response => {
      //     console.log(response);
      //     if (this.ordenes.length > 0) {
      //       this.ordenes.forEach(item => {
      //         if (item.seleccionado) {
      //           this.ocSeleccionadas.push(item);
      //           this.isVacio = false;
      //         }
      //       });
      //       this.refrescarTable();
      //       this.messageService.cargando(false);
      //     }
      //   },
      //   err => {
      //     console.log('Error: ' + err.status);
      //     this.messageService.cargando(false);
      //     this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      //   }
      // );
    }
  }

  cambiarEstado(seleccionado, oc) {
    if (seleccionado) {
      this.isVacio = false;
      this.ocSeleccionadas.push(oc);
    } else {
      this.removerAtributos(this.ocSeleccionadas, oc);
      if (this.ocSeleccionadas.length > 0) {
        this.isVacio = false;
      } else {
        this.isVacio = true;
      }
    }
  }
  removerAtributos(array, item) {
    let i = array.indexOf(item);
    if (i !== -1) {
      array.splice(i, 1);
    }
  }

  removerOcTabla() {
    for (let i = 0; i < this.ocSeleccionadas.length; i++) {
      this.ordenes.forEach(orden => {
        if (orden === this.ocSeleccionadas[i]) {
          let index = this.ordenes.indexOf(orden);
          this.ordenes.splice(index, 1);
        }
      });
    }
    this.isVacio = true;
  }

  refrescarTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
