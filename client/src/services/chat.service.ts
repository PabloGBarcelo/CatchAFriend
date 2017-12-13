import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api`;

interface Message{
  message:string;
  user:string;
}

@Injectable()
export class ChatService {
  options:object = {
      withCredentials:true
    }
  socket:any;
  messages:Array<Message> = [];
  constructor(private http:Http){
    console.log("Created chat service");
    this.socket = io.connect(`${BASE_DOMAIN}`);
    this.socket.on('recibe-message', function(data:any){
      console.log("RECIBIENDO")
      console.log(data);
      console.log(`Mensaje Recibido: "${data.message}"`);
      // save in Mongo when receive message
      this.http.post(`${BASE_URL}/addMessage`,{data},this.options).subscribe(
          (msg) => {
            console.log(msg);
            this.messages.push({
            sender: data.sender,
            message:data.message,
            planId: data.planId
          })
        },
          (err) => {
            console.log(err)
          }
        )
    }.bind(this));
  }

  sendMessage(m){
    console.log(`Mandando mensaje: "${m}"`);
    console.log(m);
    this.socket.emit('send-message',m);
    this.messages.push(m)
  }
  getChatsOfUser(idUser){
    return this.http.post(`${BASE_URL}/getChats`,{idUser},this.options)
                    .map(chats => chats.json())
                    .catch(this.handleError);
  }
  getMessagesOfPlanIdChat(idPlan){
    return this.http.post(`${BASE_URL}/getMessages`,idPlan,this.options)
                    .map(messages => messages.json())
                    .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
}
