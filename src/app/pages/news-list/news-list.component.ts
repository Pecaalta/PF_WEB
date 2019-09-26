import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { MetadataService } from 'src/app/services/metadata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  lNews:any[] = [];
  admin:boolean = false;
  bDone:boolean = false;
  
  constructor(
    private _MetadataService :MetadataService,
    private _router: Router,
    private _user:UserService,
    private _news:NewsService
  ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    this.admin = this._user.getAdmin();
    this.bDone = false;
    this._news.get_all().subscribe(
      (e)=> {
        this.lNews = e;
        this.bDone = true;
      },
      () => {
        this._router.navigate(['404']);
        this.bDone = true;
      }
    );
  }

}
