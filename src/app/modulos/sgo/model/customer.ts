import { Address } from "./address";
import { Item } from './item';

export class Customer {

    public idCustomer: number;
    public idOrder: number;
    public customerid:string;
    public firstname: string ;
    public emailflag:number;
    public lastname:string;
    public middlename:string;
    public foreigncountry: string;
    public foreignflag:number;
    public email:string;
    public phonenumber1:string;
    public phonenumber2:string;
    public phonenumber3:string;
    public items: Array<Item>;
    constructor(){
    
    }
}