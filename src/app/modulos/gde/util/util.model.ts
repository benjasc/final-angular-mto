export const DummyServices = {
  // Emision Unitario de GDE
  arrayGDEUnitaria: [
     {isSelected: false, modeloDespacho: 'despacho', estadoCDU: 'habilitado', motivoCDU: 'motivo', estadoMotivoReserva: 'activo',
      cud: 13123, ubicacion: 'RM', sku: 3213123,     descripcionSKU: 'Venta', region: 'RM', comuna: 'Puente Alto',
      direccionDespacho: 'Huerfanos', nBoleta: 6453253, cantidad: 123123, sucursalVenta: 'Puente Alto', sucursalStock: 'Puente Alto'},
     {isSelected: false, modeloDespacho: 'despacho', estadoCDU: 'habilitado', motivoCDU: 'motivo', estadoMotivoReserva: 'activo',
     cud: 13123, ubicacion: 'RM', sku: 3213123, descripcionSKU: 'Venta', region: 'RM', comuna: 'Puente Alto',
     direccionDespacho: 'Huerfanos', nBoleta: 6453253, cantidad: 123123, sucursalVenta: 'Puente Alto', sucursalStock: 'Puente Alto'},
     {isSelected: false, modeloDespacho: 'despacho', estadoCDU: 'habilitado', motivoCDU: 'motivo', estadoMotivoReserva: 'activo',
     cud: 13123, ubicacion: 'RM', sku: 3213123, descripcionSKU: 'Venta', region: 'RM', comuna: 'Puente Alto',
     direccionDespacho: 'Huerfanos', nBoleta: 6453253, cantidad: 123123, sucursalVenta: 'Puente Alto', sucursalStock: 'Puente Alto'},
     {isSelected: false, modeloDespacho: 'despacho', estadoCDU: 'habilitado', motivoCDU: 'motivo', estadoMotivoReserva: 'activo',
     cud: 13123, ubicacion: 'RM', sku: 3213123, descripcionSKU: 'Venta', region: 'RM', comuna: 'Puente Alto',
     direccionDespacho: 'Huerfanos', nBoleta: 6453253, cantidad: 123123, sucursalVenta: 'Puente Alto', sucursalStock: 'Puente Alto',},
     {isSelected: false, modeloDespacho: 'despacho', estadoCDU: 'habilitado', motivoCDU: 'motivo', estadoMotivoReserva: 'activo',
     cud: 13123, ubicacion: 'RM', sku: 3213123, descripcionSKU: 'Venta', region: 'RM', comuna: 'Puente Alto',
     direccionDespacho: 'Huerfanos', nBoleta: 6453253, cantidad: 123123, sucursalVenta: 'Puente Alto', sucursalStock: 'Puente Alto'},
  ],

  arrayConductor:  [
    { nombre: 'Pedro', rut: '11.111.111-1' },
    { nombre: 'Juan', rut: '22.222.222-2' },
    { nombre: 'Diego', rut: '33.333.333-3' },
    { nombre: 'Pablo', rut: '44.444.444-4' },
    { nombre: 'Andres', rut: '55.555.555-5' }
  ],

  arrayEmpresaTransportista:  [
    {direccion: 'Huerfanos', razonSocial: 'Camiones 1', rutEmpresa: '1.111.111-1'},
    {direccion: 'Banderas', razonSocial: 'Camiones 2', rutEmpresa: '11.111.111-1'},
    {direccion: 'Alameda', razonSocial: 'Camiones 3', rutEmpresa: '22.222.222-2'},
    {direccion: 'Providencia', razonSocial: 'Camiones 4', rutEmpresa: '33.333.333-3'}
  ],

  arrayCamiones: [
    {patente: 'SASA21', cubicaje: 12312312, descripcion: 'camion', informBeetrack: false , sucDespacho: 'camion'},
    {patente: 'FVAE12', cubicaje: 123123, descripcion: 'camion', informBeetrack: false , sucDespacho: 'camion'},
    {patente: 'QSAD32', cubicaje: 12312312, descripcion: 'camion', informBeetrack: false , sucDespacho: 'camion'},
    {patente: 'DEQA21', cubicaje: 12312312, descripcion: 'camion', informBeetrack: false , sucDespacho: 'camion'}
  ],

  // Emision masiva de GDE
  arrayGuiasMasivas: [
    {isSelectedMasivo: false, manifiesto: 52416242, cantidadCUD: 1, cantidadBultos: 1},
    {isSelectedMasivo: false, manifiesto: 63616302, cantidadCUD: 2, cantidadBultos: 2},
    {isSelectedMasivo: false, manifiesto: 16235291, cantidadCUD: 1, cantidadBultos: 1},
    {isSelectedMasivo: false, manifiesto: 52416242, cantidadCUD: 1, cantidadBultos: 1},
    {isSelectedMasivo: false, manifiesto: 63616302, cantidadCUD: 2, cantidadBultos: 2},
    {isSelectedMasivo: false, manifiesto: 16235291, cantidadCUD: 1, cantidadBultos: 1}
  ],

  // Detalle emision masiva de GDE

  arrayDetalleMasivoGde: [
    {isSelectGuiaDespacho: true, region: 'RM', nombreCliente: 'Jhon', rutDespacho: '11.111.111-1', motivoCud: 'transferencia',
     descripcionSKU: 'sku', comuna: 'Santiago Centro', rutCliente: '22.222.222-2', boletaNOC: 123, nCarga: 321,
     direccionDespacho: 'Alameda 123', nombreDespacho: 'despacho 1', estadoCud: 'cerrado', sku: 123123123},
    {isSelectGuiaDespacho: true, region: 'Bio Bio', nombreCliente: 'Juan', rutDespacho: '11.111.111-1', motivoCud: 'devolucion',
     descripcionSKU: 'sku', comuna: 'Talcahuano', rutCliente: '22.222.222-2', boletaNOC: 123, nCarga: 321,
     direccionDespacho: 'Alameda 123', nombreDespacho: 'despacho 1', estadoCud: 'cerrado', sku: 123123123},
    {isSelectGuiaDespacho: true, region: 'RM', nombreCliente: 'Jean', rutDespacho: '11.111.111-1', motivoCud: 'despacho',
     descripcionSKU: 'sku', comuna: 'San Miguel', rutCliente: '22.222.222-2', boletaNOC: 123, nCarga: 321,
     direccionDespacho: 'Alameda 123', nombreDespacho: 'despacho 1', estadoCud: 'cerrado', sku: 123123123}
  ],

  // Guias de despacho para la reimpresión
  arrayGuiasDespachoReemplazo: [
    {isSelected: false, nGuia: 123212, fecha: '11-03-2019'},
    {isSelected: false, nGuia: 543422, fecha: '12-03-2019'},
    {isSelected: false, nGuia: 678656, fecha: '13-03-2019'},
    {isSelected: false, nGuia: 345345, fecha: '14-03-2019'},
    {isSelected: false, nGuia: 765644, fecha: '15-03-2019'}
  ],

  // Guias de transferencia y detalle guia de transferencia
  arrayGuiaTransferencia: [
    {isSelected: false, sucursalOrigen: 'Redex', codigoDestino: 12, descripcionDestino: 'Bodega Arauco Maipu',
     codigoManifiesto: 123, cantidadCud: 1, bultos: 1},
    {isSelected: false, sucursalOrigen: 'Redex', codigoDestino: 12, descripcionDestino: 'Bodega Arauco Maipu',
     codigoManifiesto: 123, cantidadCud: 1, bultos: 1},
    {isSelected: false, sucursalOrigen: 'Redex', codigoDestino: 12, descripcionDestino: 'Bodega Arauco Maipu',
     codigoManifiesto: 123, cantidadCud: 1, bultos: 1},
    {isSelected: false, sucursalOrigen: 'Redex', codigoDestino: 12, descripcionDestino: 'Bodega Arauco Maipu',
     codigoManifiesto: 123, cantidadCud: 1, bultos: 1},

  ],
  arrayDetalleGuiaTransferencia: [
    {rutCliente: '11.111.111-1', cantidad: 2, sucursalDespacho: 'Huerfanos', nDespachoManifiesto: 7293, sku: 938498201,
     cud: 847193284, region: 'RM', comuna: 'Santiago Centro', descripcionSku: 'Venta', estado: 'Habilitado'},
    {rutCliente: '11.111.111-1', cantidad: 2, sucursalDespacho: 'Huerfanos', nDespachoManifiesto: 7293, sku: 938498201,
     cud: 847193284, region: 'RM', comuna: 'Santiago Centro', descripcionSku: 'Venta', estado: 'Habilitado'},
    {rutCliente: '11.111.111-1', cantidad: 2, sucursalDespacho: 'Huerfanos', nDespachoManifiesto: 7293, sku: 938498201,
     cud: 847193284, region: 'RM', comuna: 'Santiago Centro', descripcionSku: 'Venta', estado: 'Habilitado'},
    {rutCliente: '11.111.111-1', cantidad: 2, sucursalDespacho: 'Huerfanos', nDespachoManifiesto: 7293, sku: 938498201,
     cud: 847193284, region: 'RM', comuna: 'Santiago Centro', descripcionSku: 'Venta', estado: 'Habilitado'},
    {rutCliente: '11.111.111-1', cantidad: 2, sucursalDespacho: 'Huerfanos', nDespachoManifiesto: 7293, sku: 938498201,
     cud: 847193284, region: 'RM', comuna: 'Santiago Centro', descripcionSku: 'Venta', estado: 'Habilitado'}
  ],

  // Guia de retiro
  arrayGuiaRetiro: [
    {isSelected: false, guiaDespacho: 84739212, transporte: 'Transporte A', conductor: 'Jhon Smith'},
    {isSelected: false, guiaDespacho: 78548562, transporte: 'Transporte B', conductor: 'Chuck Norris'},
  ]
};
