import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from 'src/app/components/modals/create-role/create-role.component';
import { CreateDraftComponent } from 'src/app/components/modals/create-draft/create-draft.component';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {

  lDraft:any[] = []
  bDone:boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private _Company: CompanyService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
     
    this._Company.myConpany().subscribe(
      (oResult) => {
        if (oResult['status'])  this.lDraft = oResult['message']; 
        else this.msg(oResult['message']);
        this.bDone = true;
      },
      (oError) => {
        console.log(oError);
        this.bDone = true;
        
        //this.msg(oError.body['message']);
      },
    );
  }
  
  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  CreateDraft() {
    const dialogRef = this.dialog.open(CreateDraftComponent, {
      width: '400px',
      data: { key: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) return;
      if (result.key == '') {
        this._router.navigate(['/user/draft/new']);
      } else {
        this._Company.addUserKey(result.key).subscribe(
          (e)=>{
            if (e['status']) {
              this.msg('Se agrego correctamente su empresa');
            } else {
              this.msg(e['message']);
            }
          },
          (oError) => {
            this.msg(oError.body.message);
          }
        );
      }
    });
  }


}
