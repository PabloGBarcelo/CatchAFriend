import { Component, OnInit } from '@angular/core';
import {  PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {
  userPlans:Array<object>;
  user;
  constructor(public planService: PlanService, public auth: AuthService) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.user = user;
        this.loadData();
      }, (err) => { console.log(err) });
  }

  removePlan(planId){
    this.planService.cancelPlan(this.user._id,planId).subscribe(
      plan =>{
        this.loadData();
      },
      error =>{
        console.log(error);
      }
    );
  }

  loadData(){
    this.planService.getAllPlansOfUser(this.user._id).subscribe(
      (plans) => {
        this.userPlans = plans;
      }, (err) => { console.log(err) });
  }
}
