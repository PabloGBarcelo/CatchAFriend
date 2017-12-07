import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api`;

@Injectable()
export class AuthService {
  options:object = {
      withCredentials:true
    }
    user:object;
    loginEvent:EventEmitter<object> = new EventEmitter();
  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(obj) {
    this.user = obj;
    this.loginEvent.emit(this.user);
    return this.user;
  }

  isLoggedIn() {
  return this.http.get(`${BASE_URL}/loggedin`,this.options)
    .map(res => res.json())
    .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  signup(formData) {
    return this.http.post(`${BASE_URL}/signup`, formData, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  login(username:string, password:string) {
    console.log(`Login with email:${username} and password ${password}`);
    return this.http.post(`${BASE_URL}/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
  return this.http.get(`${BASE_URL}/logout`,this.options)
    .map(res => res.json())
    .map(user => this.handleUser(null))
    .catch(this.handleError);
  }
  getUser(){
    return this.user;
  }
}
