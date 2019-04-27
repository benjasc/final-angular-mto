import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { Session } from 'protractor';
import { TableConfigEmisionGDE } from '../../../gde/util/tableConfig.util';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IngresoProgSectoresService } from '../../services/ingresoProgSectores.Services';
import { IngresoProgSectores } from '../../model/ingresoProgSectores.model';

@Component({
  selector: 'app-ingreso-prog-sectores',
  templateUrl: './ingreso-prog-sectores.component.html',
  styleUrls: ['./ingreso-prog-sectores.component.scss']
})
export class IngresoProgSectoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
