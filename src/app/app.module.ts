import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SharePage } from '../pages/share/share';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CheckInsPage } from '../pages/check-ins/check-ins';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

import { ConfigService } from '../providers/config';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';

@NgModule({
  declarations: [
    MyApp,
    SharePage,
    LoginPage,
    RegisterPage,
    CheckInsPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SharePage,
    LoginPage,
    RegisterPage,
    CheckInsPage,
    SettingsPage,
    TabsPage
  ],
  providers: [ConfigService, AuthService, DataService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
