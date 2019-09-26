import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _MetadataService :MetadataService
  ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

}
