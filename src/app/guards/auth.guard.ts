import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
      private _user: UserService, 
      private router: Router, 
      private activatedRoute: ActivatedRoute) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let rut = (state.url).split('/');
      if ( ( rut[1] == 'login' || rut[1] == 'registro' || rut[1] == 'registry') && this._user.isLogeado() ) this.router.navigate(['/']);
      else if ( ( rut[1] == 'login' || rut[1] == 'registro' || rut[1] == 'registry' ) && !this._user.isLogeado() ) return true;
      else if ( rut[1] == 'home' || rut[1] == 'news' ) return true; 
      else if (
        ( rut[1] == 'admin'  && this._user.isLogeado() && this._user.getAdmin())  || 
        ( rut[1] == 'user'   && this._user.isLogeado() && !this._user.getAdmin()   ) 
      ) return true;
      else this.router.navigate(['/401']);
    }
}
