import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
