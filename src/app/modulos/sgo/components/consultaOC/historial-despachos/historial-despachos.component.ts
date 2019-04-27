import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Session } from 'protractor';
import { TableConfigSgo } from '../../../util/tableConfigSgo.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HistorialDespachoService } from '../../../services/historialDespacho.services';
import { HistorialDespacho } from '../../../model/historialDespacho.model';



@Component({
  selector: 'app-historial-despachos',
  templateUrl: './historial-despachos.component.html',
  styleUrls: ['./historial-despachos.component.scss']
})
export class HistorialDespachosComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayHistorialDespacho: Array<HistorialDespacho>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigSgo, 
              public historialDespachoService: HistorialDespachoService) {
    this.titulo = "Consulta de Cuadratura BigTicket - BackOffice";
    sessionStorage.setItem("titulo",this.titulo);
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


  buscarBT(){
    this.historialDespachoService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayHistorialDespacho = res.json();
        console.log(this.arrayHistorialDespacho);
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
