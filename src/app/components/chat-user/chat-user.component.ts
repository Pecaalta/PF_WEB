import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {

  @Input() isDiffusion:boolean = false;
  @Input() img:string = 'Sin imagen';
  @Input() name:string = 'Sin nombre';
  @Input() check:boolean = false;
  @Input() id:number = null;
  
  constructor(
    public _fire:ChatService
    ) { }

  ngOnInit() {
  }
  
  hidde() {
    this._fire.ocultChat(this.id);
  }

}
