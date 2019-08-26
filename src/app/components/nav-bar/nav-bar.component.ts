import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user:userSession = null;

  links:any[] = []

  constructor(
    private router: Router,
    public _user:UserService
  ) { }

  ngOnInit() {
    this.user = this._user.getUser();
    if (this.user == null) this.links = [
      { 'path': '/home',         'name':'Inicio' },
      { 'path': '/news',         'name':'Noticias' }
    ];
    else if (!this.user.admin) this.links = [
      { 'path': '/home',           'name':'Inicio' },
      { 'path': '/news',           'name':'Noticias' },
      { 'path': '/user/draft',     'name':'Empresas' },
      { 'path': '/user/chat',      'name':'Consultas' }
    ];
    else this.links = [
      { 'path': '/home',           'name':'Inicio' },
      { 'path': '/news',           'name':'Noticias' },
      { 'path': '/admin/draft',    'name':'Empresas' },
      { 'path': '/admin/chat',     'name':'Consultas' },
      { 'path': '/admin/report',   'name':'Reportes' },
      { 'path': '/admin/user/:id', 'name':'Usuarios' }
    ];
  }
  logout(){
    this._user.logout();
    this.router.navigate(['/401']);
  }
         
}
