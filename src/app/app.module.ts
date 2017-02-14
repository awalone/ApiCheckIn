import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SendPage } from '../pages/send/send';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    SendPage,
    ListPage,
    MapPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SendPage,
    ListPage,
    MapPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
