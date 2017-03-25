import { Component } from '@angular/core';

import { CheckInsPage } from '../check-ins/check-ins';
import { SharePage } from '../share/share';
import { SettingsPage } from '../settings/settings';
import { ModalController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  tab1Root: any = CheckInsPage;
  tab2Root: any = SharePage;
  tab3Root: any = SettingsPage;
  
  constructor(public modalCtrl: ModalController) {

  }

  CheckIns() {
    let modal = this.modalCtrl.create(CheckInsPage);
    modal.present();
    
  }

}
