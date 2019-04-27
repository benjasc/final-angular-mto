import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { EndpointServiceRest } from '../../gde/services/constant.service.util';


import { environment } from '../../../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor() {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const url: string = req.url.toString();


     const urlConstantsServices = [
      environment.url_bt + EndpointServiceRest.GET_DISPATCHGUIDE,
      environment.url_api + '/getStoresFromCompany/1',
      environment.url_api + '/auth'
    ];
     if (urlConstantsServices.includes(url)) {
      return next.handle(req);
     } else {
      const authToken = sessionStorage.getItem('token');
      console.log('Envio pantalla a imprimir');
      console.log(sessionStorage.getItem('token'));
      const authReq = req.clone({headers: req.headers.set('X-Auth', authToken), method: req.method});
      console.log('Auth Req');
      console.log(authReq);
      return next.handle(authReq);
     }
   }
}
