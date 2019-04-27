export class GuiaDeTranferenciaModel {
  public isSelected: Boolean;
  public sucursalOrigen: String;
  public codigoDestino: Number;
  public descripcionDestino: String;
  public codigoManifiesto: Number;
  public cantidadCud: Number;
  public bultos: Number;

  constructor() {
    this.isSelected = false;
    this.sucursalOrigen = undefined;
    this.codigoDestino = 0;
    this.descripcionDestino = undefined;
    this.codigoManifiesto = 0;
    this.cantidadCud = 0;
    this.bultos = 0;
  }
}
