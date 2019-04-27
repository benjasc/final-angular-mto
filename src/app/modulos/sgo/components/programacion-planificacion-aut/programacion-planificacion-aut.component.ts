import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProgPlanificacionAutoService } from '../../services/progPlanificacionAuto.Services';
import { ProgPlanificacionAuto } from '../../model/progPlanificacionAuto.model';

@Component({
  selector: 'app-programacion-planificacion-aut',
  templateUrl: './programacion-planificacion-aut.component.html',
  styleUrls: ['./programacion-planificacion-aut.component.scss']
})
export class ProgramacionPlanificacionAutComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayProgPlanificacionAuto: Array<ProgPlanificacionAuto>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public progPlanificacionAutoService: ProgPlanificacionAutoService) {
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
    this.progPlanificacionAutoService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayProgPlanificacionAuto = res.json();
        console.log(this.arrayProgPlanificacionAuto);
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