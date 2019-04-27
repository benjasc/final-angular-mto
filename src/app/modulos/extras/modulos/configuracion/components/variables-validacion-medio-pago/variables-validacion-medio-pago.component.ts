import { VariableMedioPagoService } from './../../service/variable-medio-pago.service';
import { TableConfigurationFull } from './../../../shared/util/tableContigurationFull.util';
import { MessageService } from './../../../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { VariablesMedioPago } from '../../vo/variablesMedioPago';

@Component({
  selector: 'app-variables-validacion-medio-pago',
  templateUrl: './variables-validacion-medio-pago.component.html',
  styleUrls: ['./variables-validacion-medio-pago.component.scss']
})
export class VariablesValidacionMedioPagoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('modalEditarValor') modalEditarValor;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  variables: VariablesMedioPago[] = [];

  valorAnterior: string;
  posicion: number;
  valorNuevo: string;
  mensaje: string;

  idRegla: string;

  constructor(public configTable: TableConfigurationFull, private variableService: VariableMedioPagoService,
    private messageService: MessageService, private dialogService: DialogService) {
    this.valorNuevo = '';
    this.mensaje = '';
    this.idRegla = '';
  }

  ngOnInit() {
    this.dtOptions = this.configTable.dtOptionsExport;
    this.variables = this.variableService.obtenerVariablesMedioPago();
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
    this.modalEditarValor.close();
    this.variableService.cambioEstadoVariableValidacion(idRegla, activo).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
        activo = !activo;
        this.variables[index].activo = activo;
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      }
    );
  }


  cambiarValor() {
    if (this.valorNuevo !== '' && this.valorNuevo !== undefined && this.valorNuevo !== null) {
    this.messageService.cargando(true);
    this.mensaje = '';
      this.modalEditarValor.close();
      this.variableService.cambioValorVariableValidacion(this.idRegla, this.valorNuevo).subscribe(
        response => {
          console.log(response);
          this.messageService.cargando(false);
          this.variables[this.posicion].valor = this.valorNuevo;
          console.log(this.valorNuevo);
        },
        err => {
          console.log(err.status);
          this.messageService.cargando(false);
          this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
        }
      );
    } else {
      this.mensaje = 'Debe ingresar un valor';
    }
  }

  editar(valoranterior: string, index: number, idRegla: string) {
    this.valorNuevo = '';
    this.valorAnterior = '';
    this.posicion = null;
    this.valorAnterior = valoranterior;
    this.posicion = index;
    this.idRegla = idRegla;
    console.log(this.valorAnterior);
    console.log(this.posicion);
    this.modalEditarValor.open();
  }

  cerrar() {
    this.mensaje = '';
    this.modalEditarValor.close();
  }

}
