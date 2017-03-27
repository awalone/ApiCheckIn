import { Component } from '@angular/core';
import {  Platform, 
          NavController, 
          LoadingController, 
          Loading, 
          AlertController 
} from 'ionic-angular';

import { ConfigService } from '../../providers/config';
import { DataService } from '../../providers/data-service';
import * as moment from 'moment';

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
  checkinPosition: GoogleMapsLatLng;
  cameraPos: CameraPosition

  lastCheckins : Array<Object>;

  FullscreenImageDisplayed: boolean;
  FullscreenImagePath: String;


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
    this.FullscreenImageDisplayed = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInsPage');
    
    this.platform.ready().then(() => {
      this.loadGoogleMaps();
      // this.loadLastCheckins();
      
    });
  }

  private loadLastCheckins(){
    this.data.get(this.config.apiVerbs.checkin).subscribe(
      checkinRes => this.lastCheckins = checkinRes,
      error => console.log("error loading last checkins"),
      () => {
        console.log("last checkins loaded")
      

        for(let checkin in this.lastCheckins){
          // CHECKIN TIME DIFFERENCE FROM NOW
          this.lastCheckins[checkin]['timeDifferenceFromNow'] = moment(this.lastCheckins[checkin]['created_at'], "YYYYMMDD").fromNow();

          
          // SEARCH FOR CITY NAME FROM POSITION FROM GOOGLE MAPS
          this.data.getCityNameFromLatLng(this.lastCheckins[checkin]['lat'], this.lastCheckins[checkin]['lng']).subscribe(
            cityNameRes => {
              this.lastCheckins[checkin]['formatted_address'] = "Location unknown";
              if(cityNameRes['status'] == "OK"){
                this.lastCheckins[checkin]['formatted_address'] = cityNameRes['results'][2]['formatted_address'];
              }
              if(this.lastCheckins[checkin]['lat'] != 0 || this.lastCheckins[checkin]['lng']) {
                // ADD MARKER ON MAP
                this.map.addMarker({
                  'position': new GoogleMapsLatLng(this.lastCheckins[checkin]['lat'], this.lastCheckins[checkin]['lng']),
                  'title': this.lastCheckins[checkin]['user']['name'],
                  "snippet": this.lastCheckins[checkin]['formatted_address'],
                  'styles' : {
                    'text-align': 'center',
                    'font-weight': 'bold'
                  }
                });
              }

            }, 
            error => console.log(error)
          )
            

        }
        
      }
    )
  }
  

  toggleImageFullscreen(imagePath) {

    if(this.FullscreenImageDisplayed == true) {
      this.FullscreenImageDisplayed = false;
    } else if (this.FullscreenImageDisplayed == false) {
      this.FullscreenImageDisplayed = true;
      this.FullscreenImagePath = imagePath;
    }
    
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
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!')
      this.locateUser();
      this.loadLastCheckins();
    });
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
      zoom: 18
    };

    // move the map's camera to position
    this.map.moveCamera(this.cameraPos);
  }


  private showCheckinOnMap(lat, lng) {

    this.displayType = "map";

    this.checkinPosition = new GoogleMapsLatLng(lat, lng);

    // create CameraPosition
    this.cameraPos = {
      target: this.checkinPosition,
      zoom: 18
    };

    // move the map's camera to position
    this.map.moveCamera(this.cameraPos);
  }


}
