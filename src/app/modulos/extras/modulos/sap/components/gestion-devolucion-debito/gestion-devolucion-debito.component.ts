import { MessageService } from './../../../../../shared/services/message.service';
import { NotaCreditoService } from './../../../notaCredito/services/nota-credito.service';
import { TableConfig } from './../../../shared/util/tableConfig.util';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-devolucion-debito',
  templateUrl: './gestion-devolucion-debito.component.html',
  styleUrls: ['./gestion-devolucion-debito.component.scss']
})
export class GestionDevolucionDebitoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  titulo: string;
  numeroOC: string;

  acreedor: string;
  sociedad: string;

  numeroTicket: string;
  isValidTicket: boolean;

  constructor(public configTable: TableConfig, private notaCreditoService: NotaCreditoService,
    private messageService: MessageService, private dialogService: DialogService, private router: Router) {
    this.acreedor = '0013';
    this.sociedad = '1232';
    this.titulo = 'Codigo:0 Mensaje: EL Acreedor ' + this.acreedor +
      ' se ha creado en la sociedad ' + this.sociedad + '. Cod: 0 Mensaje: Via de pago 0 asignada';
    this.numeroOC = '23244';
    this.numeroTicket = '';
    this.isValidTicket = false;
  }

  ngOnInit() {
    this.dtOptions = this.configTable.dtOptionsExport;
    sessionStorage.removeItem('modificar');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refrescarTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  validarTicket() {
    if (this.numeroTicket !== '' && this.numeroTicket !== undefined) {
      if (this.numeroTicket.length > 5) {
        this.isValidTicket = true;
      } else {
        this.isValidTicket = false;
      }
    } else {
      this.isValidTicket = false;
    }
  }

  modificarAcreedor() {
    sessionStorage.setItem('modificar', 'true');
    this.router.navigate(['/acreedorSap']);
  }

  generarNotaCredito() {
    this.messageService.cargando(true);
    console.log(this.numeroTicket);
    this.notaCreditoService.generarNotaCreditoDevolucionDebito(this.numeroOC, this.numeroTicket).subscribe(
      response => {
        console.log(response);
        this.messageService.cargando(false);
      },
      err => {
        console.log(err.status);
        this.messageService.cargando(false);
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio'], 'info', this.dialogService);
      }
    );
  }
}
