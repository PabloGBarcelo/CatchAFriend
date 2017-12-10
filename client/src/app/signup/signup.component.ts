import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  step:Number = 1;
  register:object = {};
  constructor(public auth:AuthService, public router: Router) { }

  ngOnInit() {
  }

  tostep2(){
    
  }

  tostep3(){

  }
}
