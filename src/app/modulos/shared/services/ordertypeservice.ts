import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OrderTypeService {
  public url_api: string;

  constructor(private http: HttpClient) {
    this.url_api = environment.url_api;
  }

  getOrderType() {
    console.log('getOrderType');
    return this.http.get(this.url_api + '/getOrderType').pipe(map(res => res));
  }
}
