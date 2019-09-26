import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-news',
  templateUrl: './section-news.component.html',
  styleUrls: ['./section-news.component.scss']
})
export class SectionNewsComponent implements OnInit {

  @Input() capital: boolean = false; // Primera noticia superficie de 4
  @Input() linkMore: String = ''; // Linck a redireccionar en el boton mas, ase q aparesca
  @Input() color: String = ''; // Color de fondo
  @Input() title: String = ''; // Titulo
  @Input() btnNext: String = 'sdsdsd'; // btn siguiente
  @Input() btnPrev: String = 'sdsdsd'; // btn anterior
  @Input() admin: Boolean = false;
  
  @Input() data:any[] = [];

  constructor() { }

  ngOnInit() {}

  filter() {
    if (this.linkMore != '') return this.data.slice(0,4);
    else return this.data;
  }
}
