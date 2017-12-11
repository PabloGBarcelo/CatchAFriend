import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-plans-detail',
  templateUrl: './my-plans-detail.component.html',
  styleUrls: ['./my-plans-detail.component.css']
})
export class MyPlansDetailComponent implements OnInit {
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
