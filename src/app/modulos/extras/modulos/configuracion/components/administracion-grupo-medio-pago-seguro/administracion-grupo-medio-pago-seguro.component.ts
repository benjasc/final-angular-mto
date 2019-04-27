import { TableConfigurationFull } from './../../../shared/util/tableContigurationFull.util';
import { GrupoReglasPagoSeguroService } from './../../service/grupo-reglas-pago-seguro.service';
import { MessageService } from './../../../../../shared/services/message.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GruposMedioPago } from '../../vo/gruposMedioPago';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-administracion-grupo-medio-pago-seguro',
  templateUrl: './administracion-grupo-medio-pago-seguro.component.html',
  styleUrls: ['./administracion-grupo-medio-pago-seguro.component.scss']
})
export class AdministracionGrupoMedioPagoSeguroComponent implements OnInit , OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('modalEditarValor') modalEditarValor;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  grupos: GruposMedioPago[] = [];

  constructor( public configTable: TableConfigurationFull, private grupoService: GrupoReglasPagoSeguroService,
       private messageService: MessageService, private dialogService: DialogService) {
    // this.grupos = new GruposMedioPago();
  }

   ngOnInit() {
    this.dtOptions = this.configTable.dtOptionsExport;
    this.grupos = this.grupoService.obtenerGrupos();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  cambiarEstado(activo: boolean, index: number, idGrupo: string) {
    this.cambiarEstadoEnviar(idGrupo, activo, index);
  }

  refrescarTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  cambiarEstadoEnviar(idRegla: string, activo: boolean, index: number) {
    this.messageService.cargando(true);
    this.grupoService.cambioEstadoVariableValidacion(idRegla, activo).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
        activo = !activo;
        this.grupos[index].activo = activo;
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'error', this.dialogService);
      }
    );
  }

}
