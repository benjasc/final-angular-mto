import { DatePipe } from '@angular/common';

export class FechaUtil {
    DATE_FMT: string;
    DATE_PIPE: DatePipe;

constructor() {
    this.DATE_FMT  = 'dd/MM/yyyy';
    this.DATE_PIPE = new DatePipe('en');
}
    public formatearFecha(fecha: Date) {
        return this.DATE_PIPE.transform(fecha, this.DATE_FMT);
    }
}
