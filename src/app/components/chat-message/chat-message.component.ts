import { Component, OnInit, Input } from '@angular/core';
import { msg } from 'src/app/models/msg';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() data:any = null;
  @Input() admin:boolean = null;
  @Input() separar:boolean = null;
  
  

  constructor() { }

  ngOnInit() {
    
  }


}
