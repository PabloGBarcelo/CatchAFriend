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
  user;
  constructor(private planService:PlanService, public auth:AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    // Get all info data.
    this.body['rush'] = false // Boolean
    this.body['likingUser'] = this.user['_liking'];
    this.body['userId'] = this.user['_id'];
    this.body['gender'] = this.user['gender'];
    this.body['typeSearch'] = 'Confort';
    this.planService.getPlans(this.body).subscribe( listOfPlans =>{
      this.plans = listOfPlans;
    });
  }
  dosomething (){
    alert("HEY");
  }
}
