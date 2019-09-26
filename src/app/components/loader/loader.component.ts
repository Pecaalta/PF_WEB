import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 0,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class LoaderComponent implements OnInit {

  constructor(
    public _LoaderService:LoaderService
  ) { }

  

  ngOnInit() {
  }

}
