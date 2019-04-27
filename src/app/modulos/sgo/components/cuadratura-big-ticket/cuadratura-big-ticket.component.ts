import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CuadraturaService } from '../../services/cuadratura.services';
import { Cuadratura } from '../../model/cuadratura.model';
  


@Component({
  selector: 'app-cuadratura-big-ticket',
  templateUrl: './cuadratura-big-ticket.component.html',
  styleUrls: ['./cuadratura-big-ticket.component.scss']
})



export class CuadraturaBigTicketComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayCuadratura: Array<Cuadratura>;

  
  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public cuadraturaService: CuadraturaService) {
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
    this.cuadraturaService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayCuadratura = res.json();
        console.log(this.arrayCuadratura);
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


