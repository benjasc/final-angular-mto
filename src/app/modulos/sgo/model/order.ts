import { Item } from './item';
import { OrderPayment } from './orderPayment';
import { BillingDTO } from './billingDTO';
export class Order {
   public id_order : number;
   public dtenumber : number;
   public amount : number;
   public creationtime : string;
   public discountamount : number;
   public dtdate : string;
   public executiveid : number;
   public executivename : string;
   public ordernumber : number;
   public shippingamount : number;
   public taxamount : number;
   public total : number;
   public items: Array<Item>;
   public ordenPayment : Array<OrderPayment>;
   public billingDTO : BillingDTO;
   public status : number;
   public sucursalOrigen : string;
   public sucursalDespacho : string;
   public release : string;
   public numeroGuia : number;
   public ncdtenumber : number;
   public tarifaFlete : number;

   //-----
   public planificacion : string;
   public canal : string;
   public estado : string;
   public tipo : string;
   public sucursal_origen : string;
   public sucursal_despacho : string;
   public realse : string;
   public guia_despacho : string;
   public factura : string;
   public folio : number;
   public ncredito : string;
   public garantia : string;
   public descuento : string;
   public flete : string;
   public mediopago : string;
   public datosdespacho : string;
   public entregacompromiso : string;
   public entrgaconforme : string;


   

    constructor(){
      
    }
}