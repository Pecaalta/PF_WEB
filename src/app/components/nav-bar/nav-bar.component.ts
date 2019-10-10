import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user:userSession = null;
  facebook:string = environment.facebook;
  instagram:string = environment.instagram;
  twitter:string = environment.twitter;
  links:any[] = []

  url:string = environment.URLAPI;
  
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
    else if (this.user.admin == "0") this.links = [
      { 'path': '/home',           'name':'Inicio' },
      { 'path': '/news',           'name':'Noticias' },
      { 'path': '/user/draft',     'name':'Empresas' },
      { 'path': '/user/chat',      'name':'Consultas' }
    ];
    else this.links = [
      { 'path': '/home',           'name':'Inicio' },
      { 'path': '/admin/news',     'name':'Noticias' },
      { 'path': '/admin/filters',  'name':'Filtros' },
      { 'path': '/admin/draft',    'name':'Empresas' },
      { 'path': '/admin/chat',     'name':'Consultas' },
      { 'path': '/admin/report',   'name':'Reportes' },
      { 'path': '/admin/user',     'name':'Usuarios' },
      { 'path': '/admin/newletter','name':'Difusiones' }
    ];
  }
  pascua:number = 0;
  pasc() {
    this.pascua++;
    if (this.pascua == 7) {
      var i = "Felicidades!", 
          j = " Has encontrado un pequeño secreto no digas nada, desde el pasado en el desarrollo mauro te felicita!!\n"
      var l = 'font-family:helvetica; font-size:20px; '; 
      [ [i, l + 'font-size:50px; font-weight:bold; ' + 'color:networking; -webkit-text-stroke:1px black;'], [j, l], ['', ''] ].map(function(r) { 
        setTimeout(
          console.log.bind(console, '\n%c' + r[0], r[1])); 
        }
      ); 
    } else if (this.pascua == 14) {
      var i = "YA SABEMOS QUE ERES LISTO!", 
          j = "No olvides guardar el secreto"; 
      var l = 'font-family:helvetica; font-size:15px; '; 
      [ [i, l + 'font-size:25px; font-weight:bold; ' + 'color:networking; -webkit-text-stroke:1px black;'], [j, l], ['', ''] ].map(function(r) { 
        setTimeout(
          console.log.bind(console, '\n%c' + r[0], r[1])); 
        }
      ); 
    }
    setTimeout( ()=> {if (this.pascua < 7) this.pascua = 0;},3000); 
  }
  logout(){
    this._user.logout();
    this.router.navigate(['/login']);
  }
         
}
