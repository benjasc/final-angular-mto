import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DespachoNumCartonService } from '../../services/despachoNumCarton.services';
import { DespachoNumCarton } from '../../model/despachoNumCarton.model';



@Component({
  selector: 'app-despacho-batch-number',
  templateUrl: './despacho-numero-carton.component.html',
  styleUrls: ['./despacho-numero-carton.component.scss']
})
export class DespachoNumeroCartonComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayDespachoNumCarton: Array<DespachoNumCarton>;

  
  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public despachoNumCartonService: DespachoNumCartonService) {
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
        this.arrayDespachoNumCarton = res.json();
        console.log(this.arrayDespachoNumCarton);
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
