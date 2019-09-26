import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { news } from 'src/app/models/news';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {

  noticia:news = {
    html: "",
    description: "",
    title: "",
    Base64: null,
    id_User: null
  }
  form:FormGroup = null;
  
  constructor(
    private _MetadataService :MetadataService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _news:NewsService,
    private _route:ActivatedRoute,
    private _router: Router
  ) { 
  }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    if (this._route.snapshot.params.id != null && this._route.snapshot.params.id !=  'create') {
      this._news.get(this._route.snapshot.params.id).subscribe(
        (e)=>{
          this.noticia = e;
          this.imagePath = environment.URLAPI + '/' + e.url_img
        }
      );
    }
  }

  public imagePath;
  public message: string;
 
  preview(files) {
    if (files.length === 0) return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.noticia.Base64 = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imagePath = reader.result.toString();
      this.noticia.Base64 = reader.result.toString();
    }
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '500px',
      minHeight: '500',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: environment.URLAPI + '/imge',
    sanitize: true,
    toolbarPosition: 'top',
  };

  create(){
    if (this.noticia.html == '') this.msg('Una noticia no puede crearse sin contenido');
    else if (this.noticia.title == '') this.msg('Las noticias tienen q tener titulo');
    else if (this.noticia.Base64 == null && this.noticia.url_img == null) this.msg('No puede aver noticia sin una portada');
    else {
      let sub = null;
      
      if (this._route.snapshot.params.id == null || this._route.snapshot.params.id ==  'create') 
        sub = this._news.post(this.noticia);
      else {
        this.noticia.id = this._route.snapshot.params.id; 
        sub = this._news.put(this.noticia);
      } 
      sub.subscribe(
        (oResult) => {
          this._router.navigate(['/admin/news']);
        },
        (oError) => {
          this.msg(oError.body.message);
        }
      );
    } 
  }
  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
