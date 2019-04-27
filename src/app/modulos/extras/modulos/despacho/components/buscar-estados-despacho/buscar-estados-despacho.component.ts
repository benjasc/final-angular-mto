import { MessageService } from './../../../../../shared/services/message.service';
import { Orden } from './../../../notaCredito/vo/orden';
import { TableConfigurationFull } from './../../../shared/util/tableContigurationFull.util';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-estados-despacho',
  templateUrl: './buscar-estados-despacho.component.html',
  styleUrls: ['./buscar-estados-despacho.component.scss']
})
export class BuscarEstadosDespachoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  numeroNC: string;
  numeroOC: string;
  orden: Orden;

  constructor(public configTable: TableConfigurationFull, private messageService: MessageService,
    private router: Router) {
      this.numeroNC = '';
      this.orden = null;
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

  buscar() {
    this.messageService.cargando(true);
    console.log('en buscar');
    // this.orden = this.notaCreditoService.obtenerNC(this.numeroOC);
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
  detalles(numeroOC: string, monto: string, codPais: string) {
    console.log(this.numeroOC);
    sessionStorage.setItem('numeroOC', numeroOC);
    sessionStorage.setItem('monto', monto);
    sessionStorage.setItem('codPais', codPais);
    this.router.navigate(['/detalleNC']);
  }
}
