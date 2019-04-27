import { OrderComponent } from './modulos/shared/components/order/order.component';
import { DashboardComponent } from './modulos/ordenes/components/dashboard/dashboard.component';
import { LoginComponent } from './modulos/shared/components/login/login.component';
import { SearchComponent } from './modulos/ordenes/components/search/search.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InconsistenciasOcComponent } from './modulos/ordenes/components/inconsistencias-oc/inconsistencias-oc.component';
import { WelcomeComponent } from './modulos/ordenes/components/welcome/welcome.component';
import { MantenedorUserComponent } from './modulos/mantenedores/components/mantenedor-user/mantenedor-user.component';
import { MaintainerProfileComponent } from './modulos/mantenedores/components/maintainer-profile/maintainer-profile.component';
import { MantenedorParametrosComponent } from './modulos/mantenedores/components/mantenedor-parametros/mantenedor-parametros.component';
import { MaintainerAreaComponent } from "./modulos/mantenedores/components/maintainer-area/maintainer-area.component";
import { EmisionUnitariaGdeComponent } from './modulos/gde/components/emisionUnitariaGde/emisionUnitariaGde.component';
import { EmisionMasivaGdeComponent } from './modulos/gde/components/emisionMasivaGde/emisionMasivaGde.component';
import { SistemaGestionOrdenesComponent } from './modulos/sgo/components/consultaOC/sistema-gestion-ordenes/sistema-gestion-ordenes.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'back-office', component: BackOfficeComponent,
    children: [
      { path: '', redirectTo: (sessionStorage.getItem('flagRoute') === 'dashboard' ? 'dashboard' : 'welcome'), pathMatch: 'full' },
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//      { path: 'mtd', component: MtdComponent },
//      { path: 'login', component: LoginComponent },
      { path: 'sistema-gestion-ordenes', component: SistemaGestionOrdenesComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'welcome', component: WelcomeComponent},
      { path: 'search', component: SearchComponent },
      { path: 'order/:ordernumber', component: OrderComponent },
      { path: 'inconsistencias-oc', component: InconsistenciasOcComponent },
      { path: 'mantenedor-user', component: MantenedorUserComponent },
      { path: 'maintainer-profile', component: MaintainerProfileComponent },
      { path: 'maintainer-area', component: MaintainerAreaComponent },
      { path: 'maintainer-parameter', component: MantenedorParametrosComponent },
      { path: 'gdeUnitaria', component: EmisionUnitariaGdeComponent },
      { path: 'gdeMasivo', component: EmisionMasivaGdeComponent }

       // { path: '**', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
