import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    this.email = mail;
    this.token = name;
  }
}



@Injectable()
export class AuthService {

  currentUser: User;

  constructor(public http: Http) {
    console.log('AuthService Provider ctor');
  }


  public login(credentials) {
    console.log('AuthService Provider login');
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        // REQUEST API HERE
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('email@email.com', 'Xx-NINJA-TOKEN-xX');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    console.log('AuthService Provider getUserInfo');
    return this.currentUser;
  }

  public logout() {
    console.log('AuthService Provider logout');
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
