import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})

export class MyChatsComponent implements OnInit {
  toSend:object={};
  user:object;
  chatsUser;
  constructor(private chatService:ChatService, private router:Router, private route: ActivatedRoute, private auth:AuthService ) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.user = user;
        this.chatService.getChatsOfUser(user._id).subscribe(
          (chats) => {
            this.chatsUser = chats;
          },
          (error) =>{
            console.log(error)
          });
        // Here load data of chat
      }, (err) => { console.log(err) });
    // Load values of chat
  }
}
