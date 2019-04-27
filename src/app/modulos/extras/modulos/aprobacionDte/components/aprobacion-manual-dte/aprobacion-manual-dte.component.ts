import { FechaUtil } from './../../../shared/util/fechaUtils';
import { DialogService } from 'ng2-bootstrap-modal';
import { AprobacionManualService } from './../../services/aprobacion-manual.service';
import { Producto } from './../../vo/producto';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfigurationFull } from './../../../shared/util/tableContigurationFull.util';
import { Router } from '@angular/router';
import { MessageService } from '../../../../../shared/services/message.service';
import { FileUtil } from './../../../shared/util/fileUtils';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aprobacion-manual-dte',
  templateUrl: './aprobacion-manual-dte.component.html',
  styleUrls: ['./aprobacion-manual-dte.component.scss']
})
export class AprobacionManualDteComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('modalAgregarSku') modalAgregarSku;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  productos: Producto[] = [];
  mensaje: string;
  sku: string;
  util: FileUtil;
  producto: Producto;
  fecha: Date;
  fechaUtil: FechaUtil;

  constructor(public configTable: TableConfigurationFull, private router: Router, private messageService: MessageService,
    private aprobacionManualService: AprobacionManualService, private dialogService: DialogService) {
      this.fechaUtil = new FechaUtil();
      this.mensaje = '';
      this.sku = '';
      this.util = new FileUtil();
      this.util.carga = false;
      this.fecha = new Date();
      this.producto = new Producto();
      this.producto.sku = '1234';
      this.producto.descripcion = 'holaNombre';
      this.producto.ingresadoPor = 'usuarioDescripcion';
      this.producto.fechaIngreso = this.fechaUtil.formatearFecha(this.fecha);
      this.productos.push(this.producto);
   }

  ngOnInit() {
    this.dtOptions = this.configTable.dtOptionsExport;
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

  abrirModal() {
    this.modalAgregarSku.open();
  }

  cambiarValor() {
    this.mensaje = '';
    if (this.sku === '0') {
      this.mensaje = 'El valor ingresado no puede ser cero';
    } else if (this.sku !== '' && this.sku !== undefined && this.sku !== null) {
      // this.variables[this.posicion].valor = this.valorNuevo;
      this.modalAgregarSku.close();
      this.obtenerDescripcionPorSku();
    } else {
      this.mensaje = 'Debe ingresar un valor';
    }
  }

  cerrar() {
    this.mensaje = '';
    this.modalAgregarSku.close();
  }

  volver() {
    this.router.navigate(['/DteAutomatica']);
  }

  changeListener($event): void {
    this.util = new FileUtil();
    this.util.carga = false;
    this.util.readFile($event.target);
    console.log(this.util);
    this.enviarArchivo();
  }

  enviarArchivo() {
    this.messageService.cargando(true);
    this.aprobacionManualService.enviarArchivoListadoSku(this.util).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Mensaje', ['Archivo enviado con éxito'], 'success', this.dialogService);
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error', ['Error al enviar archivo'], 'error', this.dialogService);
      }
    );
  }

  obtenerDescripcionPorSku() {
    this.messageService.cargando(true);
    this.aprobacionManualService.obtenerDescripcionPorSku(this.sku).subscribe(
      response => {
        console.log(response);
        this.producto.sku = this.sku;
        this.producto.descripcion = response.toString();
        this.producto.ingresadoPor = sessionStorage.getItem('usuario');
        this.messageService.cargando(false);
        this.productos.push(this.producto);
        this.producto = null;
        this.sku = '';
      },
      err => {
        console.log(err.status);
        this.producto = null;
        this.sku = '';
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error', ['Error al enviar archivo'], 'error', this.dialogService);
      }
    );
  }
}
