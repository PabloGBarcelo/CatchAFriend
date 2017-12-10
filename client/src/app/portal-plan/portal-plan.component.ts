import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-portal-plan',
  templateUrl: './portal-plan.component.html',
  styleUrls: ['./portal-plan.component.css']
})
export class PortalPlanComponent implements OnInit {
  plans = [];
  x:Number = 0;
  body = {};
  user:object;
  constructor(private planService:PlanService, public auth:AuthService) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    // Get all info data.
    if (this.user){
      this.body['rush'] = false // Boolean
      this.body['likingUser'] = this.auth.user['_liking'];
      this.body['userId'] = this.auth.user['_id'];
      this.body['gender'] = this.auth.user['gender'];
      this.body['position'] = this.auth.user['position'];
      this.body['typeSearch'] = 'Confort';
      this.body['maxKilometers'] = this.auth.user['maxKilometers'];
      this.planService.getPlans(this.body).subscribe( listOfPlans =>{
        this.plans = listOfPlans;
    });}
  }

  likePlan(){

  }

  dislikePlan(){

  }
}
