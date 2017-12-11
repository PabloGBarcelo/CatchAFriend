import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment }from '../../environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  urlFacebook:String;
  constructor(public auth:AuthService) { }

  ngOnInit() {
    this.urlFacebook = environment.backFacebookLogin;
  }

  addLoginFacebook(){
    this.auth.loginFacebook().subscribe();
  }

}
