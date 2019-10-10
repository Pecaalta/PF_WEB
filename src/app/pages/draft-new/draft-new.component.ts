import { Component, OnInit } from '@angular/core';
import { newProyect } from 'src/app/models/newProyect';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from 'src/app/components/modals/create-role/create-role.component';

declare let L;

@Component({
  selector: 'app-draft-new',
  templateUrl: './draft-new.component.html',
  styleUrls: ['./draft-new.component.scss']
})
export class DraftNewComponent implements OnInit {

  nDraft:newProyect = {
    title: '',
    rut: '',
    debts: '',
    bps:'',
    description: '',
    dateStart: new Date(),
    apoyoANII: false,
    apoyoANR: false,
    apoyoGoviernoDepartamental: false,
    apoyoOtro: false,
    x: null,
    y: null,
    addres:'',
    email:'',
    phone:'',
    ods: new Array(17).fill(false),
    sector: [],
    role: [],

    web: '',
    facebook: '',
    instagram: '',
    twitter: '',
    branchactivity: '',
    
    startactivitytime: '',
    endactivitytime: '',
  }

  sUrlApi:string = '';

  constructor(
    private _MetadataService :MetadataService,
    private _snackBar: MatSnackBar,
    private _route:ActivatedRoute,
    private _Company: CompanyService,
    public dialog: MatDialog
    ) { }

  // Mapa
  layerGroup = null;
  Maps = null;
  marker = null;
  markerPopup = null;

  ngOnInit() {
    this._MetadataService.setDefaultMeta();
    //Crea mapa
    
    this.Maps = L.map('map').setView([-34.340289, -56.712430], 13);
    this.layerGroup = L.layerGroup().addTo(this.Maps);
    this.markerPopup = L.popup().setLatLng([0,0]).setContent("Aqui te encuntras").openOn(this.layerGroup);
    var redMarker = L.ExtraMarkers.icon({
      icon: 'building',
      markerColor: 'red'
    });
    this.marker = L.marker([-34.340289, -56.712430], {icon: redMarker}).addTo(this.layerGroup);
    let marker = this.marker;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(this.Maps);
    this.Maps.on('click touchstart', function (e) {      
      marker.setLatLng(e.latlng);      
      localStorage.setItem('latlng', JSON.stringify(e.latlng) );
    });

    
    if (this._route.snapshot.params.id != null) {
      this._Company.get(this._route.snapshot.params.id).subscribe(
        (oResult) => {
          if (oResult['status']) {
            let newnDraft = oResult['message'].company;                        
            newnDraft.ods =  (oResult['message'].company.ODS != null) ? oResult['message'].company.ODS.map((e)=> e.active == '1' ) : new Array(17).fill(false);
            newnDraft.sector = (oResult['message'].company.sector != null) ? oResult['message'].company.sector.map((e) => {
              let i = e;
              i.status = i.active != null ? i.active == '1' : false;
              i.img = environment.URLAPI + '/' + e.img;
              return i;
            } ) : [] ;
            newnDraft.apoyoANII = newnDraft.apoyoANII == "1";
            newnDraft.apoyoANR = newnDraft.apoyoANR == "1";
            newnDraft.apoyoGoviernoDepartamental = newnDraft.apoyoGoviernoDepartamental == "1";
            newnDraft.apoyoOtro = newnDraft.apoyoOtro == "1";
            newnDraft.dateStart = new Date(newnDraft.dateStart); 
            this.nDraft = newnDraft;
                    
            if (this.nDraft.x == null || this.nDraft.y == null) {
          
              navigator.geolocation.getCurrentPosition(location => {
                this.nDraft.x = location.coords.latitude;
                this.nDraft.y = location.coords.longitude;
                this.addMark(this.nDraft.x, this.nDraft.y);
              });
            } else {
              this.addMark(this.nDraft.x, this.nDraft.y);
            }
            localStorage.setItem('latlng', JSON.stringify({lat:this.nDraft.x, lng: this.nDraft.y}) );

          } else {
            this.msg(oResult['message']);
          }
        },
        (oError) => {
          this.msg(oError.body.message);
        },
      );
    } else {
      this.getSector();
    }
  }


  getSector() {
    this._Company.getSector().subscribe(
      (oResult) => {
        if (oResult['status']) {
          this.nDraft.sector = oResult['message'].map((e) => {
            e.status = false; 
            e.img = environment.URLAPI + '/' + e.img;
            return e;
          } );
        }
      },
      (oError) => {
        this.msg('Error no se pudieron traer los sectores');
      },
    );
  }

  newProyect(){    
    if (this.nDraft.title == '') this.msg('Falta el nombre para poder continuar');
    else if (this.nDraft.rut == '')  this.msg('Falta el RUT para poder continuar');
    else if (this.nDraft.bps == '')  this.msg('Falta el BPS para poder continuar');
    else if ((Number(this.nDraft.rut)).toString() != this.nDraft.rut)  this.msg('El RUT deven ser todos numeros');
    else if (this.nDraft.rut.length == 12)  this.msg('El RUT son 12 digitos');
    else if (!this.nDraft.ods.reduce((a,b)=> a || b)) this.msg('No hay ningun ODS seleccionado');
    else if (this.nDraft.description == '') this.msg('La descripcion es obligatorio');
    else {
      let coo = JSON.parse(localStorage.getItem('latlng'));
      this.nDraft.x = coo.lat; 
      this.nDraft.y = coo.lng; 
      let sub = null;
      if (this._route.snapshot.params.id == null) 
        sub = this._Company.add(this.nDraft);
      else {
        this.nDraft.id = this._route.snapshot.params.id; 
        sub = this._Company.put(this.nDraft);
      }   
      sub.subscribe(
        (oResult) => {
          this.msg('Todo a salido ok');
        },
        (oError) => {
          this.msg(oError.body.message);
        },
      );
    }
  }

  addMark(x,y){
    var latlng = new L.LatLng(x,y);
    this.Maps.setView(latlng, 13);
    this.marker.setLatLng(latlng);
  }

  createRole() {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  /**
   * Objeto key q proporciona la fechas limites de la llave y retiorna un string para imprimir
   * 
   * @param key Objeto key 
   */
  valides(key) {
    let data = '';
    var options = {  month: 'long', day: 'numeric' };
    if (key.start != null) {
      let d = new Date(key.start);
      data = ' desde ' + d.toLocaleDateString("es-UY", options);
    }
    if (key.end != null) {
      let d = new Date(key.end);
      data = ' asta ' + d.toLocaleDateString("es-UY", options);
    }
    return data;
  }

  /**
   * Se guardara en portapapeles el string
   * @param val String a copiar en portapapeles
   */
  copyKey(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.msg('Su key ya esta en el portapapeles ');
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
