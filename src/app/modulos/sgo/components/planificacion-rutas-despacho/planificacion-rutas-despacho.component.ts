import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PlanificacionRutasDespachoService } from '../../services/planificacionRutasDespacho.Services';
import { PlanificacionRutasDespacho } from '../../model/planificacionRutaDespacho.model';

@Component({
  selector: 'app-planificacion-rutas-despacho',
  templateUrl: './planificacion-rutas-despacho.component.html',
  styleUrls: ['./planificacion-rutas-despacho.component.scss']
})
export class PlanificacionRutasDespachoComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayPlanificacionRutasDespacho: Array<PlanificacionRutasDespacho>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public planificacionRutaDespachooService: PlanificacionRutasDespachoService) {
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
    this.planificacionRutaDespachooService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayPlanificacionRutasDespacho = res.json();
        console.log(this.arrayPlanificacionRutasDespacho);
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
