import { Channel } from './channel';
export class OrderPayment {
 public idOrderpayment:number;
 public idOrder : number;
 public idholder : number;
 public payamaunt : number;
 public paymenttype : string;
 public uniquenumbertrx : number;
 public channel : Channel;

   

    constructor(){
      
    }
}