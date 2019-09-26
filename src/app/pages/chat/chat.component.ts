import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private _MetadataService :MetadataService
    ) { }

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
  }

}
