import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NcVencimientoRETService } from '../../services/ncVencimientoRET.Services';
import { NcVencimientoRET } from '../../model/ncVencimientoRET.model';

@Component({
  selector: 'app-ncvencimiento-ret',
  templateUrl: './ncvencimiento-ret.component.html',
  styleUrls: ['./ncvencimiento-ret.component.scss']
})
export class NcvencimientoRetComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayNcVencimientoRET: Array<NcVencimientoRET>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public ncVencimientoRETService: NcVencimientoRETService) {
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
    this.ncVencimientoRETService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayNcVencimientoRET = res.json();
        console.log(this.arrayNcVencimientoRET);
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