import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable()
export class LoginService {
    private metodo: string;
    public url_api: string;

    constructor(public http: HttpClient) {
        this.url_api = environment.url_api;
    }

    getCompanies() {
        this.metodo = '/getCompanies';
        return this.http.get(this.url_api + this.metodo).pipe(map(res => res));
    }

    getStoresFromCompany(idCompany: string) {
        this.metodo = '/getStoresFromCompany/';
        return this.http.get(this.url_api + this.metodo + idCompany).pipe(map(res => res));
    }
/*
    private handleError(error: any) {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
*/
    loginUser(user: string, password: string, cadena: string) {
        this.metodo =  '/auth';
        return this.http.post(this.url_api + this.metodo, {
            'user': user,
            'password': password,
            'cadena': cadena
        }, {}).pipe(map(res => res));
    }

    insertLogLogout(idEvent: number, orderNumber: number, idUser: number) {
        this.metodo = '/insertlog/' + idEvent + '/' + orderNumber + '/' + idUser;
        return this.http.get(this.url_api + this.metodo).pipe(map(res => res));
    }
    /*
    Metodo para insertar log
    @param Integer, idEvent 1	LogIn - 2	LogOut - 3	Empujar Error - 4	Modificar Email -5	Modificar DTE - 6	Reenvio Email
    @param Integer, Numero de orden
    @param Integer, id usuario
    */
    insertLogAuth(idEvent: number, orderNumber: number, idUser: number) {
        this.metodo = '/insertlog/' + idEvent + '/' + orderNumber + '/' + idUser;
        return this.http.get(this.url_api + this.metodo).pipe(map(res => res));
    }
    // metodo para eliminar regitro de la tabla sesion
    logoutDeleteSession(idUser: number) {
        this.metodo =  '/logoutDeleteSession/' + idUser;
        console.log(idUser);
        return this.http.get(this.url_api + this.metodo).pipe(map(res => res));
    }

}
