require ('dotenv').config();
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api`;

@Injectable()
export class PlanService {
  options:object = {
      withCredentials:true
    }
    user:object;
  constructor(private http:Http, private auth:AuthService) { }

  getPlans() {
  return this.http.get(`${BASE_URL}/plan`,this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  addPlan(formData) {
    return this.http.post(`${BASE_URL}/newplan`, formData, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
}
