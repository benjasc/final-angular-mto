import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TransferenciaSucursalService } from '../../services/transferenciaSucursal.services';
import { TransferenciaSucursal } from '../../model/transferenciaSucursal.model';

@Component({
  selector: 'app-transferencia-sucursal',
  templateUrl: './transferencia-sucursal.component.html',
  styleUrls: ['./transferencia-sucursal.component.scss']
})
export class TransferenciaSucursalComponent  implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayTransferenciaSucursal: Array<TransferenciaSucursal>;

  
  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public transferenciaSucursalService: TransferenciaSucursalService) {
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
    this.transferenciaSucursalService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayTransferenciaSucursal = res.json();
        console.log(this.arrayTransferenciaSucursal);
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

