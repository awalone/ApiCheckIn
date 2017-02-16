import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';

import { ConfigService } from '../../providers/config';
import { DataService } from '../../providers/data-service';


import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';

/*
  Generated class for the CheckIns page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-ins',
  templateUrl: 'check-ins.html'
})
export class CheckInsPage {

  displayType: string;

  lastChekins : Array<Object>;

  constructor ( public platform: Platform, 
                public navCtrl: NavController,
                private config: ConfigService,
                private data: DataService,
                public loadingCtrl: LoadingController, 
                public alertCtrl: AlertController
  ) {
    this.displayType = "list";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInsPage');
    
    this.loadLastCheckins();
    console.log(JSON.stringify(this.lastChekins));
  }

  private loadLastCheckins(){
    this.data.requestApi(this.config.apiVerbs.checkin).subscribe(
      res => this.lastChekins = res,
      error => console.log("error loading last checkins"),
      () => console.log("last checkins loaded")
    )
  }
  
}
