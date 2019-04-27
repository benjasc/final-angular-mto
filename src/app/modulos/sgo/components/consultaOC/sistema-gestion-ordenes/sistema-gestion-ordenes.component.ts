import { OnDestroy, AfterViewInit, ViewChild, Renderer,Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfigSgo } from '../../../util/tableConfigSgo.util';
import { OcService } from '../../../services/oc.service';
import { MessageService } from '../../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { HistorialDespacho } from '../../../model/historialDespacho.model';
import { ConstantFieldForm } from '../../../util/constant.util';
import { RouterConstanst } from '../../../util/constant.util';
import { Customer } from '../../../model/customer';
import { timingSafeEqual } from 'crypto';
import { Address } from '../../../model/address';
import { Item } from '../../../model/item';
import { Order } from '../../../model/order';
import { timeout } from 'q';

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { shippingHistory } from '../../../model/shippingHistory';
import { DateFormat } from '../../../model/dateFormat';
import { IMyDateModel } from 'mydatepicker';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-sistema-gestion-ordenes',
  templateUrl: './sistema-gestion-ordenes.component.html',
  styleUrls: ['./sistema-gestion-ordenes.component.scss']
})
export class SistemaGestionOrdenesComponent implements OnInit {
    public estadoFlujo:number; //momentaneo solo para pruebas
 // public estadoFlujo:string;
  public cud : number;
  public isModalActive :boolean = false;
  public productosCompradosShow : boolean  = false;
  public historialDesopachoShow : boolean = true;
  public placeholder:string ;
  public selectType :string = "Seleccione" ;
  public inputSearch:string = undefined ;
  public messageValidBoolean:boolean = false;
  public messageValid:string = undefined;
  public object:any = {};
  public address :Address;
  public customer:Customer;
  public order :Order;
  public shippingHistory :shippingHistory;
  public item:Array<Item>;
  public arrdetalle : any[]=[];
  //fechas
  myDatePickerOptionsCopy: any;
  public formatoFechaDesde : DateFormat;
  public myDatePickerOptionsDesde: any;
  public formatoFechaHasta : DateFormat;
  public myDatePickerOptionsHasta: any;
  fechaCompraDesde: Date;
  fechaCompraHasta: Date;
  //fin fechas

  constructor( public configTable: TableConfigSgo, private ocService:OcService, private messageService: MessageService,
    private dialogService: DialogService,private render:Renderer ,private datePipe: DatePipe){
      this.customer = new Customer();
      this.order = new Order();
      
  }
  
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings[] = [];

  dtTrigger:Subject<any> = new Subject();

  mostrar:boolean = true ;

  displayToConsole(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);
      });
    });
  }

  ngOnInit(): void {
     // Fecha Desde
     const d: Date = new Date();
     this.formatoFechaDesde = new DateFormat;
     this.formatoFechaHasta = new DateFormat;

     this.formatoFechaDesde.myDatePickerOptions.disableSince = {
       year: d.getFullYear(),
       month: d.getMonth() + 1,
       day: d.getDate() + 1
     };
     this.formatoFechaDesde.myDatePickerOptions.disableUntil = {
       year: d.getFullYear(),
       month: d.getMonth() - 12,
       day: d.getDate()
     };
     this.myDatePickerOptionsDesde = this.formatoFechaDesde.myDatePickerOptions;
     // Fecha Hasta
     this.formatoFechaHasta.myDatePickerOptions.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate() + 1
    };
    this.formatoFechaHasta.myDatePickerOptions.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate() + 1
    };
    this.myDatePickerOptionsHasta = this.formatoFechaHasta.myDatePickerOptions;
     //-------------------------------------------------------------------- fin fechas
    this.dtOptions[0] = this.configTable.dtOptionsWithinScrollXExcel;
    this.dtOptions[1] = this.configTable.dtOptionsWithinScrollX;
    this.dtOptions[2] = this.configTable.dtOptionsExport;
    this.dtOptions[3] = this.configTable.dtOptionsWithinScrollXExcel1;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 
  rutFormat() {
    // tslint:disable-next-line: prefer-const
    let rut = this.rutClean(this.inputSearch);
    if (rut.length <= 1) {
      return rut;
    }
    let result = rut.slice(-4, -1) + "-" + rut.substr(rut.length - 1);
    for (let i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + "." + result;
    }
    this.inputSearch = result;
  }
  rutClean(value) {
    return typeof value === "string"
      ? value.replace(/[^0-9kK]+/g, "").toUpperCase()
      : "";
  }
  onlyNumber(event) {
   if ( sessionStorage.getItem("countryUser") === "CHILE" ) {
      return event.charCode === 8 ||
        event.charCode === 0 ||
        event.charCode === 75 ||
        event.charCode === 107
        ? null
        : event.charCode >= 48 && event.charCode <= 57;
    } 
  }
   validarEmail(event) {
   return event.charCode >=48 && event.charCode <=57   ? null
   : event.charCode ===46  ;
  }

  
 

  cambiaFechaDesde(event: IMyDateModel) {
    // Fecha Hasta
    this.fechaCompraHasta = undefined;
    if (event.date.year) {
      const d: Date = new Date();
      const d2: Date = new Date();
      this.myDatePickerOptionsCopy = Object.assign({}, this.formatoFechaHasta.myDatePickerOptions);
      this.formatoFechaHasta.myDatePickerOptions.disableSince = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
      this.myDatePickerOptionsCopy.disableUntil = {year: event.date.year, month: event.date.month, day: event.date.day - 1};
      const months = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getMonth() - d.getMonth();
      const days = event.date.day;
      const diasDif = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getTime() - d.getTime();
      const dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
      const meses = Math.round(dias / 31);
      const date = new Date();
      const primerDiaMesAnterior = new Date( event.date.year, event.date.month - 1, 1);
      const ultimoDiaMesAnterior = new Date(event.date.year, event.date.month - 1, 0);
      const ultimoYearsAnterior = new Date(event.date.year - 1, event.date.month , 0);

      if (+meses <= -3) {
        if (days === 1) {
          if (dias < -92) {
             this.myDatePickerOptionsCopy.disableSince = {year: event.date.year, month: event.date.month + 3, day: event.date.day + 1};
             this.myDatePickerOptionsCopy.disableUntil = {
               year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate() };
          } else {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()};
          }
        } else {
          if (dias < -92) {
            this.myDatePickerOptionsCopy.disableSince = {year: event.date.year, month: event.date.month + 3, day: event.date.day + 1};
          } else {
            this.myDatePickerOptionsCopy.disableUntil = {year: event.date.year, month: event.date.month, day: event.date.day - 1};
          }
        }
      } else {
        if (days === 1) {
          if (ultimoDiaMesAnterior.getMonth() === 11) {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year - 1, month: ultimoDiaMesAnterior.getMonth() + 1, day: ultimoDiaMesAnterior.getDate() };
          } else {
            this.myDatePickerOptionsCopy.disableUntil = {
              year: event.date.year, month: event.date.month - 1, day: ultimoDiaMesAnterior.getDate()};
          }
        }
      }
      this.myDatePickerOptionsHasta = this.myDatePickerOptionsCopy;
    }
    this.fechaCompraDesde = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }
  cambiaFechaHasta(event: IMyDateModel) {
    this.fechaCompraHasta = event.date.year > 0 ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  tabHistorialDespacho():void{
    if(this.historialDesopachoShow == true){
      this.productosCompradosShow = true;
      this.historialDesopachoShow = false;
    }
  }
  tabProductosComprados():void{
    if (this.productosCompradosShow == true) {
      this.productosCompradosShow = false;
      this.historialDesopachoShow = true;
    }
  }

  x(cud : number, estado:string){
    this.isModalActive = !this.isModalActive;
    this.cud = cud;    
    //this.estadoFlujo = estado;
    const max = 7;
    const min = 1;
    this.estadoFlujo = Math.floor(Math.random()*(max-min+1)+min);
    console.log("estadoFlujo",this.estadoFlujo);
    
  }

  placeholderChange(value:string){
    this.inputSearch ='';
   switch (value) {
     case 'RUT/DNI':
       this.placeholder = ConstantFieldForm.INPUT_INIT_RUT;
       break;
       case 'Email':
       this.placeholder = ConstantFieldForm.INPUT_INIT_EMAIL;
       break;
       case 'OC':
       this.placeholder = ConstantFieldForm.INPUT_INIT_OC;
       break;
       case 'CUD':
       this.placeholder = ConstantFieldForm.INPUT_INIT_CUD;
       break;
       case 'Boleta':
       this.placeholder = ConstantFieldForm.INPUT_INIT_BOLETA;
       break;
   
     default:
       break;
   }
  }

  showDetails():void{

    this.ocService.showDetails(this.cud).subscribe((res:any)=>{
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
         if (index ==1) { //para que solo se ejecute la instancia correspondiente
          dtInstance.destroy();
          this.shippingHistory = res;          
          this.dtTrigger.next();
          console.log("AQUI ESTA EL HISTORIAL DE DESPACHO!!",this.shippingHistory);
         }
          
        });
      });
      this.isModalActive = !this.isModalActive;
      this.tabHistorialDespacho();
      
      
      
    },err=>{
  console.log(err);
  
    })

  }

  search():void{
    this.order = new Order();   
    if (this.inputSearch != undefined && this.inputSearch != ''&& this.selectType != 'Seleccione') {
      switch (this.selectType) {
        case 'RUT/DNI':
        let str = this.inputSearch;
        let res = str.replace(".","");
        let res2 = res.replace("-","");
        let res3 = res2.replace(".","");
            

        
          this.ocService.searchByRut( res3).subscribe((res:Customer)=>{            
            this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
              dtElement.dtInstance.then((dtInstance: any) => {
                
               if (index===0) {
                dtInstance.destroy();
                this.customer = res;
                this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
                this.dtTrigger.next();    
               }
                if (index ===3) {
                  dtInstance.clear();
                this.dtTrigger.next();
                }
                if (index ===1) {
                  dtInstance.clear();
                this.dtTrigger.next();
                }
                
               
               console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);

              });
            }); 
          },
          err=>{
            this.messageValid = 'No se encontraron resultados para el RUT ingresado';
            this.messageValidBoolean = true;
            this.object ={};
            setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
          })
          break;
        
          case 'Email':

          this.ocService.searchByEmail(this.inputSearch).subscribe((res:Customer)=>{            
            this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
              dtElement.dtInstance.then((dtInstance: any) => {
                if (index===0) {
                  dtInstance.destroy();
                  this.customer = res;
                  this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
                  this.dtTrigger.next();    
                 }
                  if (index ===3) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }
                  if (index ===1) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }              
              });
            }); 
          },
          err=>{
            this.messageValid = 'No se encontraron resultados para el Email ingresado';
            this.messageValidBoolean = true;
            this.object ={};
            setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
          })

          break;
          case 'OC':

          this.ocService.searchByOc(this.inputSearch).subscribe((res:Customer)=>{            
            this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
              dtElement.dtInstance.then((dtInstance: any) => {
                if (index===0) {
                  dtInstance.destroy();
                  this.customer = res;
                  this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
                  this.dtTrigger.next();    
                 }
                  if (index ===3) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }
                  if (index ===1) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }               
              });
            }); 
          },
          err=>{
            this.messageValid = 'No se encontraron resultados para la OC ingresada';
            this.messageValidBoolean = true;
            this.object ={};
            setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
          })

          break;
          case 'CUD':

          this.ocService.searchByCud(this.inputSearch).subscribe((res:Customer)=>{            
            this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
              dtElement.dtInstance.then((dtInstance: any) => {
                if (index===0) {
                  dtInstance.destroy();
                  this.customer = res;
                  this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
                  this.dtTrigger.next();    
                 }
                  if (index ===3) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }
                  if (index ===1) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }           
              });
            }); 
          },
          err=>{
            this.messageValid = 'No se encontraron resultados para el Cud ingresado';
            this.messageValidBoolean = true;
            this.object ={};
            setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
          })

          break;
          case 'Boleta':

          this.ocService.searchByDte(this.inputSearch).subscribe((res:Customer)=>{            
            this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
              dtElement.dtInstance.then((dtInstance: any) => {
                if (index===0) {
                  dtInstance.destroy();
                  this.customer = res;
                  this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
                  this.dtTrigger.next();    
                 }
                  if (index ===3) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }
                  if (index ===1) {
                    dtInstance.clear();
                  this.dtTrigger.next();
                  }              
              });
            }); 
          },
          err=>{
            this.messageValid = 'No se encontraron resultados para la boleta ingresada';
            this.messageValidBoolean = true;
            this.object ={};
            setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
          })

          break;
      
        default:
          break;
      }
    }else{
      this.messageValid = 'Error en la busqueda, Intentalo Nuevamente';
      this.messageValidBoolean = true;
      setTimeout(()=>{ this.messageValidBoolean = false;}, 3000);
    }

  }

  getDetalleCompra(oc:string):void {
      
    this.ocService.getDetalleCompra(oc).subscribe((res:any)=>{
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
          if (index ===2 ||index === 3) {
            dtInstance.destroy();
            this.order = res;
           const address11 =  this.order.items[0].shipping.address.address1;
           const cityname = this.order.items[0].shipping.address.cityname;
           const country = this.order.items[0].shipping.address.country;
           if (index===2) {
            this.order.items[0].shipping.address.address1 = `${address11}, ${cityname},  ${country}`;
           }
            console.log('jhhghghfh',this.order);
            this.dtTrigger.next();
            console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);

          }
        });
      });
      
      
    },err=>{
  console.log(err);
  
    })
   

    }

    filterByDate(){
    
      
      
    
      const fechaIni = this.datePipe.transform(this.fechaCompraDesde, 'yyyy-MM-dd');
      const fechaFin= this.datePipe.transform(this.fechaCompraHasta, 'yyyy-MM-dd');
  this.customer.items[0].order = new Order();
     this.ocService.filterByDate(fechaIni,fechaFin,this.customer.customerid, this.selectType).subscribe((res:Customer)=>{
       
        this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
          dtElement.dtInstance.then((dtInstance: any) => {
            
           if (index===0) {
            dtInstance.destroy();
            this.customer = res;
            this.customer.firstname = `${this.customer.firstname} ${this.customer.lastname}`;
            this.dtTrigger.next();    
           }
            if (index ===3) {
              dtInstance.clear();
            this.dtTrigger.next();
            }
            if (index ===1) {
              dtInstance.clear();
            this.dtTrigger.next();
            }
            
          });
        }); 
        
        
        
      },err=>{
       this.messageService.enviarMensaje('Filtro de Búsqueda',['No se encontraron Registros'],'info',this.dialogService);
    
      })


   
  }

}

  


  
  

 

  

  


