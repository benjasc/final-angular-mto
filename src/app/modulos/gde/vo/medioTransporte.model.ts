export class MedioTransporteModel {

  public idCarTransport: Number;
  public patent: String;
  public capacity: Number;
  public description: String;
  public reportTracking: Boolean;

  constructor() {
    this.idCarTransport = 0;
    this.patent = undefined;
    this.capacity = 0;
    this.description = undefined;
    this.reportTracking = false;
  }
}
