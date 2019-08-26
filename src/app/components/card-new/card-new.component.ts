import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss']
})
export class CardNewComponent implements OnInit {
  @Input() title: String = 'Cargando';
  @Input() date: Date = new Date();
  @Input() capital: Boolean = false;
  @Input() img: String = 'https://cdn.pixabay.com/photo/2015/04/20/13/45/wool-731515_960_720.jpg';
  
  
  constructor() { }

  ngOnInit() {
  }

}
