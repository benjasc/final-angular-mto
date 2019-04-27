import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DespachoBatchNumberService } from '../../services/despachoBN.services';
import { DespachoBN } from '../../model/despachoBN.model';



@Component({
  selector: 'app-despacho-batch-number',
  templateUrl: './despacho-batch-number.component.html',
  styleUrls: ['./despacho-batch-number.component.scss']
})
export class DespachoBatchNumberComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayDespachoBN: Array<DespachoBN>;

  
  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public despachoBNService: DespachoBatchNumberService) {
    this.titulo = "Consulta de Cuadratura BigTicket - BackOffice";
    sessionStorage.setItem("titulo",this.titulo);
   }

  ngOnInit() {

    this.dtOptions = this.configTable.dtOptionsExport;
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


  buscarBT(){
    this.despachoBNService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayDespachoBN = res.json();
        console.log(this.arrayDespachoBN);
      },
      err => {
        console.log(err);
      }
    );

   this.refrescarTable();
  }
  action(){
    console.log(this.fecha);
  }
}
