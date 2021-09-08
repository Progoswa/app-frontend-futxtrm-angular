import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { GuardService } from './guard.service';
import { UsuarioService } from '../globals-services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUsuarioService {
  constructor(
    private router:Router,
    private guardService:GuardService,
    private socket:Socket,
    private usuarioService:UsuarioService
  ) { }
  
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      return this.guardService.getUser(localStorage.getItem('id')).pipe(
        take(1),
        map((resp:any)=>{
          if(resp.ok){
            if(resp.data.role == 'usuario'){
              this.usuarioService.setUser(resp.data)
              
              this.socket.emit('registerID',{id:localStorage.getItem('id')})
              return true
            }else{
              return false
            }
           
          }else{
              
            localStorage.removeItem('id')
            this.router.navigate(['/ingresa']);
            return false
          }
          
        })
      )
  }
  
  
}
