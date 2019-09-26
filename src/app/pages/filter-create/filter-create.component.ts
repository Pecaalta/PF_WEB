import { Component, OnInit } from '@angular/core';
import { FilterSetting } from 'src/app/models/FilterSetting';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-create',
  templateUrl: './filter-create.component.html',
  styleUrls: ['./filter-create.component.scss']
})
export class FilterCreateComponent implements OnInit {

  oFilter:any = {
    name: '',
    configuration: []
  }
  configuration:FilterSetting = {
    columna: '',
    comparador: '',
    default: ''
  }
  type:string = 'text';
  default = {
    columna: [
      {
        name:'title',
        type: 'text' 
      }, {
        name:'rut',
        type: 'text' 
      },{
        name:'bps',
        type: 'text' 
      }, {
        name:'description',
        type: 'text' 
      }, {
        name:'debts',
        type: 'text' 
      }, {
        name:'personal',
        type: 'number' 
      }, {
        name:'x',
        type: 'number' 
      }, {
        name:'y',
        type: 'number' 
      }, {
        name:'id_user',
        type: 'number' 
      }, {
        name:'addres',
        type: 'text' 
      }, {
        name:'phone',
        type: 'text' 
      }, {
        name:'email',
        type: 'text' 
      }, {
        name:'date',
        type: 'date' 
      }, {
        name:'dateStart',
        type: 'date' 
      },{
        name:'apoyoGoviernoDepartamental',
        type: 'boolean' 
      },{
        name:'apoyoANII',
        type: 'boolean' 
      },{
        name:'apoyoANR',
        type: 'boolean' 
      },{
        name:'apoyoOtro',
        type: 'boolean' 
      }
    ],
    comparador:{
      'date':[
        'vacio',
        '=',
        '>',
        '>=',
        '<',
        '<='
      ],
      'boolean':[
        'vacio',
        '='
      ],
      'text':[
        'vacio',
        '=',
        '>',
        '>=',
        '<',
        '<='
      ],
      'number':[
        'vacio',
        '=',
        '>',
        '>=',
        '<',
        '<='
      ]
    }

  }
  
  constructor(
    private _snackBar: MatSnackBar,
    private _route:ActivatedRoute,
    private _Filter: FilterService,
    public dialog: MatDialog) { }
    
  printEnum(value) {
    return comparador[value];
  }
  
  ngOnInit() {
    if (this._route.snapshot.params.id != null && this._route.snapshot.params.id  != 'create') {
      this._Filter.get(this._route.snapshot.params.id).subscribe(
        (e) => {
          if (e['status']) this.oFilter = e['message'];
          else this.msg(e['message']);
        },
        (oError) => {
          this.msg(oError.body.message);
        }
      )
    }
  }
  save() {
    let req = null;
    if (this._route.snapshot.params.id != null && this._route.snapshot.params.id  != 'create') {
      req = this._Filter.put(this.oFilter);
    }else {
      req = this._Filter.post(this.oFilter);
    }
    req.subscribe(
      (e) => {

      },
      (oError) => {
        this.msg(oError.body.message);
      }
    )
  }
  addConfig() {
    if (this.configuration.columna == '') return this.msg('Tiene que seleccionar una columna');
    else if (this.configuration.comparador == '') return this.msg('Tiene que aver un comparador');
    else if (this.configuration.default == '') return this.msg('Tiene que tener un valor por defecto');

    if (this.configuration.comparador == 'vacio') {
      this.configuration.comparador = '=';
      this.configuration.default = 'null';
    }
    this.oFilter.configuration.push(this.configuration);
    this.configuration = {
      columna: '',
      comparador: '',
      default: ''
    }
  }

  removeConfig(index) {
    this.oFilter.configuration.splice(index, 1);
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


}
