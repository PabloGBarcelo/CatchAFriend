import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

const BASE_DOMAIN = environment.BASE_DOMAIN;
const BASE_URL = `${BASE_DOMAIN}/api`;

@Injectable()
export class CategoriesService {
  options:object = {
      withCredentials:true
    }
  constructor(private http: Http) {

  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllCategories() {
  return this.http.get(`${BASE_URL}/categories`,this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }
}
