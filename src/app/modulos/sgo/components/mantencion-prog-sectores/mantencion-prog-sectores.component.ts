import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MantencionProgSectoresService } from '../../services/mantencionProgSectores.Services';
import { MantencionProgSectores } from '../../model/mantencionProgSectores.model';

@Component({
  selector: 'app-mantencion-prog-sectores',
  templateUrl: './mantencion-prog-sectores.component.html',
  styleUrls: ['./mantencion-prog-sectores.component.scss']
})
export class MantencionProgSectoresComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();

  arrayMantencionProgSectores: Array<MantencionProgSectores>;

  fecha:String;
  titulo:string;
  constructor(public configTable:TableConfigEmisionGDE, 
              public mantencionProgSectoresService: MantencionProgSectoresService) {
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
    this.mantencionProgSectoresService.searchTestMethod('2018-12-12','Stgo').subscribe(
      res => {
        this.arrayMantencionProgSectores = res.json();
        console.log(this.arrayMantencionProgSectores);
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