import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-portal-plan',
  templateUrl: './portal-plan.component.html',
  styleUrls: ['./portal-plan.component.css']
})
export class PortalPlanComponent implements OnInit {
  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  plans = [];
  x: Number = 0;
  body = {};
  user: object;
  placeX: number = 0;
  placeY: number = 0;
  placeXEnd: number = 0;
  startX: number = 0;
  startY: number = 0;
  totalPlace: number = 0;
  typeSearch: string ="Confort"
  rush:Boolean = false;
  years;
  idUser;
  constructor(private planService: PlanService, public auth: AuthService) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    // Get all info data.
    if (typeof(this.plans) === "undefined" || this.plans.length == 0){
    console.log("Entre");
      this.takePlans();
    }
  }

  takePlans(){
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.idUser = user['_id'];
        // this.years = user['birthday'] - Date.now();
        // this.years = moment.duration(user['birthday'].diff(Date.now()));
        // console.log("YEARS "+ this.years); // 8 years
        this.body['rush'] = this.rush // Boolean
        this.body['likingUser'] = user['_liking'];
        this.body['userId'] = user['_id'];
        this.body['gender'] = user['gender'];
        this.body['position'] = user['position'];
        this.body['typeSearch'] = this.typeSearch;
        this.body['maxKilometers'] = user['maxKilometers'];
        this.planService.getPlans(this.body).subscribe(listOfPlans => {
          console.log(listOfPlans);
          console.log("Asignando");
          this.plans = listOfPlans;
        });
      }),
      (err) => {
        console.log(err);
      }
  }
  likePlan() {
    console.log(this.idUser,this.plans[0]._id);
    this.planService.likePlan(this.idUser,this.plans[0]._id).subscribe(
      () => {
        this.plans.shift();
        if (typeof(this.plans) === "undefined" || this.plans.length <= 1){
        console.log("Entre");
          this.takePlans();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dislikePlan() {
    console.log(this.idUser,this.plans[0]._id);
    this.planService.dislikePlan(this.idUser,this.plans[0]._id).subscribe(
      () => {
        this.plans.shift();
        if (typeof(this.plans) === "undefined" || this.plans.length <= 1){
        console.log("Entre");
          this.takePlans();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPanStart(event: any): void {
    event.preventDefault();
    this.startX = this.placeX;
    //this.startY = this.placeY;
  }

  onPan(event: any): void {
    event.preventDefault();
    this.placeX = this.startX + event.deltaX;
    //this.placeY = this.startY + event.deltaY;
  }
  onPanEnd(event: any): void{
    event.preventDefault();
    this.compareStartAndEnd();
  }

  compareStartAndEnd(): void{
    this.totalPlace = this.placeX - this.startX;
    if (this.totalPlace > 100){ // Disliked!
      console.log("Liked");
      this.likePlan();
    }
    else if (this.totalPlace < -100){
      console.log("Disliked");
      this.dislikePlan();
    }
    this.placeX = 0;
  }

  setConfort(){
    this.plans=[];
    this.typeSearch = "Confort";
    this.takePlans();
  }

  setExplore(){
    this.plans=[];
    this.typeSearch = "Explore";
    this.takePlans();
  }

  setRandom(){
    this.plans=[];
    this.typeSearch = "Random";
    this.takePlans();
  }

  setRush(e){
    if (e.target.checked){
      this.rush = true;
      this.takePlans();
    } else {
      this.rush = false;
      this.takePlans();
    }
  }
}
