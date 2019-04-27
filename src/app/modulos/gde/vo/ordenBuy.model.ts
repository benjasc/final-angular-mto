import { TransporteModel } from './transporteDespacho.model';
import { HeaderDispatchModel } from './dispatchGuide/headerDispatch.model';
import { ReferencedDocumentModel } from './dispatchGuide/referencedDocument.model';
import { FooterModel } from './dispatchGuide/footer.model';
import { GeneralModel } from './dispatchGuide/generals.model';
import { DispatchClientModel } from './dispatchGuide/dispatchClient.model';


export class OrderBuyModel {
  public isSelected: Boolean;
  public buyerName: String;
  public identificationNumberBuyer: String;
  public dispacthClientName: String;
  public idNumberDispatchClient: String;
  public transferType: String;
  public statusCud: String;
  public reasonCud: String;
  public statusReasonReservation: String;
  public cud: String;
  public location: String;
  public sku: String;
  public descriptionSku: String;
  public descripcion: String;
  public region: String;
  public commune: String;
  public item: Number;
  public codeArticle: Number;
  public addressDispatch: String;
  public nOrdenBoleta: String;
  public unitPrice: Number;
  public quantity: Number;
  public dispatchType: String;
  public saleBranchOffice: String;
  public stockBranchOffice: String;
  public dispatBranchOffice: String;
  public nCarton: Number;
  public ticketNumber: String;
  public transport: TransporteModel;
  public header: HeaderDispatchModel;
  public dispatchClient: DispatchClientModel;
  public refencedDocuments: ReferencedDocumentModel;
  public footer: FooterModel;
  public generals: GeneralModel;


  constructor() {
    this.isSelected = false;
    this.buyerName = undefined;
    this.identificationNumberBuyer = undefined;
    this.dispacthClientName = undefined;
    this.idNumberDispatchClient = undefined;
    this.transferType = undefined;
    this.statusCud = undefined;
    this.reasonCud = undefined;
    this.statusReasonReservation = undefined;
    this.cud = undefined;
    this.location = undefined;
    this.sku = undefined;
    this.descriptionSku = undefined;
    this.region = undefined;
    this.commune = undefined;
    this.addressDispatch = undefined;
    this.nOrdenBoleta = undefined;
    this.quantity = 0;
    this.saleBranchOffice = undefined;
    this.stockBranchOffice = undefined;
    this.dispatBranchOffice = undefined;
    this.nCarton = 0;
    this.header = null;
    this.refencedDocuments = null;
    this.footer = null;
    this.generals = null;
  }
}
