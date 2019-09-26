import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msj',
  templateUrl: './msj.component.html',
  styleUrls: ['./msj.component.scss']
})
export class MsjComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MsjComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  exit(response): void {
    this.dialogRef.close(response);
  }
}
