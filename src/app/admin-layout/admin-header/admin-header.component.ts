import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../globals-services/usuario.service';
import { Socket } from 'ngx-socket-io';
import { NotificacionesService } from '../../globals-services/notificaciones.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class adminHeaderComponent implements OnInit {
  usuario: any;
  notificaciones: any;
  nuevos: any;

  constructor(
    private router:Router,
    private usuarioService:UsuarioService,
    private socket:Socket,
    private notificacionesService:NotificacionesService,
    private translate:TranslateService
  ){

  }

  switchLang(lang: string) {
    localStorage.setItem('lang',lang) 
    this.translate.use(lang);
    this.socket.emit('lang_change')
  }


  ngOnInit(){
    this.getUser()
    this.socket.on('cambios_en_datos_r',(data)=>{  
      this.getUser()
    })

    this.socket.on('nueva_notificacion_r',()=>{
      this.getNotificaciones()
    })

    this.getNotificaciones()
  }

  getNotificaciones() {
    this.notificacionesService.misNotificaciones(localStorage.getItem('id')).subscribe((resp:any)=>{

      
      if(resp.ok){
        this.notificaciones = resp.notificaciones
        this.nuevos = resp.nuevos
      }
    })
  }

  verNotificacion(notificacion){
 
    this.notificacionesService.notificacionVista(notificacion._id).subscribe((resp:any)=>{
      this.getNotificaciones()
      this.router.navigate([notificacion.link],{queryParams:notificacion.parametros})
    })
    
  }



  getUser(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
     
      
      if(resp.ok){
        resp.data.url =  resp.url + resp.data.foto
        this.usuario = resp.data
       
      }
      
    })
  }


  salir(){
    localStorage.removeItem('id')
    this.router.navigate(['/ingresa'])
  }
}
