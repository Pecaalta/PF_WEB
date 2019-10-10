import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageCroppedComponent } from 'src/app/components/modals/image-cropped/image-cropped.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
    Base64: '',
    currentpass: ''
  }
  loader:boolean = false;
  loaderBaner:boolean = false;
  done:boolean = false;
  

  constructor(
    private _MetadataService :MetadataService,
    private _snackBar: MatSnackBar,
    private _user:UserService,
    private _router: Router,
    private _route:ActivatedRoute,
    public dialog: MatDialog
  ) { 
  }


  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    let id = null;
    
    if (this._route.snapshot.params.id != null && this._user.getAdmin()) {
      id = this._route.snapshot.params.id;
    } else {
      id = this._user.getId();
    }

    this._user.get(id).subscribe(
      (e)=>{
        this.user = e;
        this.imagePath = environment.URLAPI + '/' + e.url_img
      }
    );
    
  }

  login(){
    this.user.CI = this.user.CI.replace(".", "");
    this.user.CI = this.user.CI.replace("-", "");
    this.user.CI = this.user.CI.replace(" ", "");

    if (this.user.email == '') this.user.email = null;
    if (this.user.name == '') this.user.name = null;
    if (this.user.age == '') this.user.age = null;
    if (this.user.CI == '') this.user.CI = null;
    if (this.user.phone == '') this.user.phone = null;
    else if (this.user.password == '') this.user.password = null;
    else if (this.user.repass == '') this.user.repass = null;

    if (this.user.currentpass == '') this.msg('Falta el contraseña actual');
    else if (this.user.age != null && this.user.age.match(/^[0-9]+$/) == null) this.msg('La edad tiene que ser un numero');
    else if (this.user.CI != null && this.user.CI.match(/^[0-9]+$/) == null) this.msg('El formato de la cedula no es corecto');
    else if (this.user.phone != null && this.user.phone.match(/^[0-9]+$/) == null) this.msg('El formato del telefono no es valido');
    else if (this.user.repass != null && this.user.password != null && this.user.repass != this.user.password) this.msg('No coinciden');
    else 
      this._user.put(this.user).subscribe(
        (oResult) => {
          if (oResult['status']) {
            this.done = true;
          } else {
            this.msg(oResult['message']);
          }
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

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }















}
