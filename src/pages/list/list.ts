import { Component } from '@angular/core';
import { Http} from '@angular/http';
import { NavController } from 'ionic-angular';

import { ConfigService } from '../../providers/config';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  SharesList : Array<Object>;

  
  constructor( private config: ConfigService, public http: Http, public navCtrl: NavController) {}

  showOnMap(checkinIdToShowOnMap){
    this.navCtrl.push(MapPage, {
      checkinId: checkinIdToShowOnMap
    });
  }

  ngAfterViewInit() {
    this.requestShareList();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.requestShareList();
      refresher.complete();
    }, 1000);
  }

  private requestShareList () {
    this.http.get(this.config.apiUrl + this.config.apiVerbs.checkin).subscribe ( data => {
        this.SharesList = data.json();
    }, error => {
      console.log(JSON.stringify(error.json()));
    })
  }
}
