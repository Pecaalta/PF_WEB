import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userSession } from 'src/app/models/userSession';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCroppedComponent } from 'src/app/components/modals/image-cropped/image-cropped.component';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  
  bg:string = ''
  user:any = {
    email : '',
    name : '',
    password : '',
    repass : '',
    age : '',
    CI : '',
    phone : '',
    url_img: '',
    Base64: ''
  }
  loader:boolean = false;
  loaderBaner:boolean = false;



  constructor(
    private _MetadataService :MetadataService,
    private _snackBar: MatSnackBar,
    private _user:UserService,
    private _router: Router,
    public dialog: MatDialog
  ) { 
  }


  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    this.randmoBg();
  }

  login(){
    this.user.CI = this.user.CI.replace(".", "");
    this.user.CI = this.user.CI.replace("-", "");
    this.user.CI = this.user.CI.replace(" ", "");

    if (this.user.email == '') this.msg('Falta el mail');
    else if (this.user.name == '') this.msg('Faltea el pass');
    else if (this.user.age == '') this.msg('Faltea el pass');
    else if (this.user.age.match(/^[0-9]+$/) == null) this.msg('La edad tiene q ser un numero');
    else if (this.user.CI == '') this.msg('Faltea el pass');
    else if (this.user.CI.match(/^[0-9]+$/) == null) this.msg('El formato de la cedula no es corecto');
    else if (this.user.phone == '') this.msg('Faltea el pass');
    else if (this.user.phone.match(/^[0-9]+$/) == null) this.msg('El formato del telefono no es valido');
    else if (this.user.password == '') this.msg('Faltea el pass');
    else if (this.user.repass == '') this.msg('Falta repetir pass');
    else if (this.user.repass != this.user.password) this.msg('No coinciden');
    else 
      this._user.register(this.user).subscribe(
        (oResult) => {
          if (oResult['status']) {
            this.msg('Se a registrado exitosamente');
          } else {
            this.msg(oResult['message']);
          }
          this._router.navigate(['login']);
        },
        (oError) => {          
          this.msg(oError.body.message);
        }
      );
  }

  onImageLoad(evt) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;
      const height = evt.target.naturalHeight;
      const portrait = height > width ? true : false;
      this.loaderBaner = true;
    }
  }
  public imagePath;
  public message: string;
 
  customisar(){

  }


  preview(files) {
    const dialogRef = this.dialog.open(ImageCroppedComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) return;      
      this.imagePath = result.base64;
      this.user.Base64 = result.base64;
    });
  }


  randmoBg(){
    this.bg = 'url(/assets/rg/' + (Math.floor(Math.random() * 5) + 1) + '.jpg)';
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


}
