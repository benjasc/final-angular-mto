export class ConductorModel {

  public idDriver: Number;
  public identificationDocument: String;
  public nameDriver: String;
  public status: Boolean;

  constructor() {
    this.idDriver = 0;
    this.identificationDocument = undefined;
    this.nameDriver = undefined;
    this.status = false;
  }

}
