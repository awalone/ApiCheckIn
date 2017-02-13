import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, private auth: AuthService) {

    console.log(auth.currentUser.email);
    console.log(auth.currentUser.token);
  }


}
