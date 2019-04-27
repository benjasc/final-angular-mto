import { TableConfigurationFull } from './../../../shared/util/tableContigurationFull.util';
import { MessageService } from './../../../../../shared/services/message.service';
import { NotaCreditoService } from './../../services/nota-credito.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Orden } from '../../vo/orden';

@Component({
  selector: 'app-busqueda-listado-nc',
  templateUrl: './busqueda-listado-nc.component.html',
  styleUrls: ['./busqueda-listado-nc.component.scss']
})
export class BusquedaListadoNcComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  numeroOC: string;
  ordenes: Orden[];
  tipoDocumento: string;
  ret: any;
  orden: Orden;
  isValid: boolean;

  constructor(public configTable: TableConfigurationFull, private router: Router,
    private notaCreditoService: NotaCreditoService, private messageService: MessageService) {
    this.numeroOC = '';
    this.tipoDocumento = '0';
  }

  ngOnInit() {
    this.limpiarElementosSession();
    this.dtOptions = this.configTable.dtOptionsExport;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  buscar() {
    this.messageService.cargando(true);
    console.log('en buscar');
    this.orden = this.notaCreditoService.obtenerNC(this.numeroOC, this.tipoDocumento);
    if (this.orden !== null && this.orden !== undefined) {
      console.log(this.orden);
      this.messageService.cargando(false);
      this.detalles(this.orden.orden, this.orden.monto, this.orden.codPais);
    }
    // .subscribe(
    //   response => {
    //     console.log(response);
    // if (response.orden !== null && response.orden !== undefined) {
    //   this.orden = response.orden;
    //   console.log(this.ordenes);
    //   this.messageService.cargando(false);
    //   this.detalles(this.orden.orden, this.orden.monto, this.orden.codPais);
    // }
    //   },
    //   err => {
    //     console.log(err.status);
    //     this.messageService.cargando(false);
    //     this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
    //   }
    // );
  }

  listarTodos() {
    this.messageService.cargando(true);
    console.log('en listar todos');
    this.ordenes = this.notaCreditoService.obtenerListadoNC();
    this.messageService.cargando(false);
    this.refrescarTable();
    // .subscribe(
    //   response => {
    //     console.log(response);
    //     this.ordenes = response.ordenes;
    //     console.log(this.ordenes);
    //     this.messageService.cargando(false);
    //     this.refrescarTable();
    //   },
    //   err => {
    //     console.log(err.status);
    //     this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
    //   }
    // );
  }

  detalles(numeroOC: string, monto: string, codPais: string) {
    console.log(this.numeroOC);
    sessionStorage.setItem('numeroOC', numeroOC);
    sessionStorage.setItem('monto', monto);
    sessionStorage.setItem('codPais', codPais);
    this.router.navigate(['/detalleNC']);
  }

  limpiarElementosSession() {
    sessionStorage.removeItem('numeroOC');
    sessionStorage.removeItem('monto');
    sessionStorage.removeItem('pais');
  }

  refrescarTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  validarCampoOC() {
    console.log('entre');
    if (this.numeroOC !== null && this.numeroOC !== undefined && this.numeroOC !== '') {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
}
