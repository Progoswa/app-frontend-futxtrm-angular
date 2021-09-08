import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

constructor(
  private http:HttpClient
) { }


misNotificaciones(id){
  return this.http.get(`${environment.URL_API}/notificaciones/misnotificaciones/${id}`)
}

notificacionVista(id){
  return this.http.get(`${environment.URL_API}/notificaciones/notificacionvista/${id}`)

}
}
