import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  tab1Root: any = ListPage;
  tab2Root: any = MapPage;
  constructor() {

  }
}
