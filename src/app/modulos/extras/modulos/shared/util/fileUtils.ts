export class FileUtil {
    fileExample: File;
    lectura: FileReader;
    docContentB64: string;
    nombreDocumento: string;
    mimeType: string;
    blob: any;
    byteArrays: any;
    byteCharacters: string;
    offset: number;
    i: number;
    byteNumbers: any[];
    slice: string;
    carga: boolean;
    size: number;
    public readFile(inputValue: any): void {
        this.lectura = new FileReader();
        this.carga = false;
        if (inputValue.files.length > 0) {
        this.fileExample = inputValue.files[0];
            this.lectura.onload = (e) => {
                this.docContentB64 = this.lectura.result.substr(
                    this.lectura.result.search('base64,') + 7,
                    this.lectura.result.length
                );
                this.carga = true;
                this.nombreDocumento = this.fileExample.name;
                this.size = this.fileExample.size;
            };
            this.lectura.readAsDataURL(this.fileExample);
            this.mimeType = this.fileExample.type;
        }
    }
    public generateFile(b64Data, contentType, sliceSize, titulo): void {
        contentType = contentType || '';
        titulo = titulo || '';
        sliceSize = sliceSize || 512;
        this.byteCharacters = atob(b64Data);
        this.byteArrays = [];
        for (this.offset = 0; this.offset < this.byteCharacters.length; this.offset += sliceSize) {
            this.slice = this.byteCharacters.slice(this.offset, this.offset + sliceSize);
            this.byteNumbers = new Array(this.slice.length);
            for (this.i = 0; this.i < this.slice.length; this.i++) {
                this.byteNumbers[this.i] = this.slice.charCodeAt(this.i);
            }
            this.byteArrays.push(new Uint8Array(this.byteNumbers));
        }
        this.blob = new Blob(this.byteArrays, {type: contentType});
        this.mimeType = contentType;
        this.nombreDocumento = titulo;
    }
}