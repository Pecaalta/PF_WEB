import { Injectable } from '@angular/core';
import { msg } from '../models/msg';
import { UserService } from './user.service';
import { difusion } from '../models/difusion';
import { combineLatest } from 'rxjs/operators';
import { filtro } from '../models/filtro';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: AngularFirestore,
    private _user: UserService
    ) { }  
    
    //Crea un nuevo chat
    public sendMsg(data: any,id_User:string) {
      return this.firestore.collection('users')
      .doc(id_User)
      .update({
        chat: firestore.FieldValue.arrayUnion(data)
      });
    }
    //Crea un nuevo difusion
    public sendDifusion(data: difusion,id_User:string) {
      return this.firestore.collection("difusiones/"+id_User).add(data);
    }

    //Obtiene todos los gatos
    public getChatsList() {
      return this.firestore.collection('users').snapshotChanges();
    }

    public getChat(id){
      const chats = this.firestore.collection('users').doc(id)
      .snapshotChanges();
//      const difucion = this.firestore.collection("difusiones", ref => {
 //       ref.where('filtro', 'array-contains', filter);
 //     }).valueChanges();
 //     return combineLatest(chats,difucion);
      return chats;
    }

    public addChat(data) {
      this.firestore.collection('users').doc(this._user.getId()).set(data);
    }

}
