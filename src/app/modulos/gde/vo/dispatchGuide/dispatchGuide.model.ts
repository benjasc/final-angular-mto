import { HeaderDispatchModel } from './headerDispatch.model';
import { OrderModel } from './order.model';
import { ReferencedDocumentModel } from './referencedDocument.model';
import { FooterModel } from './footer.model';
import { GeneralModel } from './generals.model';
import { TransportGuideModel } from './transport.model';

export class DispatchGuideModel {
  public isSelected: Boolean;
  public header: HeaderDispatchModel;
  public orders: Array<OrderModel>;
  public referencedDocuments: ReferencedDocumentModel;
  public footer: FooterModel;
  public generals: GeneralModel;
  public transport: TransportGuideModel;
}
