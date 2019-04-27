export class GeneralModel {
  public country: String;
  public manifestNumber: Array<any>;
  public quantityCud: Number;
  public quantityLumps: Number;

  constructor() {
    this.country = undefined;
    this.manifestNumber = undefined;
    this.quantityCud = 0;
    this.quantityLumps = 0;
  }
}
