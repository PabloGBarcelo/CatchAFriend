import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {

  constructor(private chat:ChatService) { }

  ngOnInit() {
  }

}
