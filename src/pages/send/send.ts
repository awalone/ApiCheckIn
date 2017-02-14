import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-send',
  templateUrl: 'send.html'
})
export class SendPage {

  constructor(public navCtrl: NavController, public params: NavParams) {

  }

  ngOninit() {
    console.log("(send page) user position Lat = " + this.params.get('userPositionLat'));
    console.log("(send page) user position Lat = " + this.params.get('userPositionLng'));
  }
}
