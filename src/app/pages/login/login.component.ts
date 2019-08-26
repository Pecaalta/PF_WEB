import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string = '';
  pass:string = '';
  constructor(
    private _snackBar: MatSnackBar,
    private _user:UserService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this._user.login(this.email,this.pass).subscribe(
      (oResult) => {
        let user:userSession = oResult;
        localStorage.setItem('user', JSON.stringify(user));
        this._router.navigate(['home']);
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
