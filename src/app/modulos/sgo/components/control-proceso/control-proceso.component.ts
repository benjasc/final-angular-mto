import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ControlProcesoService } from '../../services/controlProceso.Services';
import { ControlProceso } from '../../model/controlProceso.model';

@Component({
  selector: 'app-control-proceso',
  templateUrl: './control-proceso.component.html',
  styleUrls: ['./control-proceso.component.scss']
})
export class ControlProcesoComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayControlProceso: Array<ControlProceso>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public controlProcesoService: ControlProcesoService) {
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
    this.controlProcesoService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayControlProceso = res.json();
        console.log(this.arrayControlProceso);
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