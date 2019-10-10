import { OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import * as html2canvas from "html2canvas";
import { Component, ElementRef, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem,transferArrayItem} from '@angular/cdk/drag-drop';
import { stringify } from '@angular/compiler/src/util';

interface moduleHtml {
    "font-size"?: String, 
    'color'?: String,      
    'margin-bottom-unite'?: String,
    'margin-bottom-value'?: String,
    'margin-top-unite'?: String,
    'margin-top-value'?: String,
    'margin-left-unite'?: String,
    'margin-left-value'?: String,
    'margin-right-unite'?: String,
    'margin-right-value'?: String,
    'background-color'?: String,
    'background-img'?: String,
    'text-align'?: String,
    'src'?: String,
    'alt'?: String,
    'href'?: String,
    'text'?: String,
    'type': String,
    'html': String,
  }


@Component({
  selector: 'app-newletter-form',
  templateUrl: './newletter-form.component.html',
  styleUrls: ['./newletter-form.component.scss']
})
export class NewletterFormComponent implements OnInit {
  tab:number = 0;
  noticia:any = {
    html: "",
    description: "",
    title: "",
    Base64: null,
    id_User: null
  }
  imagePath:string = '';
  constructor(
    private _MetadataService :MetadataService,
    private _snackBar: MatSnackBar,
    private _route:ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.lModule.forEach((e) => {
      e['html'] = this.create_html(e['config']);
    });
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
/*
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;*/
  create() {
   /* this.screen.nativeElement.innerHTML  = this.noticia.html;
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });*/
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }



  lModule:any[] = [
    { 
      name: 'Titulo',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Titulo',
        text: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Sub-Titulo',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Sub-Titulo',
        text: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Titulo de seccion',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Titulo de seccion',
        text: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Parrafo',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Parrafo',
        text: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Link',
      icon: 'fas fa-link',
      html: '',
      config: {
        name: 'Link',
        text: '',
        href: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Boton',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Boton',
        text: '',
        href: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Imagen',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Imagen',
        src: '',
        alt: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null

      }
    },{ 
      name: 'Separador',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Separador',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Sociles',
      icon: 'fas fa-image',
      html: '',
      config: {
        name: 'Sociles',
        text: '',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    },{ 
      name: 'Logo',
      icon: 'fas fa-image',
      html: '',
      config: {
        text: '',
        name: 'Logo',
        'font-size': null,
        'color': null,
        'background-color': null,
        'background-img': null,
        'text-align': null,
        'margin-bottom-value': null,
        'margin-bottom-unite': null,
        'margin-top-value': null,
        'margin-top-unite': null,
        'margin-left-value': null,
        'margin-left-unite': null,
        'margin-right-value': null,
        'margin-right-unite': null
      }
    }
/*
    {
      name: 'nombre 1', 
      img: 'assets/editor/1.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 2', 
      img: 'assets/editor/2.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 3', 
      img: 'assets/editor/3.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 4', 
      img: 'assets/editor/4.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 5', 
      img: 'assets/editor/5.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 6', 
      img: 'assets/editor/6.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 7', 
      img: 'assets/editor/7.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },{
      name: 'nombre 8', 
      img: 'assets/editor/8.svg',
      type: 0,
      config: {
        title: 'Hola'
      }
    },
*/
  ];

  number:number = 0;
  html = [
    [
      [
        
      ],[
        
      ]
    ],[
      [
        
      ]
    ]
  ];
  editBody(options,irow,icol){
    this.number ++;
    switch (options) {
      case 'add-start-col':
        this.html[irow].splice(0, 0, [[1]]);
        break;
      case 'add-end-col':
        this.html[irow].push([]);
        break;
      case 'add-row':
        this.html.push([[[]]]);
        break;
      case 'remove-col':
        if (this.html[irow].length == 1) this.html.splice(irow, 1);
        else this.html[irow].splice(icol, 1);
        break;
    }
  }











  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('moveItemInArray',event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transferArrayItem',event);
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  
  create_html(oModule:any){
    let style = [];
    if ( oModule['font-size'] != null ) style['font-size'] = oModule['font-size'];
    if ( oModule['color'] != null ) style['color'] = oModule['color'];
    if ( oModule['background-color'] != null ) style['background-color'] = oModule['background-color'];
    if ( oModule['background-img'] != null ) style['background-img'] = oModule['background-img'];
    if ( oModule['text-align'] != null ) style['text-align'] = oModule['text-align'];
    if ( oModule['margin-bottom-value'] != null ) {
      if ( oModule['margin-bottom-unite'] != null )  style['margin-bottom'] = oModule['margin-bottom-value'] + oModule['margin-bottom-unite'];
      else  style['margin-bottom'] = oModule['margin-bottom-value'];
    } 
    if ( oModule['margin-top-value'] != null ) {
      if ( oModule['margin-top-unite'] != null )  style['margin-top'] = oModule['margin-top-value'] + oModule['margin-top-unite'];
      else  style['margin-top'] = oModule['margin-top-value'];
    } 
    if ( oModule['margin-left-value'] != null ) {
      if ( oModule['margin-left-unite'] != null )  style['margin-left'] = oModule['margin-left-value'] + oModule['margin-left-unite'];
      else  style['margin-left'] = oModule['margin-left-value'];
    } 
    if ( oModule['margin-right-value'] != null ) {
      if ( oModule['margin-right-unite'] != null )  style['margin-right'] = oModule['margin-right-value'] + oModule['margin-right-unite'];
      else  style['margin-right'] = oModule['margin-right-value'];
    }
    let html = '';
    console.log(oModule['name']);
    
    switch (oModule['name']) {
      case 'Titulo':
        html = '<h1 style="' + style + '" >' + oModule['text'] + '</h1>';
      break;
      case 'Sub-Titulo':
        html = '<h2 style="' + style + '" >' + oModule['text'] + '</h2>';
      break;
      case 'Titulo de seccion':
        html = '<h3 style="' + style + '" >' + oModule['text'] + '</h3>';
      break;
      case 'Parrafo':
        html = '<p style="' + style + '" >' + oModule['text'] + '</p>';
      break;
      case 'Link':
        html = "<a href='' style='" + style + "' >" + oModule['text'] + "</a>";
      break;
      case 'Boton':
        html = '<button style="' + style + '" >' + oModule['text'] + '</button>';
      break;
      case 'Imagen':
        html = '<img src="' + oModule['src'] + '" alt="' + oModule['alt'] + '" style="' + style + '" >';
      break;
      case 'Separador':
          html = '<hr style="' + style + '" >';
      break;
      case 'Sociles':
        html = '<div class="social" style="' + style + '" ></div>';
      break;
      case 'Logo':
        break;
      default:
        break;
    }
    console.log(this.lModule);
    
    return html;
  }
}
