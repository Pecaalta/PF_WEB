import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {

  constructor(
    private _MetadataService :MetadataService
    ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

}
