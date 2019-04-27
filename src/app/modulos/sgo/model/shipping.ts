import { Address } from './address';
export class Shipping {

    public idShipping : number;
    public itemshipping : number;
    public shippingdate:string;
    public shippingetadate: string;
    public shippinghour : string;
    public shippingline:number;
    public shippingorder : number;
    public shippingpreparationdate : string;
    public shippingtype : string;
    public shippingquantity:number;
    public shippingcommitteddate:string;
    public address : Address
      constructor(){
      }
  }