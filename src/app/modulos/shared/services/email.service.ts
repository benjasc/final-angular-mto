import { Utils } from './../../shared/utils/utils';
import { Injectable, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { MessageService } from './../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchService } from './searchservice';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmailService {
  methodSearchEmail: String = '/email/';
  methodUpdateEmail: String = '/emailCustomerUpdate/';
  methodDetailEmail: String = '/emailByOC/';
  methodForwardEmail: String = '/forwardEmail/';
  methodDetailAllEmail: String = '/allEmailByOC/';
  methodSearchEmailTemplate: String = '/emailTemplateInfo/';
  methodUpdateEmailTemplate: String = '/emailTemplateUpdate/';
  public url_api: string;
  results: Object[];
  resultsEmailByOC: Object[];
  loadings: boolean;
  loadingModificarEmail: boolean;
  loadingForwardEmail: boolean;
  formarRut: string;
  resultUpdate = [];

  tipoDoc: string;
  // tslint:disable-next-line:max-line-length
  @ViewChild('myModalEmailInfo')
  myModalEmailInfo;
  utils: Utils;

  constructor(private http: HttpClient, private messageService: MessageService,
    private dialogService: DialogService, public searchInfo: SearchService, private router: Router) {
      this.loadings = false;
      this.loadingModificarEmail = false;
      this.loadingForwardEmail = false;
      this.results = [];
      this.url_api = environment.url_api;
      this.tipoDoc = 'rut';
      this.utils = new Utils(this.messageService, this.router, this.dialogService);
  }

  getEmailTemplate() {
    console.log('getEmailTemplate');
    return this.http.get(this.url_api + '/getEmailTemplate').pipe(map(res => res));
  }

  searchEmailTemplate(idEmail: Number, idStore: number, name: string, description: String, subject: String, to: String, from: String) {
    console.log(idEmail + '>>>' + idStore + '>>>' + name + '>>>' + description + '>>>' + subject + '>>>' + to + '>>>' + from);
    this.loadings = true;
  const apiURL = this.url_api + this.methodSearchEmailTemplate;
  this.http.post(apiURL, {
      idEmail: idEmail,
      idStore: idStore,
      name: name,
      description: description,
      subject: subject,
      to: to,
      from: from
    }).subscribe(
      res => {
        console.log(res);
        this.utils.validarRespuestaFormatear(res);
        this.loadings = false;
        if (this.results.length === 0) {
          this.messageService.enviarMensaje('Error búsqueda', ['Sin Resultados'], 'info', this.dialogService);
        }
      },
      err => {
        this.loadings = false;
        console.log('Error occured');
        this.messageService.enviarMensaje('Error búsqueda', ['Error en servicio de búsqueda'], 'info', this.dialogService);
        console.log(err);
      }
    );
  }

  searchEmailBounced(rut: string, dni: string, oc: string, fechadesde: String, email: String, fechahasta: String) {
    console.log(rut + '>>>' + oc + '>>>' + fechadesde + '>>>' + email + '>>>' + fechahasta);
    //this.loadings = true;
    //this.messageService.cargando(this.loadings);
    const apiURL = this.url_api + this.methodSearchEmail;
    return this.http.post(apiURL, {
      rutCliente: rut,
      dniCliente: dni,
      ordenCompra: oc,
      fechaDesde: fechadesde,
      email: email,
      fechaHasta: fechahasta
    }).pipe(map(res => res));
  }

  editMailInfo(orden: string, newMail: string, oldMail: String, idUser: String) {
    console.log('modificar email ' + oldMail + ' por ' + newMail + ' de la orden ' + orden + ' usuario ' + idUser);
    const apiURL = this.url_api + this.methodUpdateEmail;
    return this.http.post(apiURL, {
      orderCompra: orden,
      email: newMail,
      user: idUser,
      oldValue: oldMail
    }).pipe(map(res => res));
  }

  editEMailTemplateInfo(idEmail: String, emailDescription: String, emailSubject: String,
    emailFrom: String, emailName: String, emailBody: String) {
    console.log('modificar email template ' + idEmail + ' >> ' + emailDescription + '>>' + emailSubject +
    ' >> ' + emailFrom + ' >> ' + emailName + '>>' + emailBody);

    this.loadingModificarEmail = true;
    const apiURL = this.url_api + this.methodUpdateEmailTemplate;
    this.http.post(apiURL, {
      idEmail: idEmail,
      name: emailName,
      description: emailDescription,
      subject: emailSubject,
      from: emailFrom,
      body: emailBody
    }).subscribe(
      res => {
        this.utils.validarRespuestaFormatear(res);
        if (this.results['response'] !== 200) {
          this.loadingModificarEmail = false;
          this.messageService.enviarMensaje('Error actualizar email template', ['Error Actualizar Email Template'],
          'info', this.dialogService);
        } else {
          this.loadingModificarEmail = false;
          this.messageService.enviarMensaje('Actualizar Mail Template', ['Email Template actualizado correctamente'],
          'info', this.dialogService);
        }
      },
      err => {
        this.loadingModificarEmail = false;
        this.messageService.enviarMensaje('Error actualizar email template', ['Error servicio actualizar email template'],
        'info', this.dialogService);
        console.log(err);
      }
    );
  }

  detailEmailByOC(oc: string) {
    console.log('detailEmailByOC : ' + oc);
    const apiURL = this.url_api + this.methodDetailEmail;
    return this.http.post(apiURL, { ordenCompra: oc }).pipe(map(res => res));
  }

  detailEmailByOCFailed(oc: string) {
    console.log('detailEmailByOCFailed');
    const apiURL = this.url_api + this.methodDetailEmail;
    return this.http.post(apiURL, { ordenCompra: oc }).pipe(map(res => res));
  }

  detailAllEmailByOC(oc: string) {
    console.log('detailAllEmailByOC : ' + oc);

    const apiURL = this.url_api + this.methodDetailAllEmail;

    return this.http.post(apiURL, { ordenCompra: oc }).pipe(map(res => res));
  }

  detailAllEmailByOCFailed(oc: string) {
    console.log('detailAllEmailByOCFailed');
    const apiURL = this.url_api + this.methodDetailAllEmail;
    return this.http.post(apiURL, { ordenCompra: oc }).pipe(map(res => res));
  }

  forwardEmail(oc: string, endp: string, emailType: string, orderType: string, idFailedEmail: Number, idUser: String) {
    console.log('forwardEmail');
    const apiURL = this.url_api + this.methodForwardEmail;
    return this.http.post(apiURL, {
        orderNumber: oc,
        endpoint: endp,
        typeEmail: emailType,
        ordeType: orderType,
        idFailedEmail: idFailedEmail,
        idUser: idUser
      }).pipe(map(res => res));
  }

  forwardEmailFailed(oc: string, endp: string, agrupar: String, emailType: string, orderType: string, idFailedEmail: Number) {
    console.log('forwardEmailFailed');
    const apiURL = this.url_api + this.methodForwardEmail;
    return this.http.post(apiURL, {
      orderNumber: oc,
      endpoint: endp,
      typeEmail: emailType,
      ordeType: orderType,
      idFailedEmail: idFailedEmail
    }).pipe(map(res => res));
  }

  insertLog(idEvent: number, orderNumber: number, idUser: String) {
    console.log('idUSer = ' + idUser);
    const method = '/insertlog/' + idEvent + '/' + orderNumber + '/' + idUser;
    return this.http.get(this.url_api + method).pipe(map(res => res));
  }

  // Botón limpiar, todo a valor inicial
  cleanResults() {
    this.loadings = false;
    this.loadingModificarEmail = false;
    this.loadingForwardEmail = false;
    this.results = [];
    this.resultsEmailByOC = [];
    this.resultUpdate = [];
    this.url_api = environment.url_api;
    this.tipoDoc = 'rut';
  }

}
