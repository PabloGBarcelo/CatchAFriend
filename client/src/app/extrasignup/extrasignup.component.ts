import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-extrasignup',
  templateUrl: './extrasignup.component.html',
  styleUrls: ['./extrasignup.component.css']
})
export class ExtrasignupComponent implements OnInit {
  user:object;
  position:Coordinates;
  birthday:Date;
  _liking:Array<object> = [];
  photoUrl:Array<String>;
  allCategories:Array<object>;
  yourLocation:Array<Number>;
  categorie;
  toSend:object = {};
  constructor(public auth:AuthService, public categories:CategoriesService, public router:Router) {
  }

  ngOnInit() {
    this.categories.getAllCategories().subscribe(
      (categories) => {
        this.allCategories = categories;
      }
    );
    if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            this.yourLocation = [ position.coords.latitude,position.coords.longitude];
          });
       }
  }

  SendFormAndEnjoy(categories){
    let keys = Object.keys(categories.value);
    this.categorie = keys.filter(function(key) {
        return categories.value[key]
    });
    this.categorie.forEach(e => {
      this._liking.push({ "categorie": e ,"rate":1});
    });
    this.toSend['_liking'] = this._liking;
    this.toSend['birthday'] = new Date(this.birthday).toISOString();
    this.toSend['position'] = this.yourLocation;
    console.log(this.toSend['position'])
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.auth.editUser(this.toSend,user._id).subscribe(
          (user) => {
            this.router.navigate(['/portal']);
          },
          (error) =>{
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
