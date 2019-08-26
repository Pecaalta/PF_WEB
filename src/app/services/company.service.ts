import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  prefigo = "/company";

  constructor(
    private httpClient: HttpClient
  ) { }

  getSector(){
    return this.httpClient.get<any[]>(environment.URLAPI + this.prefigo + '/sector', this.getheaders() ).pipe(
        catchError(this.handleError)
    )
  }
  
  add(data){
    return this.httpClient.post<any>(environment.URLAPI + this.prefigo + "/add", data, this.getheaders()).pipe(
        catchError(this.handleError)
    )
  }

  myConpany(){
    return this.httpClient.get<any[]>(environment.URLAPI + this.prefigo + "/myCompany",this.getheaders()).pipe(
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
