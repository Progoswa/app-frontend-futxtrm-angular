import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CategoriaService } from './categoria.service';

export interface Usuario {
  nombre:string
  apellido:string
  email:string
  username:string
  telefono:string
  foto:string
  _id:string
 }
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private http:HttpClient,private router:Router,private categoriaService:CategoriaService) { }

public user:Usuario = null;

public categories = false

getUser(id){
  return this.http.get(`${environment.URL_API}/usuario/usuario/${id}`)
}



verifyCategories(){
  this.categoriaService.getCategoriasPerUser(localStorage.getItem('id'))
  .subscribe((resp:any)=>{
    if(resp.code == 200){
        this.categories = (resp.categorias > 0)?true:false
    }
  })
}


logout(){
  localStorage.removeItem('id')
  localStorage.removeItem('token')
  this.router.navigate(['/ingresa'])
  this.user = null;
}
setUser(user:Usuario){
  if(this.user == null){
    this.user = user
  }
 
}

verifyToken(token){
  return this.http.get(`${environment.URL_API}/usuario/token/${token}`)

}

getUserByRole(role){
  return this.http.get(`${environment.URL_API}/usuario/usuarioRole/${role}`)
}

getUsers(){
  return this.http.get(`${environment.URL_API}/usuario/`)
}

updatePerfilUser(id,body){
  return this.http.put(`${environment.URL_API}/usuario/perfil/${id}`,body)
}

updateRolAdminById(id, body){
  return this.http.put(`${environment.URL_API}/usuario/updateRolAdminById/${id}`, body) 
}

updateUserByAdmin(body){
  return this.http.put(`${environment.URL_API}/usuario/updateUserByAdmin`,body) 
}
updateSeguridadUser(id,body){
  return this.http.put(`${environment.URL_API}/usuario/seguridad/${id}`,body)
}

uploadImage(formData){
  return this.http.post(`${environment.URL_API}/usuario/uploadImageById`,formData)
}

updateStatusUsuario(body){
  return this.http.post(`${environment.URL_API}/usuario/status`,body)
 
}

delete(id,idAdmin){
    
  return this.http.delete(`${environment.URL_API}/usuario/${id}/${idAdmin}`)

}


}
