import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Globals } from '../../../shared/utils/globals';
import { Router } from '@angular/router';
import { EmisionUnitariaModel } from '../../vo/emisionUnitariaGde.model';
import { EmisionUnitariaGdeService } from '../../services/emisionUnitariaGde.service';
import { DataTableDirective } from 'angular-datatables';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../util/tableConfig.util';
import { MessageService } from '../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';

import { GuiasDespachoModel } from '../../vo/guiasDespacho.model';
import { DummyServices } from '../../util/util.model';
import { ValidadorDatos } from '../../util/validador.util';
import { ConstantFieldForm } from '../../util/constant.util';



@Component({
  selector: ' app-emisionunitaria ',
  templateUrl: './reimpresionGuiasDespacho.component.html',
  styleUrls: ['./reimpresionGuiasDespacho.component.scss']
})
export class ReimpresionGuiasGdeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();



  radioButtonSelected: String;
  inputOCRut: String;
  textInput: String = ConstantFieldForm.INPUT_INIT_OC;
  messageValidBoolean: Boolean;
  messageValid: String;
  check: Boolean;

  arrayGuiaDespacho: Array<GuiasDespachoModel>;
  ret: any;

  constructor(public globals: Globals,
    public router: Router,
    public emisionUnitariaGDEService: EmisionUnitariaGdeService,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService,
    public validatorsField: ValidadorDatos) {
      this.inputOCRut = '';
      this.arrayGuiaDespacho = new Array();
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

  Reimprimir(){
    // this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar filtro de búsqueda'], 'info', this.dialogService);
    // const disposable = this.dialogService.addDialog(ModalConfigTransporteComponent, {
    //   title: 'Confirm title',
    //   message: 'Confirm message'})
    //   .subscribe((isConfirmed) => {
    //       // We get dialog result
    //       if (isConfirmed) {

    //       } else {

    //       }
    //   });

  }

  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // Metodo con el cual se buscan las guias de despacho conforme a un rut o una oc para ser reimpresas
  buscarGuiasDespacho() {
    if (this.inputOCRut === undefined || this.inputOCRut === '') {
      this.messageValid = ConstantFieldForm.INPUT_EMPTY;
      this.messageValidBoolean = true;
      return;
    }
    if (this.radioButtonSelected === ConstantFieldForm.RUT) {
      const isRutValido = this.validatorsField.validarRut(this.inputOCRut);
      if ( !isRutValido ) {
        this.messageValid = ConstantFieldForm.RUT_INVALIDO;
        this.messageValidBoolean = true;
        return;
      }
    } else {
      const isOcValida = this.validatorsField.validationOc(this.inputOCRut);
      if (!isOcValida) {
        this.messageValid = ConstantFieldForm.OC_INVALIDA;
        this.messageValidBoolean = true;
        return;
      }
    }
    this.getGuiasDespacho();
  }


  imprimirGuiasDespacho() {

  }







  radioButtonChange(evt: any) {
    this.radioButtonSelected =  evt.srcElement.value;
    if (this.radioButtonSelected === ConstantFieldForm.RUT) {
        this.textInput = ConstantFieldForm.INPUT_INIT_RUT;
        this.inputOCRut = undefined;
    } else {
      this.textInput = ConstantFieldForm.INPUT_INIT_OC ;
      this.inputOCRut = undefined;
    }
  }

  getGuiasDespacho() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   // Se destruye la tabla anterior para ser reemplazada con los nuevos datos
      dtInstance.destroy();
      //   // LLamada a dtTrigger para renderizar datos
      this.dtTrigger.next();
    });

    this.arrayGuiaDespacho = DummyServices.arrayGuiasDespachoReemplazo;
    this.dtTrigger.next();


  //    this.emisionUnitariaGDEService.getGuiasDespacho(this.inputOCRut).subscribe((res: any) => this.ret = res,
  //    error => () => {
  //    },
  //    () => {
  //       this.arrayGuiaDespacho = this.ret.guiasDespacho;
  //       if (this.arrayGuiaDespacho.length === 0) {
  //       } else {

  //       }
  //    }
  //  );

  }



  hide() {
    this.messageValidBoolean = true ? false : true;
  }
}
