import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';
import { NotificacionesService } from '../../globals-services/notificaciones.service';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.scss']
})
export class AdminNotificationsComponent implements OnInit {
  nuevos: any;
  notificaciones: any;

  constructor(
    private notificacionesService:NotificacionesService,
    private socket:Socket,
    private router:Router,
    public translate:TranslateService
  ) { }

  ngOnInit() {
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
}
