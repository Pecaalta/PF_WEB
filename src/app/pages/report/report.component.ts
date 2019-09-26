import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MetadataService } from 'src/app/services/metadata.service';
import { CompanyService } from 'src/app/services/company.service';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from 'src/app/components/modals/filter/filter.component';
import { ConfigReportComponent } from 'src/app/components/modals/config-report/config-report.component';
import { MsjComponent } from 'src/app/components/modals/msj/msj.component';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { FilterCreateComponent } from '../filter-create/filter-create.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public chart: any = null;

  lFilter:any[] = [];
  idFilter:string = '';
  oFilter:any = {};
  bDone:boolean = false;
  constructor(
    private _MetadataService :MetadataService,
    private _company:CompanyService,
    private _Filter:FilterService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  public barChartLabels = [];
  public barChartData = [];
  // Tabla
  dataSource: any[] = [];
  
  config:any = {
    //Tabla columnas visibles
    displayedColumns: [],
    barChartOptions: {
      scaleShowVerticalLines: false,
      responsive: true,
      title: {
        display: true,
        text: 'personal'
      }
    },
    //Imprimibles
    barChartType: 'bar',
    barChartLegend: true,

    // Configurables
    ComparacionGlobal: true,
    ColumnaParaComparacionGlobal: 'personal',

    idComparacionEmprendiminto: 'id',
    Comparaciones: [],
    
    // Selectores
    ChartTypeSelect: ['bar', 'doughnut', 'polarArea'],

  }

  ngOnInit() {
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

  dataConfig(){
    const dialogRef = this.dialog.open(ConfigReportComponent, {
      width: '800px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.config
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) return;
      this.bDone = false;
      this.config = result;      
      this.recalcula();
    });
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

  filterData(lista, type) {
    if (type == null) return new Set(lista.filter((e)=> e.hide).map((e)=> e.name)); 
    else if (type == 'body') return new Set(lista.filter((e)=> e.hide && (e.name != this.config.idComparacionEmprendiminto) ).map((e)=> e.name));
  }

  loadCompany(){
    this.bDone = false;
    this._company.getAll(this.oFilter).subscribe(
      (e)=>{
        if (e['status']) {
          if (e['message'].length > 0) {
            this.config.displayedColumns = [];
            (Object.keys(e['message'][0])).forEach(e => {
              this.config.displayedColumns.push({ name: e, hide: true });
            });            
            this.dataSource = e['message'].map(e => this.FilterCmpos(e));
            this.config.Comparaciones.push(this.config.displayedColumns[0].name);
            this.recalcula();
          }
        } else {
          this.msg(e['message']);
        }
      }
    );
  }

  loder(filter){
    this.oFilter = filter;
    this.loadCompany();
  }

  addChartData(name){
      let i = this.config.Comparaciones.indexOf(name);
      if (i == -1) this.config.Comparaciones.push(name);
      else this.config.Comparaciones.splice(i,1);
      this.recalcula();
  }

  recalcula(){
    this.barChartData = [];
    
    if (this.config.ComparacionGlobal) {
      this.barChartLabels = [];
      let cpcg = this.config.ColumnaParaComparacionGlobal;
      let listaTemp = {};
      this.dataSource.forEach(element => {
        if (listaTemp[element[cpcg]] == null) {
          listaTemp[element[cpcg]] = 1;
        } else {
          listaTemp[element[cpcg]]++;
        }
      });
      let data = {
        data: [],
        label: cpcg
      }
      for (const key in listaTemp) {
          this.barChartLabels.push(key);
          data.data.push(listaTemp[key]);
      }
      this.barChartData.push(data);
    } else {
      this.barChartLabels = this.dataSource.map((e)=> e[this.config.idComparacionEmprendiminto]);
      this.config.Comparaciones.forEach(element => {
        this.barChartData.push({
          data: this.dataSource.map((e)=> e[element]), 
          label: element
        });
      });
      console.log( this.barChartData);
    }
    this.bDone = true;
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
  }
  FilterCmpos(e){
    let data = []
    this.config.displayedColumns.forEach(element => {
      if (element.hide) 
      switch (element.name) {
        case 'status':
          if(e[element.name] == 0) data[element.name] = 'Pendinte';
          else if(e[element.name] == 1) data[element.name] = 'Arobado';
          else if(e[element.name] == 2) data[element.name] = 'Rechasado';
          else data[element.name] = e[element.name];
        break;
        case 'active':case 'apoyoOtro':case 'apoyoANR':case 'apoyoANII':case 'apoyoGoviernoDepartamental':
            data[element.name] = e[element.name] == '1' ? 'Si' : 'No';
            break;
        default:
          data[element.name] = e[element.name] != null ? e[element.name] : '---';
        break;
      }
    });
    return data
  }
  eportXls() {
    const ws_name = 'Report';
    const wb: WorkBook = { 
      SheetNames: [], 
      Sheets: {} 
    };
    const ws: any = utils.json_to_sheet(
      this.dataSource.map(e => this.FilterCmpos(e))
    );
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), (new Date()).toLocaleDateString("es-UY", {  month: 'long', day: 'numeric' }) + ' - report.xlsx');
  }

  print() {
    if ((document.getElementById('table').clientWidth  * 2.54/96) > 20) {
      const dialogRef = this.dialog.open(MsjComponent, {
        width: '400px',
        data: {
          title: 'Alerta',
          text: 'El contenido de la tabla puede que no quede visible en el documento',
          options: true
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) window.print();
      });
    } else {
      window.print();
    }
  }
}
