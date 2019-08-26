import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {

  lDraft:any[] = []
  constructor(
    private _snackBar: MatSnackBar,
    private _Company: CompanyService
  ) { }

  ngOnInit() {
     
    this._Company.myConpany().subscribe(
      (oResult) => {
        this.lDraft = oResult; 
      },
      (oError) => {
        this.msg(oError.body);
      },
    );
  }
  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
