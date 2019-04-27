import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer,Inject } from '@angular/core';
import { Globals } from '../../../shared/utils/globals';
import { Router } from '@angular/router';
import { EmisionUnitariaModel } from '../../vo/emisionUnitariaGde.model';
import { EmisionUnitariaGdeService } from '../../services/emisionUnitariaGde.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../util/tableConfig.util';
import { MessageService } from '../../../shared/services/message.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIcon } from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalConfigTransporteComponent } from './mantenedorTransportistaModal/mantenedorTransportistaModal.component';
import { ValidadorDatos } from '../../util/validador.util';
import { ConstantFieldForm } from '../../util/constant.util';
import { DummyServices } from '../../util/util.model';


@Component({
  selector: ' app-emisionunitaria ',
  templateUrl: './mantenedorTransportista.component.html',
  styleUrls: ['./mantenedorTransportista.component.scss']
})
export class MantenedorTransportistaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('myModalEmailInfo') myModalEmailInfo;
  dtOptions: any;
  dtTrigger:Subject<any> = new Subject();




  radioButtonSelected: String;
  inputOCRut: String;
  textInput: String = ConstantFieldForm.INPUT_INIT_OC;
  messageValidBoolean: Boolean;
  messageValid: String;
  check: Boolean;

  arrayGuiaDespacho: Array<EmisionUnitariaModel>;
  ret: any;

  constructor(public globals: Globals,
    public router: Router,
    public emisionUnitariaGDEService: EmisionUnitariaGdeService,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService,
    public validadorDatos: ValidadorDatos) {
      this.inputOCRut = '';
      this.arrayGuiaDespacho = new Array();
  }

  ngOnInit() {
    this.messageValidBoolean = false;
    this.dtOptions = this.configTable.dtOptionsWithinOptons;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  buscarTransporte(){
    // this.messageService.enviarMensaje('Error búsqueda', ['Debe ingresar filtro de búsqueda'], 'info', this.dialogService);
    let disposable = this.dialogService.addDialog(ModalConfigTransporteComponent, {
      title:'Confirm title',
      message:'Confirm message'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {

          }
          else {

          }
      });

  }

  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  buscarGuiasUnitarias() {

    if(this.inputOCRut === undefined || this.inputOCRut === '') {
      this.messageValid = ConstantFieldForm.INPUT_EMPTY;
      this.messageValidBoolean = true;
      return;
    }
    if (this.radioButtonSelected === ConstantFieldForm.RUT) {
      const isRutValido = this.validadorDatos.validarRut(this.inputOCRut);
      if ( !isRutValido ) {
        this.messageValid = ConstantFieldForm.RUT_INVALIDO;
        this.messageValidBoolean = true;
        return;
      }
    } else {
      const isOcValida = this.validadorDatos.validationOc(this.inputOCRut);
      if (!isOcValida) {
        this.messageValid = ConstantFieldForm.OC_INVALIDA;
        this.messageValidBoolean = true;
        return;
      }
    }
    this.getGuiasDespacho();
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

    this.arrayGuiaDespacho = DummyServices.arrayGDEUnitaria;
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

  imprimirGde() {
    console.log('Imprimo guías unitarias');
    console.log(this.arrayGuiaDespacho);
    this.arrayGuiaDespacho.forEach(element => {
      if (element.isSelected) {
        console.log(element.nBoleta);
      }
    });
  }


  hide() {
    this.messageValidBoolean = true ? false : true;
  }
}
