import { environment } from '../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const BASE_DOMAIN = environment.BASE_DOMAIN;
const BASE_URL = `${BASE_DOMAIN}/api`;

@Injectable()
export class PlanService {
  options:object = {
      withCredentials:true
    }
    user:object;
  constructor(private http:Http, private auth:AuthService) { }

  getAllPlansOfUser(id){
  return this.http.get(`${BASE_URL}/planUser/${id}`,this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getPlan(id){
    return this.http.get(`${BASE_URL}/plan/${id}`,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPlans(formData) {
  return this.http.post(`${BASE_URL}/plan`,formData,this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  addPlan(formData) {
    return this.http.post(`${BASE_URL}/newplan`, formData, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  likePlan(userId,planId){
    // Send id user and id plan
    return this.http.post(`${BASE_URL}/plan/${planId}/like/${userId}`,{},this.options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  dislikePlan(userId,planId){
    return this.http.post(`${BASE_URL}/plan/${planId}/dislike/${userId}`,{},this.options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  rejectPlan(userId,planId){
    return this.http.post(`${BASE_URL}/plan/${planId}/reject/${userId}`,{},this.options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  cancelPlan(userId,planId){
    return this.http.post(`${BASE_URL}/plan/${planId}/cancel/${userId}`,{},this.options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  acceptPlan(userId,planId,owner){
    return this.http.post(`${BASE_URL}/plan/${planId}/accept/${userId}`,{owner},this.options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
}
