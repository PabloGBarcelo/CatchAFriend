import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-chats-selected',
  templateUrl: './my-chats-selected.component.html',
  styleUrls: ['./my-chats-selected.component.css']
})

export class MyChatsSelectedComponent implements OnInit {
  toSend: object = {};
  user: object;
  planId;
  allHistory;
  constructor(private chat: ChatService, private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    // get id plan
    this.route.params.subscribe(params => {
      this.planId = params['id'];
    });
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.user = user;
        // Here load data of chat
      }, (err) => { console.log(err) });
    // Load values of chat
  }
  sendMessage(m) {
    if (m != "") {
      this.route.params.subscribe(params => {
        this.toSend['planId'] = params['id'];
        this.toSend['message'] = m;
        this.toSend['senderId'] = this.user['_id'];
        this.chat.sendMessage(this.toSend)
      });
    }
  }
}
