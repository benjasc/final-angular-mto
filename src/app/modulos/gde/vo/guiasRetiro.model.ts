export class GuiasRetiroModel {
  public isSelected: Boolean;
  public guiaDespacho: Number;
  public transporte: String;
  public conductor: String;

  constructor() {
    this.isSelected = false;
    this.guiaDespacho = undefined;
    this.transporte = undefined;
    this.conductor = undefined;
  }
}
