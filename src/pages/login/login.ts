import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, private auth: AuthService,  public toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    console.log('ngOnInit LoginPage');
       
    if(localStorage.getItem('token') != null){
      console.log("User already logged in (token found)");
      this.showLoading(); 
      setTimeout(() => {
        this.loading.dismiss();
        this.auth.loadCurrentUser();
        this.navCtrl.setRoot(TabsPage);
      })
    }
  }


  public login() {
    this.showLoading();
    this.auth.loginAttempt(this.registerCredentials).subscribe(
      data =>  { 
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage)
        })
      },
      error => {
        this.showToast("Email or password do not match. Please try again.");
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    this.loading.present();
  }

  showToast(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
