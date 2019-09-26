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

  prefigo = "User";

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getId() {
    let user = localStorage.getItem('SessionUser');
    try {
      if (user) user = JSON.parse(user);
      return user['id'];
    } catch (error) {
      return false;
    }
  }

  register(data){
    return this.httpClient.post(environment.URLAPI + this.prefigo, data , this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  login(email, pass){ 
    let data = {'user' : email, 'pass' : pass};
    return this.httpClient.post(environment.URLAPI + "Auth", data, this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }
  logout(){
    localStorage.removeItem('SessionUser');
  }

  getAdmin() {
    let user = localStorage.getItem('SessionUser');
    try {
      if (user) user = JSON.parse(user);
      return user['admin'] == '1';
    } catch (error) {
      return false;
    }
  }
  isLogeado() {
    let user = localStorage.getItem('SessionUser');
    try {
      if (user) user = JSON.parse(user);
      return user['remember_token'] != '';
    } catch (error) {
      return false;
    }
  }

  getUser(){
    let user = localStorage.getItem('SessionUser');
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
    let Token = this.getToken();
    
    if (Token == '') {
      return {
        headers: new HttpHeaders({
            'Authorization': Token
        })
      };
    } else {
      
    return {
      headers: new HttpHeaders({})
    };
    }
  }
  /**
  * Devuleve el token en caso de tener un usuario logueado(almacenado en local storage)
  */
  private getToken() {
    if (localStorage.getItem("SessionUser") && localStorage.getItem("SessionUser") != '') {
        let Session = JSON.parse(localStorage.getItem("SessionUser"));
        if (Session != null) return Session.remember_token;
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
