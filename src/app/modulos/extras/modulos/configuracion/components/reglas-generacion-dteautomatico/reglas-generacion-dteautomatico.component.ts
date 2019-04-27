import { ReglasDteAutomaticaService } from './../../service/reglas-dte-automatica.service';
import { MessageService } from './../../../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglas-generacion-dteautomatico',
  templateUrl: './reglas-generacion-dteautomatico.component.html',
  styleUrls: ['./reglas-generacion-dteautomatico.component.scss']
})
export class ReglasGeneracionDteautomaticoComponent implements OnInit {

  @ViewChild('modalEditarValor') modalEditarValor;
  valorNuevo: string;
  reglaPrecio: boolean;
  listasSKU: boolean;
  todoManual: boolean;
  mensaje: string;

  constructor(private router: Router, private reglasDteService: ReglasDteAutomaticaService,
    private messageService: MessageService, private dialogService: DialogService) {
    this.valorNuevo = '';
    this.reglaPrecio = true;
    this.listasSKU = false;
    this.todoManual = true;
    this.mensaje = '';
  }

  ngOnInit() {
    this.obtenerFactor();
  }

  abrirModalEditar() {
    this.modalEditarValor.open();
  }

  cambiarValor() {
    this.mensaje = '';
    if (this.valorNuevo !== '' && this.valorNuevo !== undefined && this.valorNuevo !== null) {
      // this.variables[this.posicion].valor = this.valorNuevo;
      console.log(this.valorNuevo);
      this.messageService.cargando(true);
      this.reglasDteService.editarFactor(this.valorNuevo).subscribe(
        response => {
          console.log(response);
          this.messageService.cargando(false);
          this.messageService.enviarMensaje('Mensaje', ['Se ha cambiado el valor con éxito'], 'success', this.dialogService);
        },
        err => {
          console.log(err.status);
          this.valorNuevo = '';
          this.messageService.cargando(false);
          this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'error', this.dialogService);
        }
      );
      this.modalEditarValor.close();
    } else {
      this.mensaje = 'Debe ingresar un valor';
    }
  }

  obtenerFactor() {
    this.messageService.cargando(true);
    this.reglasDteService.obtenerFactor().subscribe(
      response => {
        console.log(response);
        this.valorNuevo = response.toString();
        this.messageService.cargando(false);
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error', ['Error obteniendo factor'], 'error', this.dialogService);
      }
    );
  }

  cerrar() {
    this.mensaje = '';
    this.modalEditarValor.close();
  }

  paginaModificar() {
    this.router.navigate(['/aprobacionManual']);
  }

}
