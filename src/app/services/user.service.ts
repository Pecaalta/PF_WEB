import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { userSession } from '../models/userSession';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  prefigo = "";

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getId() {
    return '0';
  }

  register(data){
    return this.httpClient.post<any>(environment.URLAPI + this.prefigo + "/add", data , this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  login(email, pass){ 
    return this.httpClient.post<userSession>(environment.URLAPI + this.prefigo + "/login", {'user' : email, 'pass' : pass} ).pipe(
        catchError(this.handleError)
    )
  }
  logout(){
    localStorage.removeItem('user');
  }

  getAdmin() {
    let user = localStorage.getItem('user');
    try {
      if (user) user = JSON.parse(user);
      return user['admin'];
    } catch (error) {
      return false;
    }
  }
  isLogeado() {
    let user = localStorage.getItem('user');
    try {
      if (user) user = JSON.parse(user);
      return user['remember_token'] != '';
    } catch (error) {
      return false;
    }
  }

  getUser(){
    let user = localStorage.getItem('user');
    try {
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  /**
   * Genera el headers de los riquest
   */
  getheaders(){
    return {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this.getToken()
      })
    };
  }
  /**
  * Devuleve el token en caso de tener un usuario logueado(almacenado en local storage)
  */
  private getToken() {
    if (localStorage.getItem("SessionSeguros") && localStorage.getItem("SessionSeguros") != '') {
        let Session = JSON.parse(localStorage.getItem("SessionSeguros"));
        return Session.token;
    }
    return '';
  }
  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
      } else {
          console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
      }
      return throwError(
          {
              code: error.status,
              body: error.error
          }
      );
  }

}
