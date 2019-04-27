import { MessageService } from './../../../../../shared/services/message.service';
import { SapService } from './../../services/sap-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-generar-acreedor-sap',
  templateUrl: './generar-acreedor-sap.component.html',
  styleUrls: ['./generar-acreedor-sap.component.scss']
})
export class GenerarAcreedorSapComponent implements OnInit {

  titulo: string;
  numeroOC: string;

  form: FormGroup;

  rut: string;
  nombre: string;
  calle: string;
  distrito: string;
  region: string;
  mail: string;
  telefono: string;
  telefax: string;
  telex: string;
  titularCuenta: string;
  cuentaBancaria: string;
  banco: string;

  regiones: any;
  bancos: any;

  isValidRegion: boolean;
  isValidBanco: boolean;

  constructor(private sapService: SapService, private messageService: MessageService, private dialogService: DialogService) {
    this.rut = '';
    this.nombre = '';
    this.calle = '';
    this.distrito = '';
    this.region = '0';
    this.mail = '';
    this.telefono = '';
    this.telefax = '';
    this.telex = '';
    this.titularCuenta = '';
    this.cuentaBancaria = '';
    this.banco = '0';
    this.isValidBanco = false;
    this.isValidRegion = false;
    this.regiones = [
      { nombre: 'Metropolitana de Santiago', valor: '1' },
      { nombre: 'Arica y Parinacota', valor: '2' },
      { nombre: 'Tarapacá', valor: '3' },
      { nombre: 'Antofagasta', valor: '4' },
      { nombre: 'Atacama', valor: '5' },
      { nombre: 'Coquimbo', valor: '6' },
      { nombre: 'Valparaíso', valor: '7' },
      { nombre: 'Libertador Gral. Bernardo O\'Higgins', valor: '8' },
      { nombre: 'Maule', valor: '9' },
      { nombre: 'BioBío', valor: '10' },
      { nombre: 'La Araucanía', valor: '11' },
      { nombre: 'Los Ríos', valor: '12' },
      { nombre: 'Aysén del Gral. Carlos Ibáñez del Campo', valor: '13' },
      { nombre: 'Magallanes y de la Antártica Chilena', valor: '14' }
    ];
    this.bancos = [
      { nombre: 'Santander', valor: '1' },
      { nombre: 'Bci', valor: '2' },
      { nombre: 'Estado', valor: '3' },
      { nombre: 'Chile', valor: '4' }
    ];

    this.form = new FormGroup({
      'rut': new FormControl(''),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      'calle': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      'distrito': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      'mail': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email]),
      'telefono': new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]),
      'titularCuenta': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      'cuentaBancaria': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      'banco': new FormControl(''),
      'region': new FormControl(''),
      'telefax': new FormControl(''),
      'telex': new FormControl('')
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('modificar') === 'true') {
      this.obtenerAcreedorSap();
      sessionStorage.removeItem('modificar');
    }
    // this.numeroOC = sessionStorage.getItem('oc');
    // this.titulo =   sessionStorage.getItem('titulo');
  }

  cancelar() {
    console.log('cancelar');
  }

  validBanco() {
    this.isValidBanco = this.banco !== '0' ? this.isValidBanco = true : this.isValidBanco = false;
    console.log(this.isValidBanco);
  }

  validRegion() {
    this.isValidRegion = this.region !== '0' ? this.isValidRegion = true : this.isValidRegion = false;
    console.log(this.isValidRegion);
  }

  obtenerRutSinFormato(ev) {
    if (ev !== '' && ev !== undefined) {
      this.rut = ev;
      console.log(this.rut);
    } else {
      this.rut = '';
    }
  }

  crearAcreedorSap() {
    this.messageService.cargando(true);
    this.sapService.crearAcreedorSap(this.rut, this.nombre, this.distrito, this.region, this.mail, this.telefono,
      this.telefax, this.telex, this.titularCuenta, this.banco, this.cuentaBancaria).subscribe(
        response => {
          console.log(response);
          this.messageService.cargando(false);
        },
        err => {
          console.log(err.status);
          this.messageService.cargando(false);
          this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
        }
      );
  }

  obtenerAcreedorSap() {
    this.messageService.cargando(true);
    this.sapService.obtenerAcreedorSap(this.numeroOC).subscribe( // lo que pida sap
      response => {
        console.log(response);
        this.messageService.cargando(false);
        // agregar los datos devueltos por sap
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      }
    );
  }
}
