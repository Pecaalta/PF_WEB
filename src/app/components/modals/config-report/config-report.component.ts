import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MsjComponent } from '../msj/msj.component';

@Component({
  selector: 'app-config-report',
  templateUrl: './config-report.component.html',
  styleUrls: ['./config-report.component.scss']
})
export class ConfigReportComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfigReportComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
    this.countDysplayedColumns =  this.data.displayedColumns.length;
  }

  exit(response): void {
    if (response) this.dialogRef.close(this.data);
    else this.dialogRef.close(false);
  }
  countDysplayedColumns:number = 0;
  all:boolean = true;
  none:boolean = false;
  marker(option, hide){
    if(option == 1) {
      this.none = false;
      this.countDysplayedColumns =  this.data.displayedColumns.length;
      this.data.displayedColumns.map((e)=> e.hide = true );
    } else if (option == 0) {
      this.all = false;
      this.countDysplayedColumns = 0;
      this.data.displayedColumns.map((e)=> e.hide = false );
    } else {
      if (hide)
        this.countDysplayedColumns--;
      else
        this.countDysplayedColumns++;
      if (this.countDysplayedColumns == this.data.displayedColumns.length ) this.all = true;
      else if (this.countDysplayedColumns == -1 ) this.none = true;
      else if (this.countDysplayedColumns < this.data.displayedColumns.length ) this.all = false;
      else if (this.countDysplayedColumns > -1 ) this.none = false;
      else {
        console.log(this.countDysplayedColumns);
      }        

    }
  }
  info(option) {
    switch(option){
      case 0:
        this.msg('Esta opcion permite mostrar o no un recuadro como referencia');
        break;
      case 1:
        this.msg('Decide si comprara separado por emprendimintos');
        break;
      case 2:
        this.msg('Las columnas seleccionadas seran las que terminaran sindo mostradas');
        break;
      case 3:
        this.msg('Selecciona el tipo de grafica');
        break;
      case 4:
        this.msg('Campo que cuantificara');
        break;
      case 5:
        this.msg('Se seleccionara con el campo con el que se identifiacra cada enprendiminto en la grefica');
        break;
    }
  }

  msg(text:string) {
    const dialogRef = this.dialog.open(MsjComponent, {
      width: '400px',
      data: {
        title: 'Informacion',
        text: text,
        options: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) window.print();
    });
  }
}

