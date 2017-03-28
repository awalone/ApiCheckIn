import { Component } from '@angular/core';
import {  Platform, 
          NavController, 
          NavParams,
          LoadingController, 
          Loading, 
          AlertController 
} from 'ionic-angular';

import { ConfigService } from '../../providers/config';
import { DataService } from '../../providers/data-service';

/*
  Generated class for the UserDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})

export class UserDetailsPage {
  userDetails : Array<Object>;


// created_at:"2017-03-27 21:21:46"
// email:"a@b.com"
// id:"69"
// name:"moi"
// picture_url:"http://checkin-api.dev.cap-liberte.com/img/user58d9a60617e5d6.80190576.jpg"


  constructor ( public platform: Platform, 
              public navCtrl: NavController,
              private navParams: NavParams,
              private config: ConfigService,
              private data: DataService,
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController
  ) {
    this.userDetails = this.navParams.get('userData');
    console.log(this.userDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }



}
