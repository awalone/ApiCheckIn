import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigService {
  apiUrl :string = " http://checkin-api.dev.cap-liberte.com";

  apiVerbs = {
      auth: "/auth", // POST(email, password)-> return a token
      checkin: "/checkin",  // GET-> return list of last checkins     
                            // POST(lat, lng, image)-> add a checkin
      getACheckin: "/checkin/", // GET(checkinID) -> return data for a specific checkin
      register: "/singup", // POST(name, email, password) -> return a token
      getAccount: "/account/", // GET(accountID) -> return data for a specific account
      updateAccount: "/account/" // POST(email, name, password, image) -> update account informations
  }


  constructor() {
    console.log('Hello Config Provider');
  }
}
