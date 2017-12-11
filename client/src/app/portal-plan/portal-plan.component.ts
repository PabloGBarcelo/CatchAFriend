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
  x: Number = 0;
  body = {};
  user: object;
  constructor(private planService: PlanService, public auth: AuthService) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    // Get all info data.
    this.auth.isLoggedIn().subscribe(
      (user) => {
        this.body['rush'] = false // Boolean
        this.body['likingUser'] = user['_liking'];
        this.body['userId'] = user['_id'];
        this.body['gender'] = user['gender'];
        this.body['position'] = user['position'];
        this.body['typeSearch'] = 'Confort';
        this.body['maxKilometers'] = user['maxKilometers'];
        this.planService.getPlans(this.body).subscribe(listOfPlans => {
          console.log(listOfPlans);
          this.plans = listOfPlans;
        });
      }),
      (err) => {
        console.log(err);
      }
  }

  likePlan() {

  }

  dislikePlan() {

  }
}
