import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor( private config: ConfigService, public http: Http) {
    console.log('Hello DataService Provider');
  }


  public get(verb:string) {
    return this.http.get(this.config.apiUrl + verb).map ( 
      res => res.json()
    )
  }

  public getCityNameFromLatLng(lat, lng) {
    return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ", " + lng + "&sensor=true").map ( 
      res => res.json()
    )
  }


}
