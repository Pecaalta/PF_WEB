import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { newProyect } from 'src/app/models/newProyect';
import { environment } from 'src/environments/environment';
import { role } from 'src/app/models/role';
import { userSession } from 'src/app/models/userSession';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/modals/delete/delete.component';
import { CreateRoleComponent } from 'src/app/components/modals/create-role/create-role.component';
import { MetadataService } from 'src/app/services/metadata.service';

declare let L;

@Component({
  selector: 'app-draft-see',
  templateUrl: './draft-see.component.html',
  styleUrls: ['./draft-see.component.scss']
})
export class DraftSeeComponent implements OnInit {

  nDraft:newProyect = {
    title: 'Maxi tec',
    rut: '16894532',
    debts: '5',
    bps:'1234568',
    description: 'lorem asvasdava as a sa sa ascacas s sacas asdasxac sax',
    dateStart: new Date(),
    apoyoANII: false,
    apoyoANR: true,
    apoyoGoviernoDepartamental: false,
    apoyoOtro: true,
    x: null,
    y: null,
    ods: [false,true,false,true,false,true,false,false,false,false,false,false],
    sector: [],
    role:[]
  }
  apoyo:string = '';
  sUrlApi:string = environment.URLAPI;
  users:any[] = []
  keys:role[] = [];
  myKey:role = {
    edit_info: false,
    delete_company: false,
    remove_user: false,
    edit_role: false,
    see_role: false,
    add_user: false,
  };

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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(this.Maps);

    this._Company.get(this._route.snapshot.params.id).subscribe(
      (oResult) => {
        if (oResult['status']) {
          this.keys = oResult['message'].role;
          this.nDraft = oResult['message'].company;
          this.nDraft.ods = new Array(17).fill(false);
          
          oResult['message'].ODS.forEach(e => {
            if (e.active) this.nDraft.ods[e.ods] = true;
          });
          this.nDraft.sector = oResult['message'].sector;
          this.users = oResult['message'].user;
          this.myKey = oResult['message'].youRole;
      
          this.markerPopup = L.popup().setLatLng([this.nDraft.x, this.nDraft.y]).setContent("Aqui estaría tu restaurante ").openOn(this.layerGroup);
          var redMarker = L.AwesomeMarkers.icon({
            icon: 'building',
            markerColor: 'red'
          });
          this.marker = L.marker([this.nDraft.x, this.nDraft.y], {icon: redMarker}).addTo(this.layerGroup);
          this.Maps.setView(new L.LatLng(this.nDraft.x, this.nDraft.y), 15);
          
          let apoyo = [];
          if (this.nDraft.apoyoANII) apoyo.push('ANII');
          if (this.nDraft.apoyoANR) apoyo.push('ANR');
          if (this.nDraft.apoyoGoviernoDepartamental) apoyo.push('govierno departamental');
          if (this.nDraft.apoyoOtro) apoyo.push('otro');
          this.apoyo = apoyo.join(', '); 
        } else {
          this.msg(oResult['message']);
        }

      },
      (oError) => {
        this.msg(oError.body.message);
      },
    );
  }
  
  createRole() {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '400px',
      maxWidth: '100vw',
      maxHeight: '100vh',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { text: 'Esta eliminando su proyecto esto no tiene marcha a tras' }
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
