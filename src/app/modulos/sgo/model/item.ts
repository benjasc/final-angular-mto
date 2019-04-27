import { shippingDTO } from "./shippingDTO";
import { Order } from './order';
import { Address } from './address';
import { Shipping } from "./shipping";

export class Item {
public giftmessage : string;
public SKU : number;
public id_item : number;
public itemSaleName : string;
public itscombo : string;
public itemCost : string;
public itsgif : number;
public orderline : number;
public itemunitdoscount: number;
public shippingtype : string;
public warrantyflag : number;
public warrantytype : string;
public shippingDTO : shippingDTO;
public shipping : Shipping;
public order : Order;
public addressDTO : Address;
public itemtotaldiscount:number;
    constructor(){
      
    }
}