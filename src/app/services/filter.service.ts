import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  prefigo = "/filter";

  constructor(
    private httpClient: HttpClient
  ) { }


  post(data){
    return this.httpClient.post<any>(environment.URLAPI + this.prefigo, data, this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  put(data){
    return this.httpClient.put<any>(environment.URLAPI + this.prefigo, data, this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  getAll(){
    return this.httpClient.get<any[]>(environment.URLAPI + this.prefigo ,this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  get(id:string){
    return this.httpClient.get<any>(environment.URLAPI + this.prefigo + '?id=' + id ,this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  delete(id:string){
    return this.httpClient.delete<any>(environment.URLAPI + this.prefigo + '/' + id, this.getheaders() ).pipe(
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
    if (localStorage.getItem("SessionUser") && localStorage.getItem("SessionUser") != '') {
        let Session = JSON.parse(localStorage.getItem("SessionUser"));
        return Session.remember_token;
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
