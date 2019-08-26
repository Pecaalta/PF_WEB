import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor() {}
  
  ngOnInit() {
    this.Maps = L.map('map').setView([-34.340289, -56.712430], 8);
    this.layerGroup = L.layerGroup().addTo(this.Maps);
    this.dataSource.forEach(e => {
      this.addMarksMaps(e.x, e.y);      
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(this.Maps);
  }

  // Mapa
  layerGroup = null;
  Maps = null;
  reloder() {
    this.layerGroup.clearLayers();
  }

  addMarksMaps(x,y){
    var greenIcon = L.icon({
      iconUrl: 'assets/m.png',
      shadowUrl: 'leaf-shadow.png',
    
      iconSize:     [38, 40], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([x,y], {icon: greenIcon}).addTo(this.layerGroup)
    //L.marker([x,y]).addTo(this.layerGroup)
    .bindPopup("<b>Hello world!</b><br>I am a popup.");
  }

  toDraft(draft){
    this.Maps.setView(new L.LatLng(draft.x, draft.y), 15);

  }

  // Tabla
  displayedColumns: string[] = ['id', 'name', 'rut'];
  dataSource: any[] = [
    {id: 1,  status: 1,  name: 'Hydrogen',    x:-34.340289, y:-56.712440, rut: 123568459685 },
    {id: 2,  status: 0,  name: 'Helium',      x:-34.440280, y:-56.812415, rut: null},
    {id: 3,  status: 1,  name: 'Lithium',     x:-34.350285, y:-56.112433, rut: 156948488541},
    {id: 4,  status: 1,  name: 'Beryllium',   x:-34.340283, y:-56.312432, rut: 896901254542},
    {id: 5,  status: 1,  name: 'Boron',       x:-34.840281, y:-56.012421, rut: 510854979811},
    {id: 6,  status: 2,  name: 'Carbon',      x:-34.440279, y:-56.212438, rut: null},
    {id: 7,  status: 1,  name: 'Nitrogen',    x:-34.340278, y:-56.512402, rut: 351402820675},
    {id: 8,  status: 1,  name: 'Oxygen',      x:-34.040281, y:-56.612433, rut: null},
    {id: 9,  status: 1,  name: 'Fluorine',    x:-34.540290, y:-56.412447, rut: 581899845558},
    {id: 10, status: 1,  name: 'Neon',        x:-34.240270, y:-56.612431, rut: 524848848002},
  ];



}
