import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-request-and-edit-plan',
  templateUrl: './detail-request-and-edit-plan.component.html',
  styleUrls: ['./detail-request-and-edit-plan.component.css']
})
export class DetailRequestAndEditPlanComponent implements OnInit {
  myPlan;
  circleRed = false;
  constructor(public plan:PlanService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reloadPlans();
    console.log(this.myPlan);
  }
  agree(m){
    // this.myPlan, m => userId
    this.plan.acceptPlan(m,this.myPlan['_id'],this.myPlan['_owner']).subscribe(
    accepted => {
      console.log(accepted);
      this.reloadPlans();
      this.circleRed = true;
    },
    error => console.log(error)
  );
  }
  deny(m){
    this.plan.rejectPlan(m,this.myPlan['_id']).subscribe(
      deny => {console.log(deny),
            this.reloadPlans();},
      error => console.log(error)
    )
  }

  reloadPlans(){
    this.route.params.subscribe(params => {
      this.plan.getPlan(params['id']).subscribe(
        plan => {
          console.log(plan);
          this.myPlan = plan;
        }
      );
    });
  }
}
