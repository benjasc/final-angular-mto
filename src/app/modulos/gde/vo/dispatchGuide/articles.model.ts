export class ArticlesModel {

  public item: String;
  public nroCarton: String;
  public code: String;
  public description: String;
  public quantity: String;
  public unitPrice: String;
  public discount: String;
  public value: String;
  public cud: String;
  public sku: String;
  public descriptionSku: String;
  public transferType: String; // Modelo de despacho
  public statusCud: String;
  public reasonCUD: String;
  public stockBranchOffice: String;
  public stateReason: String;

  constructor() {
    this.item = undefined;
    this.nroCarton = undefined;
    this.code = undefined;
    this.description = undefined;
    this.quantity = undefined;
    this.unitPrice = undefined;
    this.discount = undefined;
    this.value = undefined;
    this.cud = undefined;
    this.sku = undefined;
    this.descriptionSku = undefined;
    this.transferType = undefined;
    this.statusCud = undefined;
    this.reasonCUD = undefined;
    this.stockBranchOffice = undefined;
    this.stateReason = undefined;
  }
}
