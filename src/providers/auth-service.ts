import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


export class User {

  email: string;
  token: string;

  constructor(mail: string, token: string) {

    /* check local storage */
    
    this.email = mail;

    this.token = token;
  }
}



@Injectable()
export class AuthService {

  currentUser: User;
  private ApiUrl : string ='http://checkin-api.dev.cap-liberte.com/auth';

  constructor(public http: Http) {
    console.log('AuthService Provider ctor');
  }



  public loginAttempt(credentials) {
    console.log('AuthService Provider login');

    let params = new URLSearchParams();
    params.append('email', credentials.email);
    params.append('password', credentials.password);
    let postData = params.toString();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.post(this.ApiUrl, postData, {headers: headers}).map((response : any) => {
      this.currentUser = new User(credentials.email, response.json().token);
      localStorage.setItem('email', credentials.email);
      localStorage.setItem('token', response.json().token);
    });

  }

  public loadCurrentUser(){
    this.currentUser = new User(localStorage.getItem('email'), localStorage.getItem('token'));
  }
  
  public logout() {
    console.log('AuthService Provider logout');
    return Observable.create(observer => {
      this.currentUser = null;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      observer.next(true);
      observer.complete();
    });
  }

}
