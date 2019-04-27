import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer, Inject } from '@angular/core';
import { Globals } from '../../../shared/utils/globals';
import { Router } from '@angular/router';
import { EmisionUnitariaGdeService } from '../../services/emisionUnitariaGde.service';
import { DataTableDirective } from 'angular-datatables';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../util/tableConfig.util';
import { MessageService } from '../../../shared/services/message.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIcon } from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
//import { ModalConfigTransporteComponent } from '../../services/configTransporteModal/configTransporte.component';
import { ValidadorDatos } from '../../util/validador.util';
import { ConstantFieldForm, RouterConstanst } from '../../util/constant.util';
import { GuiaDeTranferenciaModel } from '../../vo/guiaTransferencia.model';
import { DummyServices } from '../../util/util.model';


@Component({
  selector: 'app-guiastransferencia',
  templateUrl: './guiasTransferencia.component.html',
  styleUrls: ['./guiasTransferencia.component.scss']
})
export class GuiasTransferenciaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();


  inputOCRut: String;
  textInput: String = ConstantFieldForm.INPUT_INIT_MANISFEST;
  messageValidBoolean: Boolean;
  messageValid: String;


  arrayGuiaTransferencia: Array<GuiaDeTranferenciaModel>;
  ret: any;

  constructor(public globals: Globals,
    public router: Router,
    public emisionUnitariaGDEService: EmisionUnitariaGdeService,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService,
    public validadorDatos: ValidadorDatos) {
      this.inputOCRut = '';
      this.arrayGuiaTransferencia = new Array();
  }

  ngOnInit() {
    this.messageValidBoolean = false;
    this.dtOptions = this.configTable.dtOptionsWithinScrollX;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  buscarTransporte() {
    // this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar filtro de búsqueda'], 'info', this.dialogService);
    this.router.navigate([RouterConstanst.ROUTE_DETALLE_GUIATRANSFERENCIA]);
  }

  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  buscarManifiesto() {
    if (! this.validadorDatos.validationOc(this.inputOCRut)) {
      this.messageValid = ConstantFieldForm.INPUT_FORMAT_ERROR_MANIFEST;
      this.messageValidBoolean = true;
      return;
    }
    if (this.inputOCRut === undefined || this.inputOCRut === '') {
      this.messageValid = ConstantFieldForm.INPUT_EMPTY;
      this.messageValidBoolean = true;
      return;
    }
    this.getGuiasDespacho();
  }


  getGuiasDespacho() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   // Se destruye la tabla anterior para ser reemplazada con los nuevos datos
      dtInstance.destroy();
      //   // LLamada a dtTrigger para renderizar datos
      this.dtTrigger.next();
    });

     this.arrayGuiaTransferencia = DummyServices.arrayGuiaTransferencia;
     this.dtTrigger.next();


  //    this.emisionUnitariaGDEService.getGuiasDespacho(this.inputOCRut).subscribe((res: any) => this.ret = res,
  //    error => () => {
  //    },
  //    () => {
  //       this.arrayGuiaDespacho = this.ret.guiasDespacho;
  //       if (this.arrayGuiaDespacho.length === 0) {
  //       }
  //    }
  //  );

  }



  hide() {
    this.messageValidBoolean = true ? false : true;
  }
}
