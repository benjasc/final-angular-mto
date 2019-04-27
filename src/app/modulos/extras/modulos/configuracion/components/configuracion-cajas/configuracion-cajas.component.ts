import { MessageService } from './../../../../../shared/services/message.service';
import { ConfCajaService } from './../../service/conf-caja.service';
import { Sucursal } from './../../vo/sucursal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Caja } from '../../vo/caja';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-configuracion-cajas',
  templateUrl: './configuracion-cajas.component.html',
  styleUrls: ['./configuracion-cajas.component.scss']
})
export class ConfiguracionCajasComponent implements OnInit {

  @ViewChild('modalAgregarConfiguracion') modalAgregarConfiguracion;

  sucursales: Sucursal[] = [];
  sucursalSeleccionada: Sucursal = new Sucursal();
  cajas: Caja[] = [];
  cajaSeleccionada: Caja = new Caja();
  nombreSucursal: string;
  nombreCaja: string;
  horarioCierreFinal: string;
  horarioActivo: boolean;
  validaciones: boolean;
  cierreParcial: string;

  constructor(private confCajaService: ConfCajaService, private messageService: MessageService, private dialogService: DialogService) {
    this.nombreSucursal = '';
    this.nombreCaja = '';
    this.horarioCierreFinal = '';
    this.horarioActivo = false;
    this.validaciones = false;
  }

  ngOnInit() {
    this.obtenerSucursales();
  }

  abrirModal() {
    this.modalAgregarConfiguracion.open();
  }

  cerrar() {
    // this.mensaje = '';
    this.modalAgregarConfiguracion.close();
  }


  cambiaSucursal() {
    console.log(this.nombreSucursal);
    if (this.nombreSucursal === '0') {
      this.cajaSeleccionada = null;
      this.horarioCierreFinal = '';
      this.horarioActivo = false;
      this.validaciones = false;
      this.cajas = null;
    } else {
      this.nombreCaja = '0';
      this.cajaSeleccionada = null;
      this.horarioCierreFinal = '';
      this.horarioActivo = false;
      this.validaciones = false;
      this.cajas = null;
      this.sucursales.forEach(sucursal => {
        if (sucursal.nombre === this.nombreSucursal) {
          this.sucursalSeleccionada = sucursal;
        }
      });
      this.cajas = this.sucursalSeleccionada.cajas;
    }
  }

  cambiaCaja() {
    if (this.nombreCaja === '0') {
      this.cajaSeleccionada = null;
      this.horarioCierreFinal = '';
      this.horarioActivo = false;
      this.validaciones = false;
    } else {
      this.cajas.forEach(caja => {
        if (caja.nombre === this.nombreCaja) {
          this.cajaSeleccionada = caja;
        }
      });
      this.horarioCierreFinal = this.cajaSeleccionada.horarioCierreFinal;
      this.horarioActivo = true;
      this.validaciones = true;
    }
  }

  // obtenerSucursales() {
  //   this.messageService.cargando(true);
  //   this.confCajaService.obtenerConfiguracionesCaja().subscribe(
  //     response => {
  //       console.log(response);
  //       this.sucursales = response;
  //       this.messageService.cargando(false);
  //     },
  //     err => {
  //       console.log(err.status);
  //       this.messageService.cargando(false);
  //       this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
  //     }
  //   );
  // }

  obtenerSucursales() {
    this.sucursales = this.confCajaService.obtenerConfiguracionesCaja();
  }

  validarHorarioCierre() {
    console.log('entro');
    console.log(this.horarioCierreFinal);
    if (this.horarioCierreFinal === '' || this.horarioCierreFinal === undefined || this.horarioCierreFinal === null) {
      this.validaciones = false;
    } else {
      this.validaciones = true;
    }
  }

  agregarCierrePacial() {
    if (this.cierreParcial >= this.horarioCierreFinal) {
      this.messageService.enviarMensaje('Advertencia', ['El cierre parcial no debe ser mayor que el final'], 'warn', this.dialogService);
    } else {
      let cierresIguales = false;
      this.cajaSeleccionada.horarioCierreParcial.forEach(item => {
        if (this.cierreParcial === item) {
          cierresIguales = true;
        }
      });
      if (cierresIguales) {
        this.messageService.enviarMensaje('Advertencia', ['El cierre parcial no debe ser igual a otro cierre parcial'],
          'warn', this.dialogService);
      } else {
        this.cajaSeleccionada.horarioCierreParcial.push(this.cierreParcial);
        this.modalAgregarConfiguracion.close();
      }
    }
  }

  eliminarCierreParcial(index) {
    console.log(index);
    this.cajaSeleccionada.horarioCierreParcial.splice(index, 1);
  }

  guardarSucursal() {
    this.messageService.cargando(true);
    this.confCajaService.enviarConfiguracionCaja(this.nombreSucursal, this.nombreCaja,
      this.cajaSeleccionada.horarioCierreParcial, this.horarioCierreFinal)
      .subscribe(
        response => {
          console.log(response);
          this.messageService.cargando(false);
        },
        err => {
          console.log(err.status);
          this.messageService.cargando(false);
          this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'danger', this.dialogService);
        }
      );
  }
}
