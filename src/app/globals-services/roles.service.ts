import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

constructor(
 private http:HttpClient
) { }

getRoles(){
  return this.http.get(`${environment.URL_API}/roles/roles`)
}
getRole(id){
  return this.http.get(`${environment.URL_API}/roles/rol/${id}`)
}

crear(body){
  return this.http.post(`${environment.URL_API}/roles/roles`,body)
}

asignar(body){
  return this.http.put(`${environment.URL_API}/roles/asignar`,body)

}

eliminar(id,admin){
  return this.http.delete(`${environment.URL_API}/roles/rol/${id}/${admin}`)

}

editar(id,admin,body){
  return this.http.put(`${environment.URL_API}/roles/rol/${id}/${admin}`,body)

}

}
