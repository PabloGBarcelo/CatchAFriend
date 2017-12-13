import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css']
})
export class NewPlanComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

 plan:object={};
 photo:object={};
 containerCategoresId:Array<string>=[];
 categorie;
 allCategories;
 userId;
 constructor(
   private mapsAPILoader: MapsAPILoader,
   private auth: AuthService,
   private ngZone: NgZone,
   public categories:CategoriesService,
   private forSendPlan:PlanService,
   private router:Router) { }

 ngOnInit() {
   this.categories.getAllCategories().subscribe(
     (categories) => {
       this.allCategories = categories;
     });

   this.auth.isLoggedIn().subscribe(
     (user) => {
       this.userId = user['_id'];
     },
     (err) => {
       console.log(err);
     });
   //set google maps defaults
     this.zoom = 4;
     this.latitude = 39.8282;
     this.longitude = -98.5795;

     //create search FormControl
     this.searchControl = new FormControl();

     //set current position
     this.setCurrentPosition();

     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: ["address"]
       });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();

           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }

           //set latitude, longitude and zoom
           this.plan['position'] = [place.geometry.location.lat(),place.geometry.location.lng()];
           this.plan['street'] = `${place.name}, ${place.vicinity}`
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12;
         });
       });
     });
   }

   private setCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
         this.zoom = 12;
       });
     }
   }
   sendPlan(categories){
     let keys = Object.keys(categories.value);
     this.categorie = keys.filter(function(key) {
         return categories.value[key]
      });
     this.containerCategoresId = [];
     this.categorie.forEach(e => {
       this.containerCategoresId.push(e);
     });
     this.plan['_owner'] = this.userId;
     this.plan['_category'] = this.containerCategoresId;
     this.plan['status'] = "running";
     this.plan['photo'] = Object.values(this.photo);
     console.log("PLAN")
     console.log(this.plan);
     this.forSendPlan.addPlan(this.plan).subscribe(
       () =>{
         this.router.navigate(['/myplans'])
       },
        (error) =>{
          console.log(error);
        });
   }

   onUploadFinished(e){
     // ATTENTION WITH DOUBLE ""

     this.photo[e.file.name] = e.serverResponse._body.slice(1,-1);
     if (this.photo[e.file.name] == "some error")
       delete this.photo[e.file.name];
     console.log(e);
     console.log(this.photo);
   }
   onRemoved(e){
     delete this.photo[e.file.name];
     console.log(this.photo);
   }
 }
