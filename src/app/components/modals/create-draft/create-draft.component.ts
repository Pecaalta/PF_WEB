import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-draft',
  templateUrl: './create-draft.component.html',
  styleUrls: ['./create-draft.component.scss']
})
export class CreateDraftComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateDraftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  exit(response): void {
    this.dialogRef.close(response ? this.data : response);
  }

}
