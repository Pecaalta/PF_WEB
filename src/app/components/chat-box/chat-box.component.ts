import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalChatFilterComponent } from '../modal-chat-filter/modal-chat-filter.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { difusion } from 'src/app/models/difusion';
import { msg } from 'src/app/models/msg';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  
  FilterCurrent:difusion = null;
  TempFilterCurrent:difusion  = null;
  listUser:any[] = [];
  currentChat:msg[] = null;
  currentUser:any = null;
  admin:boolean = null;

  newMsgtext:string =  '';


  serviceFirechat:any = null;
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _fire:ChatService,
    public _user:UserService) { }

  ngOnInit() {
    this.admin = this._user.getAdmin();
    if (this.admin) {
      this._fire.getChatsList().subscribe( (Snapshot) => {
        this.listUser = [];
        Snapshot.forEach((dataUser: any) => {
          let data = dataUser.payload.doc.data();
          data['id'] = dataUser.payload.doc.id;
          this.listUser.push(data);
        })
      });
    } else {
      this._fire.getChat(this._user.getId()).subscribe( (Snapshot) => {
        this.currentUser = Snapshot.payload.data();
        this.currentUser['id'] = this._user.getId();
        this.scrollToBottom(); 
      });
    }
  }

  Filters(): void {
    const dialogRef = this.dialog.open(ModalChatFilterComponent, {
      width: '700px',
      maxWidth: '100%',
      data: this.TempFilterCurrent
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.filtro != null  && result.filtro != []) this.FilterCurrent = result;
      
    });
  }
  removeFilter(index:number){
    this.FilterCurrent.filtro.slice(index,1);
  }
  newDifusion(){
    this.TempFilterCurrent = {
      data_create: null,
      filtro: [],
      id_User: null
    };
    this.Filters();
  }
  editDifusion(){
    this.TempFilterCurrent = this.FilterCurrent;
    this.Filters();
  }

  getChat(user) {
    this.serviceFirechat = this._fire.getChat(user.id);
    this.serviceFirechat.subscribe( (Snapshot) => {
      this.currentUser = Snapshot.payload.data();
      this.currentUser['id'] = user.id;
      this.scrollToBottom(); 
    });
  }
  @ViewChild('msg_box',{static: false}) private myScrollContainer: ElementRef;
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {       
    }                 
  }

  send(){
    if (this.newMsgtext == '') {
      return;
    }
    if (!this.admin) {
      let data = {
        text: this.newMsgtext,
        recivido: true,
        data_create: new Date
      }
      if ( this.currentUser == null) {
        let chat = this._user.getUser();
        chat['chat'] = [data];
        this._fire.addChat(chat);
      }
      this._fire.sendMsg(data,this._user.getId()).then(
        () => {
          this.newMsgtext = '';
          this.scrollToBottom(); 
        }
      )
      
    } else if (this.currentUser == null) {
      this.msg('No ha seleccionado ningun chat');
    } else {
      let data = {
        text: this.newMsgtext,
        recivido: false,
        data_create: new Date
      }      
      this._fire.sendMsg(data,this.currentUser.id).then(
        () => {
          this.newMsgtext = '';
          this.scrollToBottom(); 
        }
      )
    }
  }

  msg(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
