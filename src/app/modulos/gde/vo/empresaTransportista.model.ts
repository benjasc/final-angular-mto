export class TransportCompanyModel {
  public idTransportCompany: Number;
  public identificationCompany: String;
  public nameCompany: String;
  public address: String;
  public phone: Number;
  public email: String;
  public status: Boolean;


  constructor() {
    this.idTransportCompany = 0;
    this.identificationCompany = undefined;
    this.nameCompany = undefined;
    this.address = undefined;
    this.phone = 0;
    this.email = undefined;
    this.status = false;
  }
}
