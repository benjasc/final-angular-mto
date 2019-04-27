export class NcVencimientoRET {

    public odencompra: number;
    public modeloDespacho: string;
    public estadoCud:string;
    public motivo:string;

    constructor(){
        this.odencompra = 0;
        this.modeloDespacho = undefined;
        this.estadoCud = undefined;
        this.motivo = undefined;
    }
}