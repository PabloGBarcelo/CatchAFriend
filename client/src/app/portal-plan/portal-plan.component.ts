import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
@Component({
  selector: 'app-portal-plan',
  templateUrl: './portal-plan.component.html',
  styleUrls: ['./portal-plan.component.css']
})
export class PortalPlanComponent implements OnInit {
  plans = [];
  x:Number = 0;
  constructor(private planService:PlanService) { }

  ngOnInit() {
    this.planService.getPlans().subscribe( listOfPlans =>{
      this.plans = listOfPlans;
  });

  }
}
