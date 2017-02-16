import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { CheckInsPage } from '../check-ins/check-ins';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  tab1Root: any = CheckInsPage;
  tab2Root: any = SettingsPage;
  constructor() {

  }
}
