import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment }from '../../environments/environment';
import { fadeInAnimation } from '../../_animations/index';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],
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
