import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable()
export class MaintainerProfileService {

  methodSearchProfileInfo: String = '/profileInfo/';
  methodProfileUpdate: String = '/profileUpdate/';
  methodProfileInsert: String = '/profileInsert/';
  methodModuleProfileUpdate: String = '/moduleProfileUpdate/';
  methodModuleProfileInsert: String = '/moduleProfileInsert/';

  methodSearchProfileInfoUpdate: String  = '/profileInfoUpdate/';
  methodSearchProfileInfoInsert: String  = '/profileInfoInsert/';
  methodSearchModuleProfileInfoInsert: String = '/moduleProfileInfoInsert/';

  public url_api: string;

  constructor(private http: HttpClient) {
      this.url_api = environment.url_api;
  }

  getProfile() {
    console.log('getProfile');
    return this.http.get(this.url_api + '/getProfile').pipe(map(res => res));
  }

  getAccess() {
    console.log('getAccess');
    return this.http.get(this.url_api + '/getAccess').pipe(map(res => res));
  }

  searchInfoProfile(idProfile: String, area: String, perfil: string) {
    console.log( 'searchInfoProfile: ' + ' idProfile : ' + idProfile + ' area: ' + perfil );
    const apiURL = this.url_api + this.methodSearchProfileInfo;
    return this.http.post(apiURL, {
      idProfile: +idProfile,
      area: area, perfil: perfil
    }).pipe(map(res => res));
  }

  searchInfoProfileUpdate(idProfile: string) {
    console.log( 'searchInfoProfileUpdate:  ' + idProfile );
    const apiURL = this.url_api + this.methodSearchProfileInfoUpdate;
    return this.http.post(apiURL, {
      idProfile: +idProfile, status: -1, access: -1
    }).pipe(map(res => res));
  }

  searchInfoProfileInsert(status: string) {
    console.log( 'searchInfoProfileInsert: ' + status );
    const apiURL = this.url_api + this.methodSearchProfileInfoInsert;
    return this.http.post(apiURL, {
      status: +status
    }).pipe(map(res => res));
  }

  searchInfoModuleProfileInsert(status: string) {
    console.log( 'ModuleProfileInsert: ' + status );
    const apiURL = this.url_api + this.methodSearchModuleProfileInfoInsert;
    return this.http.post(apiURL, {
      status: +status
    }).pipe(map(res => res));
  }

  editProfile(idProfile: String, area: String, perfil: String) {
    console.log('editProfile ' + idProfile + ' / ' + '' + area + ' / ' + perfil );
    const apiURL = this.url_api + this.methodProfileUpdate;
    return this.http.post(apiURL, {
      idProfile: +idProfile,
      area: area,
      perfil: perfil
    }).pipe(map(res => res));
  }

  editModuleProfile(idProfile: number, idModule: number, idAccess: number) {
    console.log('editModuleProfile  ' + idProfile + ' / '  + idModule + ' / ' + idAccess );
    const apiURL = this.url_api + this.methodModuleProfileUpdate;
    return this.http.post(apiURL, {
      idProfile: idProfile,
      idModule: idModule,
      idAccess: idAccess
    }).pipe(map(res => res));
  }

  insertProfile(area: String, perfil: String) {
    console.log('insertar perfiles ' + '' + area + ' >> ' + perfil );
    const apiURL = this.url_api + this.methodProfileInsert;
    return this.http.post(apiURL, {
      area: area,
      perfil: perfil
    }).pipe(map(res => res));
  }

  insertModuleProfile(idProfile: number, idModule: number, idAccess: number) {
    console.log('insertModuleProfile ' + idProfile + ' / ' + '' + idModule + ' / ' + idAccess );
    const apiURL = this.url_api + this.methodModuleProfileInsert;
    return this.http.post(apiURL, {
      idProfile: idProfile,
      idModule: idModule,
      idAccess: idAccess
    }).pipe(map(res => res));
  }
}
