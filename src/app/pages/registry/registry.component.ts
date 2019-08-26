import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  
  email:string = '';
  name:string = '';
  pass:string = '';
  repass:string = '';
  constructor(
    private _snackBar: MatSnackBar,
    private _user:UserService,
    private _router: Router
  ) { }


  ngOnInit() {
  }

  login(){
    if (this.email == '') this.msg('Falta el mail');
    if (this.pass == '') this.msg('Faltea el pass');
    if (this.repass == '') this.msg('Falta repetir pass');
    if (this.repass != this.pass) this.msg('No coinciden');
    else 
      this._user.register({email: this.email, name: this.name, password :this.pass}).subscribe(
        (oResult) => {
          this._router.navigate(['login']);
        },
        (oError) => {
          this.msg(oError.body);
        }
      );
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
