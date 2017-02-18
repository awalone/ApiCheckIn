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

  map: GoogleMap;
  geolocationOptions: any;
  userPosition: GoogleMapsLatLng;
  cameraPos: CameraPosition

  lastChekins : Array<Object>;

  constructor ( public platform: Platform, 
                public navCtrl: NavController,
                private config: ConfigService,
                private data: DataService,
                public loadingCtrl: LoadingController, 
                public alertCtrl: AlertController
  ) {
    this.displayType = "list";
    this.geolocationOptions = {
      enableHighAccuracy: true      // Force GPS -> default value will be configurage by user
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInsPage');
    
    

    this.platform.ready().then(() => {
      this.loadLastCheckins();
      this.loadGoogleMaps();
      this.locateUser();
      }
    );


  }

  private loadLastCheckins(){
    this.data.requestApi(this.config.apiVerbs.checkin).subscribe(
      res => this.lastChekins = res,
      error => console.log("error loading last checkins"),
      () => console.log("last checkins loaded")
    )
  }
  
  doRefresh(refresher) {
    console.log('Begin refresh', refresher);
    setTimeout(() => {
      console.log('Refresh finished');
      this.loadLastCheckins();
      refresher.complete();
    }, 1000);
  }

  private loadGoogleMaps() {
    this.map = new GoogleMap(document.getElementById('map'), {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
  }

  private locateUser() {
    this.map.getMyLocation(this.geolocationOptions).then((location) => {
      console.log("location success");
      console.log("lat = " + location.latLng.lat);
      console.log("lng = " + location.latLng.lng);

      this.userPosition = new GoogleMapsLatLng(location.latLng.lat, location.latLng.lng);

      this.showUserPositionOnMap();
    }).catch((error) => {
      console.log("location error : " + error);
    })
  }

  private showUserPositionOnMap() {

    // create CameraPosition
    this.cameraPos = {
      target: this.userPosition,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    this.map.moveCamera(this.cameraPos);

  }


}
