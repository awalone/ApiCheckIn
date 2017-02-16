import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';

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

  displayType;

  constructor(public platform: Platform, public navCtrl: NavController, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.displayType = "list";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInsPage');
  }

}
