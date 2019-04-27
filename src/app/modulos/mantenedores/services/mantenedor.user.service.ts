import { SearchService } from './../../shared/services/searchservice';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable()
export class MantenedorUserService {
  methodSearchUserInfo: String = '/userInfo/';
  methodUserUpdate: String = '/userUpdate/';
  methodUserInsert: String = '/userInsert/';
  methodUserDelete: String = '/userDelete/';
  methodUserChangedState: String = '/userChangedState/';
  methodSearchUserInfoUpdate: String  = '/userInfoUpdate/';
  methodUserValidate: String = '/userValidate/';

  public url_api: string;
  // results: Object[];
  // resultsEmailByOC: Object[];
  // loadings: boolean;
  // loadingModificarEmail: boolean;
  // loadingDeleteUser: boolean;
  // loadingInsertUSer: boolean;
  // loadingModificarUser: boolean;
  // loadingForwardEmail: boolean;
  // formarRut: string;
  // resultUpdate = [];
  // tipoDoc: string;

  constructor(private http: HttpClient, public searchInfo: SearchService) {
    // this.loadings = false;
    // this.loadingModificarEmail = false;
    // this.loadingForwardEmail = false;
    // this.results = [];
    this.url_api = environment.url_api;
    // this.tipoDoc = 'rut';
  }

  getUser() {
    console.log('getUser');
    return this.http.get(this.url_api + '/getUser/-1/1/-1').pipe(map(res => res));
  }

  getProfile() {
    console.log('getProfile');
    return this.http.get(this.url_api + '/getProfiles').pipe(map(res => res));
  }

  searchInfoUser(idUser: String, username: String, status: string, idProfile: String, nameLastName: String, idStore: number) {
    console.log( ' idUser : ' + idUser + ' username: ' + username + ' status: ' +  status + ' idProfile: ' +
    idProfile + ' nameLastName ' + nameLastName );
    const apiURL = this.url_api + this.methodSearchUserInfo;
    return this.http.post(apiURL, {
      idUser: +idUser,
      status: +status,
      name: '-1',
      username: (username !== '' ? username : '-1'),
      idStrore: idStore,
      idProfile: idProfile,
      nameLastName: nameLastName
    }).pipe(map(res => res));
  }

  searchInfoUserUpdate(idUser: string, idStrore: string, idProfile: string) {
    console.log( ' >>  ' + idUser + ' >> ' + idStrore + '  >> '  + idProfile + '' );
    const apiURL = this.url_api + this.methodSearchUserInfoUpdate;
    return this.http.post(apiURL, {
      idUser: +idUser,
      idStrore: +idStrore,
      idProfile: +idProfile
    }).pipe(map(res => res));
  }

  insertUser(idStore: String, idProfile: String, status: String, email: String, lastName: String, name: String, userName: String) {
    console.log('insertar user ' + ' >> ' + idStore + ' >> ' + idProfile + ' >> ' + status + ' >> ' + email + ' >> ' + lastName +
      ' >> ' + name + '>>' + userName);
    const apiURL = this.url_api + this.methodUserInsert;
    return this.http.post(apiURL, {
      idStore: idStore,
      idProfile: idProfile,
      status: status,
      email: email,
      lastName: lastName,
      name: name,
      userName: userName,
      password: '' }).pipe(map(res => res));
  }

  editUser(idUser: String, idStore: String, idProfile: String, status: String
      , email: String, lastName: String, name: String, userName: String) {
    console.log('modificar user ' + idUser + ' >> ' + '' + idStore + ' >> ' + idProfile
      + ' status >>'  + status + '>>' + email + ' >> ' + lastName + ' >> ' + name + '>>' + userName);
    const apiURL = this.url_api + this.methodUserUpdate;
    return this.http.post(apiURL, {
      idUser: idUser,
      idStore: idStore,
      idProfile: idProfile,
      status: status,
      email: email,
      lastName: lastName,
      name: name,
      userName: userName
      }).pipe(map(res => res));
  }

   changedUserState(idUser: String, idStore: String, status: String) {
    console.log('eliminar user ' + idUser + ' >> ' + '' + status + ' ' + status);
    const apiURL = this.url_api + this.methodUserChangedState;
    return this.http.post(apiURL, {
      idUser: idUser,
      idStore: idStore,
      status: status
    }).pipe(map(res => res));
  }

  deleteUser(idUser: String, idStore: String, idProfile: String) {
    console.log('eliminar user ' + idUser + ' >> ' + '' + idStore + ' ' + idProfile);
    const apiURL = this.url_api + this.methodUserDelete;
    return this.http.post(apiURL, {
      idUser: idUser,
      idStore: idStore,
      idProfile: idProfile
    }).pipe(map(res => res));
  }


  validateUser(idStore: String, userName: String) {
    console.log('validate user ' + idStore + ' >> ' + '' + userName );
    const apiURL = this.url_api + this.methodUserValidate;
    return this.http.post(apiURL, {
      idStore: idStore,
      userName: userName
    }).pipe(map(res => res));
  }

}
