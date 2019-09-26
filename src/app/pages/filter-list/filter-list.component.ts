import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { DeleteComponent } from 'src/app/components/modals/delete/delete.component';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {

  lFilter:any[] = []
  constructor(
    private _company:CompanyService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _Filter: FilterService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
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

  delete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { text: 'Esta seguro desea eliminar el filtro' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._Filter.delete(id).subscribe(
          (e)=>{
            if (e.status) {
              this.msg('Se a eliminado con exito');
            }
          },
          (oError) => {
            this.msg(oError.body.message);
          }
        );
      }
    });
  }

  edit(id) {
    this._router.navigate(['/admin/filters/'+id]);
  }


  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
