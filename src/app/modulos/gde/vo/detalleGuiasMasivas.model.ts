export class DetalleGuiasMasivosModel {
  public isSelectGuiaDespacho: Boolean;
  public region: String;
  public nombreCliente: String;
  public rutDespacho: String;
  public motivoCud: String;
  public descripcionSKU: String;
  public comuna: String;
  public rutCliente: String;
  public boletaNOC: Number;
  public nCarga: Number;
  public direccionDespacho: String;
  public nombreDespacho: String;
  public estadoCud: String;
  public sku: Number;

  constructor() {
    this.isSelectGuiaDespacho = true;
    this.region = undefined;
    this.nombreCliente = undefined;
    this.rutDespacho = undefined;
    this.motivoCud = undefined;
    this.descripcionSKU = undefined;
    this.comuna = undefined;
    this.rutCliente = undefined;
    this.boletaNOC = undefined;
    this.nCarga = undefined;
    this.direccionDespacho = undefined;
    this.nombreDespacho = undefined;
    this.estadoCud = undefined;
    this.sku = undefined;
  }


}
