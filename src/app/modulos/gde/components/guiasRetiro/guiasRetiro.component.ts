import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Renderer, Inject } from '@angular/core';
import { Globals } from '../../../shared/utils/globals';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TableConfigEmisionGDE } from '../../util/tableConfig.util';
import { MessageService } from '../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ValidadorDatos } from '../../util/validador.util';
import { ConstantFieldForm, RouterConstanst } from '../../util/constant.util';
import { GuiaDeTranferenciaModel } from '../../vo/guiaTransferencia.model';
import { DummyServices } from '../../util/util.model';
import { ConductorModel } from '../../vo/conductor.model';
import { TransportCompanyModel } from '../../vo/empresaTransportista.model';
import { MedioTransporteModel } from '../../vo/medioTransporte.model';
import { DataTransportDistpacthService } from '../../services/cargaDatosTransporte.common.service';
import { GuiasRetiroService } from '../../services/guiasRetiro.component';
import { GuiasRetiroModel } from '../../vo/guiasRetiro.model';


@Component({
  selector: 'app-guiasretiro',
  templateUrl: './guiasRetiro.component.html',
  styleUrls: ['./guiasRetiro.component.scss']
})
export class GuiasRetiroComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();


  inputOCRut: String;
  textInput: String = ConstantFieldForm.INPUT_INIT_MANISFEST;
  messageValidBoolean: Boolean;
  messageValid: String;
  radioButtonSelected: String;
  showTransportCompany: Boolean;
  showBtnImprimir: Boolean;

  arrayConductores: Array<ConductorModel>;
  arrayCompaniaTransporte: Array<TransportCompanyModel>;
  arrayMedioTransporte: Array<MedioTransporteModel>;

  arrayGuiaRetiro: Array<GuiasRetiroModel>;

  ret: any;

  constructor(public globals: Globals,
    public router: Router,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService,
    public validadorDatos: ValidadorDatos,
    public transportaData: DataTransportDistpacthService,
    public guiaRetiroService: GuiasRetiroService) {
      this.inputOCRut = ConstantFieldForm.INPUT_INIT_EMPTY;
      this.showTransportCompany = false;
      this.showBtnImprimir = false;

  }

  ngOnInit() {

    this.messageValidBoolean = false;
    this.dtOptions = this.configTable.dtOptionsWithinScrollX;
    this.arrayCompaniaTransporte = this.transportaData.loadCompanyTransport();
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

  buscarGuiasRetiro() {
    if (this.inputOCRut === undefined || this.inputOCRut === '') {
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
    this.getGuiasRetiro();
  }


  getGuiasRetiro() {
  //    this.guiaRetiroService.getGuiasRetiro(this.inputOCRut).subscribe((res: any) => this.ret = res,
  //    error => () => {
  //    },
  //    () => {
  //       this.arrayGuiaRetiro = this.ret.guiasRetiro;
  //    }
  //  );

  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    this.dtTrigger.next();
  });

  this.arrayGuiaRetiro = DummyServices.arrayGuiaRetiro;
  this.dtTrigger.next();

  }

  saveTransportInfo() {
    // Metodo con el cual se guardara la configuracion del transporte
     console.log('datos guardados exitosamente');
     this.showTransportCompany = this.showTransportCompany === true ? false : true;

  }

  hide() {
    this.messageValidBoolean = true ? false : true;
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

  showTransport(guiaRetiro: GuiasRetiroModel) {
       this.showTransportCompany = this.showTransportCompany === false ? true : false;
       this.showBtnImprimir = this.showBtnImprimir === false ? true : false;
  }

  imprimirDocumentos(){

  }

}
