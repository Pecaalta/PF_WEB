import { Component, OnInit } from '@angular/core';
import { newProyect } from 'src/app/models/newProyect';
import { news } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  noticia:news = {
    html: '',
    created_at: new Date() ,
    description: '',
    title: 'DSFDSF',
    Base64: null,
    id_User: null
  }
  url:string =  window.location.href; 
  urlApi:string = environment.URLAPI; 
  loader:boolean = false;
  loaderBaner:boolean = false;

  constructor(
    private _news: NewsService,
    private _route:ActivatedRoute,
    private _location : Location,
    private _MetadataService :MetadataService
  ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    this._news.get(this._route.snapshot.params.id).subscribe(
      (e)=>{
        this.noticia = e;
        this._MetadataService.SetMeta(
          this.noticia.title,
          this.noticia.description,
          '',
          this.noticia.title,
          this.noticia.url_img,
          'image/png',
          'index, follow',
          null
        );
      }
    );
  }

  printComponent(cmpName:HTMLElement) {
    console.log(cmpName);
    
    window.print();
}

onImageLoad(evt) {
  if (evt && evt.target) {
    const width = evt.target.naturalWidth;
    const height = evt.target.naturalHeight;
    const portrait = height > width ? true : false;
    console.log(width, height, 'portrait: ', portrait);
    this.loaderBaner = true;
  }
}

}
