import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lNews:any[] = [];
  loade:boolean = false;
  admin:boolean = false;

  constructor(
    private _MetadataService :MetadataService,
    private _user:UserService,
    private _news:NewsService
  ) {
    this.admin = this._user.getAdmin();
    this._news.get_all().subscribe(
      (e)=> {
        this.lNews = e;
        this.loade = true;
      }
    ); }
  
  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

}
