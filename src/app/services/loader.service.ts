import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader:boolean = false;

  constructor() { }

  show() {
    this.loader = true;
  }
  hide() {
    this.loader = false;
  }
}
