import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { news } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  prefigo:string = "news";

  constructor(
    private httpClient: HttpClient
  ) { }

  get_all(){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }

  post(data:news){    
    return this.httpClient.post(environment.URLAPI + this.prefigo, data, this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  get(id:string){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo + "?id=" + id).pipe(
        catchError(this.handleError)
    )
  }

  put(noticia:news){
    return this.httpClient.put(environment.URLAPI + this.prefigo ,noticia, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }

  delete(id:string){
    return this.httpClient.delete<any>(environment.URLAPI + this.prefigo + "/" + id, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }



  /**
   * Genera el headers de los riquest
   */
  getheaders(){
    let Token = this.getToken();
    if (Token != '') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
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
  /**
   * Cacheo de errores
   * @param error 
   */
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
