export class GuiasDespachoModel {
  public isSelected: Boolean;

  public nGuia: Number;
  public fecha: String;

  constructor() {
    this.isSelected  = false;
    this.nGuia = undefined;
    this.fecha = undefined;
  }
}
