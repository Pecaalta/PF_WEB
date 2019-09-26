import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { MetadataService } from './services/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoWeb';
  constructor(
    private _MetadataService :MetadataService
  ){
    this._MetadataService.initDefault()
  }
  
}
