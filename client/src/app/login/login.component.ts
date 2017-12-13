import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInOutAnimation],
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }
  error:String;
  ngOnInit() {
    this.auth.isLoggedIn();
  }
  login(email,password){
    this.auth.login(email,password).subscribe(
      (user) => {
        this.router.navigate(['portal']);
      },
      (error) => {
        this.error = error;
      });
  }
}
