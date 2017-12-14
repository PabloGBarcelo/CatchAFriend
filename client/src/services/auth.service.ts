import { environment } from '../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

const BASE_DOMAIN = environment.BASE_DOMAIN;
const BASE_URL = `${BASE_DOMAIN}/api`;

@Injectable()
export class AuthService {
  statusLogin:boolean = false;
  options:object = {
      withCredentials:true
    }
    user:object;
    loginEvent:EventEmitter<object> = new EventEmitter();
  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    console.log(e)
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
    .map(user => {return this.handleUser(user)})
    .catch(this.handleError);
  }

  signup(formData) {
    console.log(formData);
    return this.http.post(`${BASE_URL}/signup`, formData, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch((err) => this.handleError(err));
  }

  login(username:string, password:string) {
    console.log(`Login with email:${username} and password ${password}`);
    return this.http.post(`${BASE_URL}/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  editUser(data,id){
    return this.http.post(`${BASE_URL}/edit/${id}`, data, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
  return this.http.get(`${BASE_URL}/logout`,this.options)
    .map(res => res.json())
    .map(user => this.handleUser(null))
    .catch((err) => this.handleError(err));
  }

  getUser(){
    return this.user;
  }

  loginFacebook(){
    return this.http.get(`${BASE_DOMAIN}/auth/facebook`,this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

}
