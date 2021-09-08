import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map, take } from 'rxjs/operators';
import { CategoriaFreeService } from '../globals-services/categoria-free.service';
import { CategoriaService } from '../globals-services/categoria.service';
import { UsuarioService } from '../globals-services/usuario.service';
import { GuardService } from './guard.service';

@Injectable({
  providedIn: 'root'
})
export class NoCategorieService {

  constructor(
    private router:Router,
    private categoriaService:CategoriaService,
    private socket:Socket,
    private usuarioService:UsuarioService
  ) { 

  }
  
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      return this.categoriaService.getCategoriasPerUser(localStorage.getItem('id')).pipe(
        take(1),
        map((resp:any)=>{
          if(resp.code == 200){
            
            if(resp.categorias == 0){

              return true
            }else{
              this.router.navigate(["/cliente/inicio"])
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
