import { DetailBranchOfficesModel } from "./dispatchGuide/detailBranchOffice.model";
import { OrderBuyModel } from "./ordenBuy.model";

// Clase que contendra las guias de despacho que se mostraran en pantalla

export class GuideOrdenModel {
    public nDispatchGuide: Number;
    public listOrdenes: Array<OrderBuyModel>;
    public detailBranchOffice: DetailBranchOfficesModel;


    constructor() {
      this.nDispatchGuide = 0;
      this.listOrdenes = [];
      this.detailBranchOffice = new DetailBranchOfficesModel();
    }

}
