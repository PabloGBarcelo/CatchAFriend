import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

  addLoginFacebook(){
    this.auth.loginFacebook().subscribe();
  }

}
