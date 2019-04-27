import { Component, OnInit } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
import { DateFormat } from './dateFormat';

@Component({
  selector: 'app-reporte-cierre-caja',
  templateUrl: './reporte-cierre-caja.component.html',
  styleUrls: ['./reporte-cierre-caja.component.scss']
})
export class ReporteCierreCajaComponent implements OnInit {

  fechaDesde: Date;
  fechaHasta: Date;

  formatoFechaDesde: DateFormat;
  formatoFechaHasta: DateFormat;

  myDatePickerOptionsDesde: any;
  myDatePickerOptionsHasta: any;

  myDatePickerOptionsCopy: any;

  constructor() { }

  ngOnInit() {
    this.formatoFechaDesde = new DateFormat();
    this.formatoFechaHasta = new DateFormat();

    // Fecha Desde
    const d: Date = new Date();
    this.formatoFechaDesde.myDatePickerOptions.disableSince = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
    this.formatoFechaDesde.myDatePickerOptions.disableUntil = {year: d.getFullYear(), month: d.getMonth() - 12, day: d.getDate() };
    this.myDatePickerOptionsDesde = this.formatoFechaDesde.myDatePickerOptions;
    // Fecha Hasta
    this.formatoFechaHasta.myDatePickerOptions.disableSince = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
    this.formatoFechaHasta.myDatePickerOptions.disableUntil = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
    this.myDatePickerOptionsHasta = this.formatoFechaHasta.myDatePickerOptions;
  }

  cambiaFechaDesde(event: IMyDateModel) {
    // Fecha Hasta
    this.fechaHasta = undefined;
    if (event.date.year ) {
      const d: Date = new Date();
      const d2: Date = new Date();
      this.myDatePickerOptionsCopy = Object.assign({}, this.formatoFechaHasta.myDatePickerOptions);
      this.formatoFechaHasta.myDatePickerOptions.disableSince = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
      this.myDatePickerOptionsCopy.disableUntil = {year: event.date.year, month: event.date.month, day: event.date.day - 1};
      const months = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getMonth() - d.getMonth();
      const days =  event.date.day;

      const diasDif = new Date(event.date.year + ',' + event.date.month + ',' + event.date.day).getTime() - d.getTime();
      const dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
      const meses = Math.round(dias / 31);

      if (+meses <= -3) {
        this.myDatePickerOptionsCopy.disableSince = {year: event.date.year, month: event.date.month  + 3, day: event.date.day + 1};
        if (days === 1) {
          this.myDatePickerOptionsCopy.disableUntil = {year: event.date.year, month: event.date.month, day: event.date.day};
        }
      } else {
        if (days === 1) {
          this.myDatePickerOptionsCopy.disableUntil = {year: event.date.year, month: event.date.month, day: event.date.day};
        }
      }
      this.myDatePickerOptionsHasta = this.myDatePickerOptionsCopy;
    }
    this.fechaDesde = (event.date.year > 0) ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }

  cambiaFechaHasta(event: IMyDateModel) {
    this.fechaHasta = (event.date.year > 0) ? new Date(event.date.year + ',' + event.date.month + ',' + event.date.day) : undefined;
  }


}
