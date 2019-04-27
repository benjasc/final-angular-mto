import { TributaryInformationModel } from './tributaryInformation.model';
import { BuyerModel } from './buyer.model';
import { PurchaseClientModel } from './purchaseClient.model';

export class HeaderDispatchModel {
  public identifierGuideNumber: String;
  public tributaryInformation: TributaryInformationModel;
  public buyer: BuyerModel;
  public purchaseIssuer: PurchaseClientModel;
}
