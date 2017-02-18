import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor(public navCtrl: NavController, public params: NavParams) {

  }

  ngOninit() {
    console.log("(share page) user position Lat = " + this.params.get('userPositionLat'));
    console.log("(share page) user position Lat = " + this.params.get('userPositionLng'));
  }
}

