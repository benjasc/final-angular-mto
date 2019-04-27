import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MantencionRutasPlanAutoService } from '../../services/mantencionRutasPlanAuto.Services';
import { MantencionRutasPlanAuto } from '../../model/mantencionRutasPlanAuto.model';

@Component({
  selector: 'app-mantencion-rutas-plan-auto',
  templateUrl: './mantencion-rutas-plan-auto.component.html',
  styleUrls: ['./mantencion-rutas-plan-auto.component.scss']
})
export class MantencionRutasPlanAutoComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayMantencionRutasPlanAuto: Array<MantencionRutasPlanAuto>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public mantencionRutasPlanAutoService: MantencionRutasPlanAutoService) {
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
    this.mantencionRutasPlanAutoService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayMantencionRutasPlanAuto = res.json();
        console.log(this.arrayMantencionRutasPlanAuto);
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