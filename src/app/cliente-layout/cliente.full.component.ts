import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { MenuItems } from '../shared/menu-items/menu-items';
import { ClienteItems } from '../shared/menu-items/cliente-items';
import { MatMenuTrigger } from '@angular/material';
import { CategoriaService } from '../globals-services/categoria.service';
import { UsuarioService } from '../globals-services/usuario.service';

/** @title Responsive sidenav */
@Component({
  selector: 'cliente-full-layout',
  templateUrl: 'cliente.full.component.html',
  styleUrls: ['cliente.full.component.scss']
})
export class clienteFullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: ClienteItems,
    private categoriaService:CategoriaService,
    public usuarioService:UsuarioService

  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  
  }

  
  @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

  logout(){
    this.usuarioService.logout()
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}
}
