import { Injectable } from '@angular/core';
import { SearchService } from './../../shared/services/searchservice';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable()
export class AreaService {

  methodSearchInfo: String = '/searchInfoArea/';
  methosSearchInfoUpdate: String = '/searchInfoUpdateArea';
  methodInsert: String = '/insertArea/';
  methodUpdate: String = '/updateArea/';
  methodDelete: String = '/deleteArea/';
  methodValidate: String = '/validateArea/';

  public url_api: string;

  constructor(private http: HttpClient, public searchService: SearchService) {
    this.url_api = environment.url_api;
  }

  searchInfo(idAreaProfile: String, nameArea: String) {
    console.log( ' ididAreaProfile: ' + idAreaProfile + ' nameArea: ' + nameArea  );
    const apiURL = this.url_api + this.methodSearchInfo;
    return this.http.post(apiURL, {
      'idAreaProfile': +idAreaProfile,
      'nameArea': nameArea
    }).pipe(map(res => res));
  }


  searchInfoUpdate(idAreaProfile: string) {
    console.log( ' idAreaProfile:  ' + idAreaProfile  );
    const apiURL = this.url_api + this.methosSearchInfoUpdate;
    return this.http.post(apiURL, {
      'idAreaProfile': +idAreaProfile
    }).pipe(map(res => res));
  }


  insert(nameAreaInsert: String) {
    console.log('nameAreaInsert: '  + nameAreaInsert );
    const apiURL = this.url_api + this.methodInsert;
    return this.http.post(apiURL, {
      'nameArea': nameAreaInsert}).pipe(map(res => res));
  }

  update(idAreaProfileUpdate: String, nameAreaUpdate: String) {
    console.log('idAreaProfileUpdate: ' + idAreaProfileUpdate + ' nameAreaUpdate:  ' +  nameAreaUpdate );
    const apiURL = this.url_api + this.methodUpdate;
    return this.http.post(apiURL, {
      'idAreaProfile': idAreaProfileUpdate,
      'nameArea': nameAreaUpdate
      }).pipe(map(res => res));
  }


  delete(idAreaProfileUpdate: String) {
    console.log('eliminar idAreaProfileUpdate ' + idAreaProfileUpdate );
    const apiURL = this.url_api + this.methodDelete;
    return this.http.post(apiURL, {
      'idAreaProfile': idAreaProfileUpdate
    }).pipe(map(res => res));
  }

  validateArea(nameAreaInsert: String) {
    console.log('nameAreaInsert: ' + nameAreaInsert );
    const apiURL = this.url_api + this.methodValidate;
    return this.http.post(apiURL, {
      'nameArea': nameAreaInsert
    }).pipe(map(res => res));
  }

}
