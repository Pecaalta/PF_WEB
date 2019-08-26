import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {

  @Input() isDiffusion:boolean = false;
  @Input() img:string = 'Sin imagen';
  @Input() name:string = 'Sin nombre';
  
  constructor() { }

  ngOnInit() {
  }

}
