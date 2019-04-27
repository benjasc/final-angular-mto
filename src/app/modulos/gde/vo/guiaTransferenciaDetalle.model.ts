export class GuiaTransferenciaDetalleModel {
  public rutCliente: String;
  public cantidad: Number;
  public sucursalDespacho: String;
  public nDespachoManifiesto: Number;
  public sku: Number;
  public descripcionSku: String;
  public cud: Number;
  public region: String;
  public comuna: String;
  public estado: String;

  constructor() {
    this.rutCliente = undefined;
    this.cantidad = 0;
    this.sucursalDespacho = undefined;
    this.nDespachoManifiesto = 0;
    this.cud = 0;
    this.region = undefined;
    this.comuna = undefined;
    this.descripcionSku = undefined;
    this.estado = undefined;
  }
}
