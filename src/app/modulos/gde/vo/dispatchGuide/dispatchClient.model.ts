export class DispatchClientModel {
  public name: String;
  public identificationDocument: String;
  public addres: String;
  public region: String;
  public commune: String;
  public turn: String;
  public transferType: String;
  public dispatchType: String;

  constructor() {
    this.name = undefined;
    this.addres = undefined;
    this.commune = undefined;
    this.turn = undefined;
    this.identificationDocument = undefined;
    this.transferType = undefined;
    this.dispatchType = undefined;
  }
}
