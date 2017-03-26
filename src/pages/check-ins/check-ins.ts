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
  markerIconUrl : string;

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
      this.loadGoogleMaps();
      this.loadLastCheckins();
    });
  }

  private loadLastCheckins(){
    this.data.get(this.config.apiVerbs.checkin).subscribe(
      res => this.lastCheckins = res,
      error => console.log("error loading last checkins"),
      () => {
        console.log("last checkins loaded")
      

        for(var checkin in this.lastCheckins){


          //  this.lastCheckins[checkin]['timeDifferenceFromNow'] = moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow();
          this.lastCheckins[checkin]['timeDifferenceFromNow'] = moment(this.lastCheckins[checkin]['created_at'], "YYYYMMDD").fromNow();
          //  this.lastCheckins[checkin]['timeDifferenceFromNow'] = moment(this.lastCheckins[checkin]['created_at'], "YYYYMMDD").fromNow();

          //  console.log(this.lastCheckins[checkin]['created_at'])
          console.log(this.lastCheckins[checkin]['timeDifferenceFromNow'])



          //  this.data.getCityNameFromLatLng(this.lastCheckins[checkin]['lat'], this.lastCheckins[checkin]['lng']).subscribe(
          //      res => {
          //       //  this.lastCheckins[checkin]['formatted_address'] = res['results'][0]['formatted_address']
          //        console.log(res['results'])

          //       }
          //   )
            

          this.markerIconUrl = this.lastCheckins[checkin]['user']['picture_url'];
          if(this.markerIconUrl == null) {
            this.markerIconUrl = "/assets/noprofile.png";
          }
          


          // this.map.addMarker({
          //   'position': new GoogleMapsLatLng(this.lastCheckins[checkin]['lat'], this.lastCheckins[checkin]['lng']),
          //   'title': this.lastCheckins[checkin]['user']['name'],
          //   "snippet": this.lastCheckins[checkin]['user']['name'],
          //   'icon': {
          //     'url': this.markerIconUrl,
          //     'anchor': [35, 35],
          //     'size': {
          //       width: 30,
          //       height: 30
          //     },
          //   },
          //   'styles' : {
          //     'text-align': 'center',
          //     'font-weight': 'bold'
          //   }
          // });

        
        }
        
      }
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
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!')
      this.locateUser();
      // this.loadLastCheckins();
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
