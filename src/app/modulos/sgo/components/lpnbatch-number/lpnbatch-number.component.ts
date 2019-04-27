import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LpnBatchNumberService } from '../../services/lpnBatchNumber.services.';
import { LpnBatchNumber } from '../../model/lpnBatchNumber.model';

@Component({
  selector: 'app-lpnbatch-number',
  templateUrl: './lpnbatch-number.component.html',
  styleUrls: ['./lpnbatch-number.component.scss']
})
export class LpnbatchNumberComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayLpnBN: Array<LpnBatchNumber>;

  
  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public despachoNumCartonService: LpnBatchNumberService) {
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
    this.despachoNumCartonService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayLpnBN = res.json();
        console.log(this.arrayLpnBN);
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

