import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { CompanyService } from 'src/app/services/company.service';
import { MetadataService } from 'src/app/services/metadata.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteComponent } from 'src/app/components/modals/delete/delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _MetadataService :MetadataService,
    private _company:CompanyService,
    private _Filter:FilterService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { 
      this.getAll();
    }

  ngOnInit() {
    
  }
  
  dataSource:any[] = [];
  bDone:boolean = false;

  getAll() {
    this._user.getAll().subscribe(
      (e)=>{
          this.dataSource = e;
          console.log(this.dataSource);
          
          this.bDone = true;
      },
      (e)=>{
          this.bDone = true;
          this.msg('Ups paso algo inprevisto');
      }
    );
  }
  

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  
  delete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { text: 'Esta seguro desea eliminar la difusion' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._user.delete(id).subscribe(
          (e)=>{
            this.getAll();
          },
          (oError) => {
            this.msg(oError.body.message);
          }
        );
      }
    });
  }
}
