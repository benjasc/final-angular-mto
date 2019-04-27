import { DetailModel } from './detail.model';
import { DetailBranchOfficesModel } from './detailBranchOffice.model';
import { DispatchClientModel } from './dispatchClient.model';

export class OrderModel {
    public orderNumber: String;
    public ticketNumber: String;
    public detail: DetailModel;
    public detailBranchOffices: DetailBranchOfficesModel;
    public dispatchClient: DispatchClientModel;
}
