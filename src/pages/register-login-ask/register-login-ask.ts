import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/*
  Generated class for the RegisterLoginAsk page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register-login-ask',
  templateUrl: 'register-login-ask.html'
})
export class RegisterLoginAskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterLoginAskPage');
  }

  navigate(page) {
    console.log("PAGE REQUESTED" + page);
    if(page == 'login') {
      this.navCtrl.push(LoginPage);
    } else if(page == 'register') {
      this.navCtrl.push(RegisterPage);
    } else {
      this.navCtrl.setRoot(this);
    }
  }

}
