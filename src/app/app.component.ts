import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './globals-services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  @HostListener('window:beforeunload', ['$event'])

  
  doSomething($event) {
    if(localStorage.getItem('remember') != 'true'){
      localStorage.removeItem('id')
    }
  }

  constructor(
    private socket:Socket,
    private translate:TranslateService,
    private usuarioService:UsuarioService
  ){

    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    if(localStorage.getItem('lang') == undefined){
      switch (window.navigator.language.slice(0,2)) {
        case "es":
          translate.use('es')
          break;
        case "en":
          translate.use('en')
          break;
      
        default:
          translate.use('en')
          break;
      }
      localStorage.setItem('lang',translate.currentLang)
    }else{
      translate.use(localStorage.getItem('lang'))
    }
   
    usuarioService.verifyCategories()
    
  }

  ngOnDestroy(){
    // this.socket.disconnect()
  }

  ngOnInit(){
    // this.socket.connect()
  }
}
