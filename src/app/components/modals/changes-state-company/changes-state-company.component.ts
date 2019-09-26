import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-changes-state-company',
  templateUrl: './changes-state-company.component.html',
  styleUrls: ['./changes-state-company.component.scss']
})
export class ChangesStateCompanyComponent implements OnInit {
  options:any[] = [
    {
      'name': 'Pendinte',
      'value' : '0'
    },{
      'name': 'Aprovado',
      'value' : '1'
    },{
      'name': 'Rechasada',
      'value' : '2'
    }
  ]
  constructor(
    public dialogRef: MatDialogRef<ChangesStateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      
    }

  ngOnInit() {
  }

  exit(response): void {
    if (response) this.dialogRef.close(this.data);
    else this.dialogRef.close(false);
  }
}
