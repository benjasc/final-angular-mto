export class TotalFooterModel {
  public exemptAmount: Number;
  public discount: Number;
  public netAmount: Number;
  public ivaPercentage: Number;
  public iva: Number;
  public total: Number;

  constructor() {
    this.exemptAmount = 0;
    this.discount = 0;
    this.netAmount = 0;
    this.ivaPercentage = 0;
    this.iva = 0;
    this.total = 0;
  }
}
