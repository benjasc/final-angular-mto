import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MantencionDespachoService } from '../../services/mantencionDespacho.Services';
import { MantencionDespacho } from '../../model/mantencionDespacho.model';

@Component({
  selector: 'app-mantencion-despacho',
  templateUrl: './mantencion-despacho.component.html',
  styleUrls: ['./mantencion-despacho.component.scss']
})
export class MantencionDespachoComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayMantencionDespacho: Array<MantencionDespacho>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public mantencionDespachoService: MantencionDespachoService) {
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
    this.mantencionDespachoService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayMantencionDespacho = res.json();
        console.log(this.arrayMantencionDespacho);
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
