import { Component, OnInit } from '@angular/core';
import { newProyect } from 'src/app/models/newProyect';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

declare let L;

@Component({
  selector: 'app-draft-new',
  templateUrl: './draft-new.component.html',
  styleUrls: ['./draft-new.component.scss']
})
export class DraftNewComponent implements OnInit {

  nDraft:newProyect = {
    name: '',
    rut: '',
    debts: '',
    x: null,
    y: null,
    ods: [false,false,false,false,false,false,false,false,false,false,false,false],
    sector: []
  }

  sUrlApi:string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _Company: CompanyService
    ) { }

  // Mapa
  layerGroup = null;
  Maps = null;
  marker = null;
  markerPopup = null;

  ngOnInit() {
    // Geolocalisacion
    navigator.geolocation.getCurrentPosition(location => {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      this.Maps.setView(latlng, 13);
      this.marker.setLatLng(latlng);
      this.nDraft.x = location.coords.latitude;
      this.nDraft.y = location.coords.longitude;
    });
    //Crea mapa
    this.Maps = L.map('map').setView([-34.340289, -56.712430], 13);
    this.layerGroup = L.layerGroup().addTo(this.Maps);
    this.markerPopup = L.popup().setLatLng([0,0]).setContent("Aqui estaría tu restaurante ").openOn(this.layerGroup);
    this.marker = L.marker([-34.340289, -56.712430]).addTo(this.layerGroup);
    let marker = this.marker;
    let nDraft = this.nDraft;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(this.Maps);
    this.Maps.on('click', function (e) {      
      marker.setLatLng(e.latlng);
      nDraft.x = e.latlng.latitude;
      nDraft.y = e.latlng.longitude;
    });

    this._Company.getSector().subscribe(
      (oResult) => {
        this.nDraft.sector = []; 
        oResult.map((e) => {
          e.status = false; 
          e.img = environment.URLAPI + '/' + e.img;
          this.nDraft.sector.push(e); 
        });
      },
      (oError) => {
        this.msg('Error no se pudieron traer los sectores');
      },
    );
  }

  newProyect(){
    if (this.nDraft.name == '') this.msg('Falta el nombre para poder continuar');
    else if (this.nDraft.rut == '')  this.msg('Falta el RUT para poder continuar');
    else if ((Number(this.nDraft.rut)).toString() != this.nDraft.rut)  this.msg('El RUT deven ser todos numeros');
    else if (this.nDraft.rut.length == 12)  this.msg('El RUT son 12 digitos');
    else if (!this.nDraft.ods.reduce((a,b)=> a || b)) this.msg('No hay ningun ODS seleccionado');
    else if (this.nDraft.description == '') this.msg('La descripcion es obligatorio');
    else {      
      this._Company.add(this.nDraft).subscribe(
        (oResult) => {
          this.msg('Todo a salido ok');
        },
        (oError) => {
          this.msg(oError.body);
        },
      );
    }
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
