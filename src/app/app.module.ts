// tslint:disable-next-line: max-line-length
import { AutorizarMedioPagoComponent } from './modulos/extras/modulos/aprobacionDte/components/autorizar-medio-pago/autorizar-medio-pago.component';
import { BlockInfoComponent } from './modulos/ordenes/components/block-info/block-info.component';
import { ModalAlertComponent } from './modulos/shared/components/modalAlert/modalAlert.component';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modulos/shared/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modulos/ordenes/components/dashboard/dashboard.component';
import { LoginComponent } from './modulos/shared/components/login/login.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ChartsModule } from 'ng2-charts';
import { MenuComponent } from './modulos/shared/components/menu/menu.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { OrderComponent } from './modulos/shared/components/order/order.component';
import { Globals } from './modulos/shared/utils/globals';
import { SearchComponent } from './modulos/ordenes/components/search/search.component';
import { AccordionModule } from 'ngx-accordion';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { ModalModule } from 'ngx-modal';
import { InconsistenciasOcComponent } from './modulos/ordenes/components/inconsistencias-oc/inconsistencias-oc.component';
import { NwbModule } from 'ng-wizi-bulma';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './modulos/shared/services/searchservice';
import { InconsistenciasOcService } from './modulos/ordenes/services/inconsistencias-oc.service';
import { EmailService } from './modulos/shared/services/email.service';
import { HttpModule } from '@angular/http';
import { DashboardService } from './modulos/ordenes/services/dashboard.service';
import { ConversorPipe } from './pipe/conversor.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { OrderByPipe} from './pipe/orderby';
import { CapitalizePipe} from './pipe/capitalize.pipe';
import { WelcomePipe} from './pipe/welcome.pipe';
import { LoadingComponent } from './modulos/shared/components/loading/loading.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MessageService } from './modulos/shared/services/message.service';
import { NumberDirectiveDirective } from './directives/number-directive.directive';
import { RutDirective } from './directives/RutDirective';
import { SkuDirective } from './directives/SkuDirective';
import { NumberOnlyDirective } from './directives/OnlyNumber.directive';
import { TrimPipe } from './pipe/trim.pipe';
import { WelcomeComponent } from './modulos/ordenes/components/welcome/welcome.component';
import { FormatPipe } from './pipe/format.pipe';
import { MantenedorUserComponent } from './modulos/mantenedores/components/mantenedor-user/mantenedor-user.component';
import { MantenedorUserService } from './modulos/mantenedores/services/mantenedor.user.service';
import { LogService } from './modulos/shared/services/log.service';
import { MaintainerProfileComponent } from './modulos/mantenedores/components/maintainer-profile/maintainer-profile.component';
import { MaintainerProfileService } from './modulos/mantenedores/services/maintainer-profile.service';
import { EscapeHtmlPipe  } from './pipe/keep-html.pipe';
import { MantenedorParametrosComponent } from './modulos/mantenedores/components/mantenedor-parametros/mantenedor-parametros.component';
import { MaintainerParameterService } from './modulos/mantenedores/services/maintainer-parameter.service';
import { OrderTypeService } from './modulos/shared/services/ordertypeservice';
import { DataTablesModule } from 'angular-datatables';
import { TableConfig } from './modulos/extras/modulos/shared/util/tableConfig.util';
import { DetalleNcComponent } from './modulos/extras/modulos/notaCredito/components/detalle-nc/detalle-nc.component';
import { MedioPagoService } from './modulos/extras/modulos/aprobacionDte/services/medio-pago.service';
import { TableConfiguration } from './modulos/extras/modulos/shared/util/tableContiguration.util';
// tslint:disable-next-line: max-line-length
import { BusquedaListadoNcComponent } from './modulos/extras/modulos/notaCredito/components/busqueda-listado-nc/busqueda-listado-nc.component';
import { TableConfigurationFull } from './modulos/extras/modulos/shared/util/tableContigurationFull.util';
import { OnlyNumberDirective } from './modulos/extras/modulos/shared/directives/only-number.directive';
import { ConfCajaService } from './modulos/extras/modulos/configuracion/service/conf-caja.service';
import { AprobacionManualService } from './modulos/extras/modulos/aprobacionDte/services/aprobacion-manual.service';
import { ReglasDteAutomaticaService } from './modulos/extras/modulos/configuracion/service/reglas-dte-automatica.service';
import { SapService } from './modulos/extras/modulos/sap/services/sap-service.service';
import { UtilServiceService } from './modulos/extras/modulos/shared/util/util-service.service';
// tslint:disable-next-line: max-line-length
import { ConfiguracionCajasComponent } from './modulos/extras/modulos/configuracion/components/configuracion-cajas/configuracion-cajas.component';
// tslint:disable-next-line: max-line-length
import { AprobacionManualDteComponent } from './modulos/extras/modulos/aprobacionDte/components/aprobacion-manual-dte/aprobacion-manual-dte.component';
// tslint:disable-next-line: max-line-length
import { ReglasGeneracionDteautomaticoComponent } from './modulos/extras/modulos/configuracion/components/reglas-generacion-dteautomatico/reglas-generacion-dteautomatico.component';
import { GrupoReglasPagoSeguroService } from './modulos/extras/modulos/configuracion/service/grupo-reglas-pago-seguro.service';
// tslint:disable-next-line: max-line-length
import { AdministracionGrupoMedioPagoSeguroComponent } from './modulos/extras/modulos/configuracion/components/administracion-grupo-medio-pago-seguro/administracion-grupo-medio-pago-seguro.component';
import { VariableMedioPagoService } from './modulos/extras/modulos/configuracion/service/variable-medio-pago.service';
// tslint:disable-next-line: max-line-length
import { VariablesValidacionMedioPagoComponent } from './modulos/extras/modulos/configuracion/components/variables-validacion-medio-pago/variables-validacion-medio-pago.component';
import { ReporteCierreCajaComponent } from './modulos/extras/modulos/reporte/components/reporte-cierre-caja/reporte-cierre-caja.component';
// tslint:disable-next-line: max-line-length
import { BuscarEstadosDespachoComponent } from './modulos/extras/modulos/despacho/components/buscar-estados-despacho/buscar-estados-despacho.component';
// tslint:disable-next-line: max-line-length
import { GestionDevolucionDebitoComponent } from './modulos/extras/modulos/sap/components/gestion-devolucion-debito/gestion-devolucion-debito.component';
import { GenerarAcreedorSapComponent } from './modulos/extras/modulos/sap/components/generar-acreedor-sap/generar-acreedor-sap.component';
import { GenerarNcmanualComponent } from './modulos/extras/modulos/notaCredito/components/generar-ncmanual/generar-ncmanual.component';
import { NotaCreditoService } from './modulos/extras/modulos/notaCredito/services/nota-credito.service';
import localeCl from '@angular/common/locales/es-CL';
import localeClExtra from '@angular/common/locales/extra/es-CL';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaintainerAreaComponent } from './modulos/mantenedores/components/maintainer-area/maintainer-area.component';
import { AreaService } from './modulos/mantenedores/services/area.service';
import { AuthInterceptor } from './modulos/shared/interceptors/tokenInterceptor.interceptor';
import { EmisionUnitariaGdeComponent } from './modulos/gde/components/emisionUnitariaGde/emisionUnitariaGde.component';
// tslint:disable-next-line: max-line-length
import { ModalConfigTransporteComponent } from './modulos/gde/components/emisionUnitariaGde/configTransporteModal/configTransporte.component';
import { EmisionUnitariaGdeService } from './modulos/gde/services/emisionUnitariaGde.service';
import { TableConfigEmisionGDE } from './modulos/gde/util/tableConfig.util';
import { ValidadorDatos } from './modulos/gde/util/validador.util';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InfoTransportCompanyService } from './modulos/gde/services/cargaDatosTransporte.service';
import { DataTransportDistpacthService } from './modulos/gde/services/cargaDatosTransporte.common.service';
import { UtilGDEService } from './modulos/gde/services/paisUsuario.service';
import { EmisionMasivaGdeComponent } from './modulos/gde/components/emisionMasivaGde/emisionMasivaGde.component';
import { EmisionMasivaGdeService } from './modulos/gde/services/emisionMasivaGde.service';
import { SistemaGestionOrdenesComponent } from './modulos/sgo/components/consultaOC/sistema-gestion-ordenes/sistema-gestion-ordenes.component';
import { OcService } from './modulos/sgo/services/oc.service';
import { TableConfigSgo } from './modulos/sgo/util/tableConfigSgo.util';

registerLocaleData(localeCl, 'es-CL', localeClExtra);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    BlockInfoComponent,
    LoginComponent,
    MenuComponent,
    BackOfficeComponent,
    OrderComponent,
    SearchComponent,
    InconsistenciasOcComponent,
    ConversorPipe,
    OrderByPipe,
    ConversorPipe,
    ModalAlertComponent,
    LoadingComponent,
    NumberDirectiveDirective,
    RutDirective,
    SkuDirective,
    NumberOnlyDirective,
    CapitalizePipe,
    WelcomePipe,
    TrimPipe,
    WelcomeComponent,
    FormatPipe,
    MantenedorUserComponent,
    MaintainerProfileComponent,
    EscapeHtmlPipe,
    MantenedorParametrosComponent,
    MaintainerAreaComponent,
    DetalleNcComponent,
    BusquedaListadoNcComponent,
    BusquedaListadoNcComponent,
    OnlyNumberDirective,
    ConfiguracionCajasComponent,
    AprobacionManualDteComponent,
    ReglasGeneracionDteautomaticoComponent,
    AdministracionGrupoMedioPagoSeguroComponent,
    VariablesValidacionMedioPagoComponent,
    ReporteCierreCajaComponent,
    BuscarEstadosDespachoComponent,
    GestionDevolucionDebitoComponent,
    GenerarAcreedorSapComponent,
    GenerarNcmanualComponent,
    AutorizarMedioPagoComponent,
    EmisionUnitariaGdeComponent,
    ModalConfigTransporteComponent,
    EmisionMasivaGdeComponent,
    SistemaGestionOrdenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    AccordionModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NwbModule,
    HttpModule,
    HttpClientModule,
    MyDatePickerModule,
    NgxPaginationModule,
    DataTablesModule,
    PdfViewerModule,
    BootstrapModalModule.forRoot({container : document.body})
  ],
  providers: [
    Globals,
    SearchService,
    InconsistenciasOcService,
    DashboardService,
    DatePipe,
    ConversorPipe,
    MessageService,
    EmailService,
    MantenedorUserService,
    LogService,
    MaintainerProfileService,
    MaintainerParameterService,
    OrderTypeService,
    AreaService,
    TableConfig,
    MedioPagoService,
    TableConfiguration,
    TableConfigurationFull,
    ConfCajaService,
    AprobacionManualService,
    ReglasDteAutomaticaService,
    SapService,
    UtilServiceService,
    GrupoReglasPagoSeguroService,
    VariableMedioPagoService,
    NotaCreditoService,
    TableConfigEmisionGDE,
    EmisionUnitariaGdeService,
    ValidadorDatos,
    InfoTransportCompanyService,
    DataTransportDistpacthService,
    EmisionMasivaGdeService,
    UtilGDEService,
    OcService,
    TableConfigSgo,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  entryComponents: [
    ModalAlertComponent,
    LoadingComponent,
    ModalConfigTransporteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
