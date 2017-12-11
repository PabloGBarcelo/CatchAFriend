import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  constructor(public planService:PlanService, public auth:AuthService) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(
      (user) => {
    this.planService.getAllPlansOfUser(user._id).subscribe(

    );
  }, (err) => {
    console.log(err);
  }
  }

}
