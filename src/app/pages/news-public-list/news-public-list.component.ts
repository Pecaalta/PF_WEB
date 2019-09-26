import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-news-public-list',
  templateUrl: './news-public-list.component.html',
  styleUrls: ['./news-public-list.component.scss']
})
export class NewsPublicListComponent implements OnInit {
  lNews:any[] = [];
  admin:boolean = false;
  url:string = environment.URLAPI;
  constructor(
    private _MetadataService :MetadataService,
    private _user:UserService,
    private _news:NewsService
  ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    this.admin = this._user.getAdmin();
    this._news.get_all().subscribe(
      (e)=> {
        this.lNews = e;
      }
    );
  }


}
