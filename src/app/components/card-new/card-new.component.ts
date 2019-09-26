import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../modals/delete/delete.component';
import { environment } from 'src/environments/environment';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss']
})
export class CardNewComponent implements OnInit {
  @Input() title: String = 'Cargando';
  @Input() description: String = 'Cargando';
  @Input() date: Date = new Date();
  @Input() capital: Boolean = false;
  @Input() id: string = '0';
  @Input() admin: Boolean = false;
  @Input() img: String = 'https://cdn.pixabay.com/photo/2015/04/20/13/45/wool-731515_960_720.jpg';
  
  url:string = environment.URLAPI;
  
  constructor(
    public dialog: MatDialog,
    private _news: NewsService,
    private _router: Router
  ) { }

  ngOnInit() {
    
  }

  delete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { text: 'Esta seguro desea eliminar la noticia' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._news.delete(id).subscribe(
          (e)=>{
            console.log(e);
            
          }
        );
      }
    });
  }


}
