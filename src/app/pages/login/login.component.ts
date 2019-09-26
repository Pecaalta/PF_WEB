import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string = '';
  pass:string = '';
  constructor(
    private _MetadataService :MetadataService,
    private _snackBar: MatSnackBar,
    private _user:UserService,
    private _router: Router,
    private _LoaderService:LoaderService
  ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

  login(){
    this._LoaderService.show();
    this._user.login(this.email,this.pass).subscribe(
      (oResult) => {
        if (oResult['status']) {
          let user:userSession = oResult['message'];
          localStorage.setItem('SessionUser', JSON.stringify(user));
          this._router.navigate(['home']);
        } else {
          this.msg(oResult['message']);
        }
        this._LoaderService.hide();
      },
      (oError) => {
        this._LoaderService.hide();
        this.msg(oError.body.message);
      }
    );
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
