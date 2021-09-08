import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ClienteItems } from '../../shared/menu-items/cliente-items';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'cliente-sidebar',
  templateUrl: './cliente-sidebar.component.html',
  styleUrls: []
})
export class clienteSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: ClienteItems,
    private socket:Socket
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.socket.on('lang_change_r',()=>{
   
      this.chargeItems()
      
    })
    this.chargeItems()
  }


  chargeItems(){
    this.Items = this.menuItems.getMenuitem()
  }

  Items = []
  logGroup(item){
    
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
