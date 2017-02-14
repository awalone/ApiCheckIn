import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})



export class MapPage {
  loading: Loading;

  map: any;
  geoOptions:any;
  position:any;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.geoOptions = {
      timeout:15000, 
      enableHightAccuracy: true
    };
    
  }

  ngAfterViewInit() {

    /* CHECK FOR NETWORK FIRST */
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    
    this.loading = this.loadingCtrl.create({
      content: 'Please wait for geolocation ...'
    });
    this.loading.present();


    Geolocation.getCurrentPosition(this.geoOptions).then((resp) => {
        
        console.log("lat =" + resp.coords.latitude);
        console.log("lng =" + resp.coords.longitude);

        this.position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        let mapOptions = {
          center: this.position,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        this.markPosition(this.position, "You are here");
        this.loading.dismiss();
    }).catch((error) => {

      console.log(error.code + " : " + error.message);
      this.loading.dismiss();
      let confirm = this.alertCtrl.create({
        title: error.message,
        message: 'Try again ?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Retry');
              this.loadGoogleMaps();
              
            }
          }
        ]
      });
      confirm.present();

    });

  }

  private markPosition(position:any, positionInfos:string) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position,
      });

      let info = new google.maps.InfoWindow ({
        content: positionInfos
      });

      google.maps.event.addListener(marker,'click', function() {
        info.open(this.map,marker);
      })
      
      marker.setMap(this.map);
      return marker;
  }
}