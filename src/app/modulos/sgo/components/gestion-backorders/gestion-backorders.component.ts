import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer,Inject } from '@angular/core';
import { BackordersService } from '../../services/backorders.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TableConfigSgo } from '../../../sgo/util/tableConfigSgo.util';

@Component({
  selector: 'app-gestion-backorders',
  templateUrl: './gestion-backorders.component.html',
  styleUrls: ['./gestion-backorders.component.scss']
})
export class GestionBackordersComponent  {
  canalVentas:any[] = [];
  canalDespachos:any[] = [];
  modeloDespachos:any[] = [];
  motivosBackorder:any[] = [];
  listaBackorders : any[] = [];

  selectCanalVentas:string ='0';
  selectCanalVentaDespacho:string='0' ;
  selectModeloDespacho:string='0';
  selectMotivoBackorder:string='0';

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  constructor(private backOrdersService : BackordersService , private configTable: TableConfigSgo) {
             this.getCanalVentas();
             this.getCanalDespachos();
             this.getModeloDespachos();
             this.getMotivosBackorder(); 
   }
   ngOnInit() {
   // this.dtOptions = this.configTable.dtOptionsExport;

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  getCanalVentas(){
    this.backOrdersService.getCanalVentas().subscribe(res=>{
        this.canalVentas = res.json();

    },err=>{
          console.log(err);
    });
    
  }
  getCanalDespachos(){
    this.backOrdersService.getCanalDespachos().subscribe(res=>{
      console.log(res.json());
      
        this.canalDespachos = res.json();
        
    },err=>{
          console.log(err);
    });
    
  }
  getModeloDespachos(){
    this.backOrdersService.getModeloDespachos().subscribe(res=>{
        this.modeloDespachos = res.json();
        
    },err=>{
          console.log(err);
    });
    
  }
  getMotivosBackorder(){
    this.backOrdersService.getMotivosBackorder().subscribe(res=>{
        this.motivosBackorder = res.json();
        
    },err=>{
          console.log(err);
    });
    
  }

  verBackorder(){
    this.backOrdersService.getBackorder(this.selectCanalVentas,
      this.selectCanalVentaDespacho,this.selectModeloDespacho,this.selectMotivoBackorder).subscribe(res=>{
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
        console.log(res.json());
        
        this.listaBackorders = res.json();
        
    },err=>{ console.log("Error en la peticion"); });

    this.dtTrigger.next();
  }

 
}




























  /* usuarios(){
    this.gestionBackOrdersService.getUsers().subscribe(
      
      res=>{
        this.arrayBackorders = res.json();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
        this.arrayBackorders = res.json();
        

    },err=>{
    });
   
    this.dtTrigger.next();
  }



} */
