import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  group?: any[];
}



 

@Injectable()
export class ClienteItems {

  
  constructor(
    public translateService:TranslateService,
    private socket:Socket
  ){

    
  }

  generateItems(){
    return ([
      { state: 'inicio', name: this.translateService.instant("sidebar.client.home"), type: 'link', icon: 'home_outline' },
      { state: 'calendario', name: this.translateService.instant("sidebar.client.calendar"), type: 'link', icon: 'calendar_today' },
      { state: 'plantillas', name: this.translateService.instant("sidebar.client.templates"), type: 'link', icon: 'article' },
      { state: 'membresias', name: this.translateService.instant("sidebar.client.memberships"), type: 'link', icon: 'card_membership' },
     
    ])
  }

  getMenuitem(): Menu[] {
    return this.generateItems();
  }
}
