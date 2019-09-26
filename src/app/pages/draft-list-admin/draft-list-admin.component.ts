import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/modals/delete/delete.component';
import { ChangesStateCompanyComponent } from 'src/app/components/modals/changes-state-company/changes-state-company.component';
import { MetadataService } from 'src/app/services/metadata.service';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { FilterComponent } from 'src/app/components/modals/filter/filter.component';

declare let L;


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-draft-list-admin',
  templateUrl: './draft-list-admin.component.html',
  styleUrls: ['./draft-list-admin.component.scss']
})
export class DraftListAdminComponent implements OnInit {
  
  lFilter:any[] = [];
  idFilter:string = '';
  oFilter:any = {};
  bDone:boolean = false;
  
  MarckComparar:boolean = true;
  MarckMax:number = 1; // numero maximo del atributo
  MarckMin:number = 1; // numero minimo del atributo
  MarckMaxSize:number = 45; // maximo marcador
  MarckMinSize:number = 20; // minimo marcador
  comparador:string = 'personal';

  constructor(
    private _news: NewsService,
    private _MetadataService :MetadataService,
    private _company:CompanyService,
    private _Filter:FilterService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.bDone = false;
    this._MetadataService.setDefaultMeta();
    this.Maps = L.map('map').setView([-34.340289, -56.712430], 8);
    this.layerGroup = L.layerGroup().addTo(this.Maps);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.Maps);

    this.loadCompany();
    this.loadFilter();

  }

  customisar(){
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.oFilter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) return;
      this.oFilter = result;
      this.loadCompany();
    });
  }
  
  aplication(){
    this.loadCompany();
  }

  loadFilter() {
    this._Filter.getAll().subscribe(
      (e) => {
        if (e['status']) this.lFilter = e['message'];
        else this.msg(e['message']);
      },
      (oError) => {
        this.msg(oError.body.message);
      }
    )
  }

  loadCompany(){
    this._company.getAll(this.oFilter).subscribe(
      (e)=>{
        if (e['status']) {
          this.dataSource = e['message'];
          this.layerGroup.clearLayers();
          
          this.dataSource.forEach(e => {
            if (e[this.comparador] > this.MarckMax) this.MarckMax = e[this.comparador];
            if (e[this.comparador] < this.MarckMin) this.MarckMin = e[this.comparador]; 
          });
  
          this.dataSource.forEach(e => {
            this.addMarksMaps(e.x, e.y, e.title, e.status, e.sector_url, this.comparador != '' ? e[this.comparador] : null );      
          });
          this.bDone = true;
        } else {
          this.bDone = true;
          this.msg(e['message']);
        }
      }
    );
  }

  loder(filter){
    this.oFilter = filter;
    this.loadCompany();
  }

  // Mapa
  layerGroup = null;
  Maps = null;
  reloder() {
    this.layerGroup.clearLayers();
  }


  addMarksMaps(x,y,title,status,icon,comparador){
    if (x != null && y != null) {
      let color = status == 2 ? 'red' : status == 0 ? 'orange' : 'blue'
      let data = null;
      if (this.MarckComparar && comparador != null) {
        let w = ((this.MarckMax / (this.MarckMin + comparador)) * this.MarckMaxSize) + this.MarckMinSize 
        console.log(w);
        data = {
          icon: icon,
          markerColor: color,
          iconAnchor: [w, w * (45/35)],
          iconSize: [w, w * (45/35)],
        } 
        
      } else {
        data = {
          icon: icon,
          markerColor: color,
        }
      }

      var redMarker = L.AwesomeMarkers.icon(data);
      L.marker([x,y], {icon: redMarker}).addTo(this.layerGroup)
      //L.marker([x,y]).addTo(this.layerGroup)
      .bindPopup(title);

    }
  }

  toDraft(draft,el: HTMLElement){
    this.Maps.setView(new L.LatLng(draft.x, draft.y), 15);
    el.scrollIntoView();
  }

  // Tabla
  displayedColumns: string[] = ['id', 'title', 'rut'];
  dataSource: any[] = [];


  delete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { text: 'Esta seguro desea eliminar la noticia' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._company.delete(id).subscribe(
          (e)=>{
            this.loadCompany();
          },
          (oError) => {
            this.msg(oError.body.message);
          }
        );
      }
    });
  }

  edit(id) {
    this._router.navigate(['/admin/draft/'+id]);
  }

  changeStateCompany(empresa) {
    const dialogRef = this.dialog.open(ChangesStateCompanyComponent, {
      width: '400px',
      data: { 
        value: empresa.status,
        id: empresa.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this._company.changeStateCompany(result).subscribe(
          (e)=>{
            this.loadCompany();
          },
          (oError) => {
            this.msg(oError.body.message);
          }
        );
      }
    });
  }


  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
