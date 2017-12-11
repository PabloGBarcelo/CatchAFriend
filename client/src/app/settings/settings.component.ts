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
  constructor(public auth:AuthService, public router: Router) {

  }

  ngOnInit() {
    this.user = this.auth.getUser();

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
}
