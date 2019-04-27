import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer,Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfigSgo } from '../../../util/tableConfigSgo.util';


@Component({
  selector: 'app-despacho-ventas-corporativas',
  templateUrl: './despacho-ventas-corporativas.component.html',
  styleUrls: ['./despacho-ventas-corporativas.component.scss']
})
export class DespachoVentasCorporativasComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any[]=[];
  dtTrigger:Subject<any> = new Subject();

  constructor( public configTable: TableConfigSgo){
   // this.dtOptions[0] = this.configTable.dtOptionsExport.buttons = [];
    
    
  }

  ngOnInit() {
    //hacemos un arr[] de dtOptions ya que tenemos mas de una tabla en nuestro componente
   // this.dtOptions[0] = this.configTable.dtOptionsExport;
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

  

  


}
