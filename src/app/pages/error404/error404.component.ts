import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(
    private _MetadataService :MetadataService
    ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

}
