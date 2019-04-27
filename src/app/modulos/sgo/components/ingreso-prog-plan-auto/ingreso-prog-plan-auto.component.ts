import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IngresoProgPlanAutoService } from '../../services/ingresoProgPlanAuto.Services';
import { IngresoProgPlanAuto } from '../../model/ingresoProgPlanAuto';


@Component({
  selector: 'app-ingreso-prog-plan-auto',
  templateUrl: './ingreso-prog-plan-auto.component.html',
  styleUrls: ['./ingreso-prog-plan-auto.component.scss']
})
export class IngresoProgPlanAutoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
