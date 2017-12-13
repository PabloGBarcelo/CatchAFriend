import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  register:object = {};
  statusLogin = false;
  error:String;

  constructor(public auth:AuthService, public router: Router, public ngZone: NgZone) { }
  ngOnInit() {
  }

  tostep2(){
    console.log(this.register);
    this.statusLogin = !this.statusLogin;
  }
  flyLittleBird(){
    this.register['photoUrl'] = ["https://cdn.vectorstock.com/i/thumb-large/71/60/kawaii-cartoon-face-vector-15307160.jpg"];
    this.auth.signup(this.register).subscribe(
      (user) => {
        this.ngZone.run(() =>
          this.router.navigate(['/extrasignup']));
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
