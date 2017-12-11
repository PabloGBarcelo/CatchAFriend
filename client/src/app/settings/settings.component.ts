import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  error:String;
  user:object;
  location:Coordinates;
  show:boolean = false;
  register:object = {};
  rangeKilometers:number;
  constructor(public auth:AuthService, public router: Router) {

  }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.user = user;
        this.rangeKilometers = user.maxKilometers;
        console.log(this.user);
      }),
      (err) => {
        console.log(err);
      }
  }

  logout() {
    this.auth.logout().subscribe(
      () =>{
        this.router.navigate(['/']);
      },
      (error) => {
        this.error = error;
      });
  }

  changeStatusProfile(){
    if (this.show == true){
      // save changes
    }
    this.show = !this.show;
  }

  updateKilometers(rangeValue){
    this.rangeKilometers = rangeValue;
  }
}
