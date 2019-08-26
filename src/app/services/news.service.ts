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

  prefigo:string = "api/Noticias";

  constructor(
    private httpClient: HttpClient
  ) { }

  get_all(){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }

  get_active(){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo + "/activas", this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }

  post(data:news){    
    return this.httpClient.post<any>(environment.URLAPI + this.prefigo, data, this.getheaders()  ).pipe(
        catchError(this.handleError)
    )
  }

  get(id:string){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo + "/" + id).pipe(
        catchError(this.handleError)
    )
  }

  put(noticia:news){
    return this.httpClient.put<any>(environment.URLAPI + this.prefigo + "/" + noticia.id,noticia, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }

  delete(id:string){
    return this.httpClient.delete<any>(environment.URLAPI + this.prefigo + "/" + id, this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }



  getheaders(){
    return {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
      })
    };
  }
  private getToken() {
    if (localStorage.getItem("user") && localStorage.getItem("user") != '') {
        let Session = JSON.parse(localStorage.getItem("user"));
        return Session.remember_token;
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
