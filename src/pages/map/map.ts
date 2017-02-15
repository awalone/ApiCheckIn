import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { SendPage } from '../send/send';


import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})



export class MapPage {
  loading: Loading;

  map: GoogleMap;
  geolocationOptions: any;
  userPosition: GoogleMapsLatLng;
  cameraPos: CameraPosition

  checkInsVisible: boolean;

  constructor(public platform: Platform, public navCtrl: NavController, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.checkInsVisible = false; // default value will be configurage by user

    this.geolocationOptions = {
        enableHighAccuracy: true      // Force GPS -> default value will be configurage by user
    };

  }


  ngAfterViewInit() {
    console.log('ngOnInit MapPage');
    this.platform.ready().then(() => {
      this.loadGoogleMaps();
      this.locateUser();

      if(this.checkInsVisible == true) {
        this.checkInsVisible = false;
        this.toggleCheckIns();
      }
    });
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



  private toggleCheckIns() {
    console.log('toggleCheckIns');
      
    if(this.checkInsVisible == true) {
      console.log("Hide Check Ins");
      this.map.clear();
      this.checkInsVisible = false;
    } else if (this.checkInsVisible == false) {
      console.log("Show Check Ins");
      
      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: this.userPosition,
        title: 'Marker'
      };

      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });

      this.checkInsVisible = true;
    }



  }

  private share(){
    this.locateUser();
    this.navCtrl.push(SendPage, {
      userPositionLat : this.userPosition.lat,
      userPositionLng : this.userPosition.lng
    });
  }
}