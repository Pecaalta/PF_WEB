import { Component, OnInit, Inject } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-image-cropped',
  templateUrl: './image-cropped.component.html',
  styleUrls: ['./image-cropped.component.scss']
})
export class ImageCroppedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageCroppedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.imageChangedEvent = event;
    }

  ngOnInit() {
  }

  exit(response): void {
    this.dialogRef.close(response ? this.data : response);
  }

  imageChangedEvent: any = '';
  imagePath: any = '';
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.data = event;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
 

}
