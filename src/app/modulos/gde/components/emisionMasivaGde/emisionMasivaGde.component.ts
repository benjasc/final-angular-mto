import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Renderer,
  Inject
} from "@angular/core";
import { Globals } from "../../../shared/utils/globals";
import { Router } from "@angular/router";
import { EmisionUnitariaModel } from "../../vo/emisionUnitariaGde.model";
import { EmisionUnitariaGdeService } from "../../services/emisionUnitariaGde.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { TableConfigEmisionGDE } from "../../util/tableConfig.util";
import { MessageService } from "../../../shared/services/message.service";
import { DialogService } from "ng2-bootstrap-modal";

import { EmisionMasivoGDEModel } from "../../vo/emisionMasivoGde.model";
import { DummyServices } from "../../util/util.model";
import { RouterConstanst } from "../../util/constant.util";
import { BranchOfficeModel } from "../../vo/branchOffice.model";
import { EmisionMasivaGdeService } from "../../services/emisionMasivaGde.service";

@Component({
  selector: " app-emisionmasiva ",
  templateUrl: "./emisionMasivaGde.component.html",
  styleUrls: ["./emisionMasivaGde.component.scss"]
})
export class EmisionMasivaGdeComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild("myModalEmailInfo") myModalEmailInfo;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  arrayEmisionMasiva: Array<EmisionMasivoGDEModel>;
  arrayListSucursalesByPais: Array<BranchOfficeModel>;

  selectBranchOffice: String = '0';
  radioButtonSelected: String;
  inputOCRut: String;

  messageValidBoolean: Boolean;
  messageValid: String;

  ret: any;

  constructor(
    public globals: Globals,
    public router: Router,
    public emisionMasivaGdeService: EmisionMasivaGdeService,
    public configTable: TableConfigEmisionGDE,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.inputOCRut = '';
    this.arrayEmisionMasiva = new Array();
  }

  ngOnInit() {
    this.selectBranchOffice = '0';
    this.messageValidBoolean = false;
    this.dtOptions = this.configTable.dtOptionsWithinScrollX;
    this.getBranchOfficeByCountry();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  detalleMasivo(objMasivoGde: EmisionMasivoGDEModel) {
    sessionStorage.setItem("objMasivoGde", JSON.stringify(objMasivoGde));
    this.router.navigate([RouterConstanst.ROUTE_DETALLE_GDEMASIVO]);
  }

  refrescarTable() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  getBranchOfficeByCountry() {

    this.emisionMasivaGdeService.getBeanchOfficeByCountry().subscribe(
      (res: any) => (this.ret = res),
      error => () => {},
      () => {
        this.arrayListSucursalesByPais = this.ret.data;
      }
    );
  }

  buscarMasivas() {
    this.getGuiasDespachoMasivo();
  }
  // Metodo de busca los manifiestos en base a un codigo de oficina
  getGuiasDespachoMasivo() {
    this.messageService.cargando(true);
    this.emisionMasivaGdeService.getManifiestos(this.selectBranchOffice).subscribe(
      (res: any) => (this.ret = res),
      error => () => {},
      () => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   // Se destruye la tabla anterior para ser reemplazada con los nuevos datos
          dtInstance.destroy();
          //   // LLamada a dtTrigger para renderizar datos
          this.dtTrigger.next();
        });
        this.arrayEmisionMasiva = this.ret;
        this.messageService.cargando(false);
      }
    );

  }
}
