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
  constructor(public plan:PlanService, private route: ActivatedRoute) { }

  ngOnInit() {
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
