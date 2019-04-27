import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../vo/orden';
import { RechazoStock } from '../vo/rechazoStock';
import { map } from 'rxjs/operators';

@Injectable()
export class NotaCreditoService {
  apiUrl: string;
  metodo: string;
  ordenes: Orden[];
  cliente: any;
  despacho: any;
  compra: any;
  rechazo: any;

  constructor(public http: HttpClient) {
    this.metodo = '';
    this.apiUrl = '';
  }
  obtenerListadoNC() {
    console.log('en servicio obtener notas de credito');
    return this.ordenes = [
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1951', fechaDespacho: '13/02/1981', medioPago: 'Chirlitos', monto: '523500',sucursalRetiro: 'Parque Arauco' },
        { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1951', fechaDespacho: '13/02/1981', medioPago: 'Chirlitos', monto: '523500',sucursalRetiro: 'Parque Arauco' },
        { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1951', fechaDespacho: '13/02/1981', medioPago: 'Chirlitos', monto: '523500',sucursalRetiro: 'Parque Arauco' },
        { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1951', fechaDespacho: '13/02/1981', medioPago: 'Chirlitos', monto: '523500',sucursalRetiro: 'Parque Arauco' },
        { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1951', fechaDespacho: '13/02/1981', medioPago: 'Chirlitos', monto: '523500',sucursalRetiro: 'Parque Arauco' },
        { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1950', fechaDespacho: '13/02/1980', medioPago: 'T.Ripley', monto: '23400',sucursalRetiro: 'Las Condes' },
      { codPais: 'PE' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1955', fechaDespacho: '13/02/1983', medioPago: 'Credito', monto: '232500',sucursalRetiro: 'La Florida' },
      { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' }
    ];
    // this.metodo = '/getListadoNC';
    // return this.http.get(this.apiUrl + this.metodo).pipe(map(res => res));
  }
  obtenerNC(numeroOC: string, tipoDocumento ) {
    console.log('en servicio obtener nota de credito');
    return { codPais: 'CL' , orden: '6533', notaCredito: '1221', rutCliente: '16266952-4', fecha: '13/02/1900',
        fechaRechazo: '13/02/1954', fechaDespacho: '13/02/1982', medioPago: 'Debito', monto: '123500',sucursalRetiro: 'Su Casa' };
    // this.metodo = '/getNC';
    // return this.http.post(this.metodo, {
    //   'numeroOC': numeroOC,
    //   'tipoDocumento': tipoDocumento
    // }, ).pipe(map(res => res));
  }

 // Inicio Datos detalle oc
 detalleClienteNC(numeroOC: string) {
  return this.cliente = {
    correlativoVentas: '12133', rutCliente: '16266952-4', nombreCliente: 'Esteban Lizana', mailCliente: 'elizana@aligare.cl',
    tipoDocumento: 'Boleta', tipoOrden: 'Impresa', direccion: 'grevillea 13839', telefonoDespacho: '2122323', telefonoCliente: '1211212'
  };
}
  // detalleClienteNC(numeroOC: string) {
  //   console.log('en servicio obtener detalle cliente');
  //   this.metodo = '/getClienteNC';
  //   return this.http.post(this.metodo, {
  //     'numeroOC': numeroOC
  //   }, ).pipe(map(res => res));
  // }

  detalleDespachoNC(numeroOC: string) {
   return this.despacho = [
      {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
        {rutDespacho: '1234321-ñ', nombreDespacho: 'nombre del despacho', sku: '343212343999', estadoBT: 'OK', direccion: 'grevillea',
        codBO: '212', region: 'metropolitana', comuna: 'La Pintana', cud: '444321'},
    ];
  }
  // detalleDespachoNC(numeroOC: string) {
  //   console.log('en servicio obtener despacho cliente');
  //   this.metodo = '/getDespachoNC';
  //   return this.http.post(this.metodo, {
  //     'numeroOC': numeroOC
  //   }, ).pipe(map(res => res));
  // }
  detalleCompraNC(numeroOC: string) {
    return this.compra = [
      {montoCar: '121', cuotas: '12', primerVencimiento: '12/03/1029', valorCuota: '230.000', montoTre: '12.000', webpay: 'si',
       glosaGsic: 'glosa', descripcion: 'pagando el auto'},
       {montoCar: '121', cuotas: '12', primerVencimiento: '12/03/1029', valorCuota: '230.000', montoTre: '12.000', webpay: 'si',
       glosaGsic: 'glosa', descripcion: 'pagando el auto'},
       {montoCar: '121', cuotas: '12', primerVencimiento: '12/03/1029', valorCuota: '230.000', montoTre: '12.000', webpay: 'si',
       glosaGsic: 'glosa', descripcion: 'pagando el auto'},
       {montoCar: '121', cuotas: '12', primerVencimiento: '12/03/1029', valorCuota: '230.000', montoTre: '12.000', webpay: 'si',
       glosaGsic: 'glosa', descripcion: 'pagando el auto'},
       {montoCar: '121', cuotas: '12', primerVencimiento: '12/03/1029', valorCuota: '230.000', montoTre: '12.000', webpay: 'si',
       glosaGsic: 'glosa', descripcion: 'pagando el auto'}
    ];
  }
  detalleCompra(numeroOC: string) {
    return this.compra = [
      {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'},
       {sku: '121999', precio: '120.000', unidad: '2', descuento: '45.000', total: '512.000', despacho: 'No',
       fonoDespacho: '21321232', codBoleta: '131'}
    ];
  }
  // detalleCompraNC(numeroOC: string) {
  //   console.log('en servicio obtener compra cliente');
  //   this.metodo = '/getCompraNC';
  //   return this.http.post(this.metodo, {
  //     'numeroOC': numeroOC
  //   }, ).pipe(map(res => res));
  // }
  detalleRechazoStockNC(numeroOC: string) {
   return this.rechazo = [
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'},
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'},
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'},
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'},
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'},
    {isSelected: false, sku: '34329999', descripcion: 'soy una descripcion', precioUnitario: '1590', cantidad: '2', cantidadNC: '32'}
   ];
  }
  // detalleRechazoStockNC(numeroOC: string) {
  //   console.log('en servicio obtener rechazo cliente');
  //   this.metodo = '/getRechazoNC';
  //   return this.http.post(this.metodo, {
  //     'numeroOC': numeroOC
  //   }, ).pipe(map(res => res));
  // }
  // Fin Datos detalle oc

  ingresarRechazoTotal(rechazoTotal: RechazoStock[]) {
    console.log('en servicio ingresar Rechazo Total');
    this.metodo = '/ingresarRechazoTotal';
    return this.http.post(this.metodo, {
      'rechazoTotal': rechazoTotal
    }, ).pipe(map(res => res));
  }

  ingresarRechazoParcial(rechazoTotal: RechazoStock[]) {
    console.log('en servicio ingresar Rechazo Total');
    this.metodo = '/ingresarRechazoTotal';
    return this.http.post(this.metodo, {
      'rechazoTotal': rechazoTotal
    }, ).pipe(map(res => res));
  }

  generarNotaCreditoDevolucionDebito(oc: string, numeroTicket: string) {
    console.log('en servicio generar nota credito devolucion debito');
    this.metodo = '/ingresarRechazoTotal';
    return this.http.post(this.metodo, {
      'oc': oc,
      'numeroTicket': numeroTicket
    }, ).pipe(map(res => res));
  }
}
