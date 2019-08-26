import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-chat-filter',
  templateUrl: './modal-chat-filter.component.html',
  styleUrls: ['./modal-chat-filter.component.scss']
})
export class ModalChatFilterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalChatFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
