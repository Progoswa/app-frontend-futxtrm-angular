import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map, take } from 'rxjs/operators';
import { CategoriaService } from '../globals-services/categoria.service';
import { UsuarioService } from '../globals-services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FreeGuardService {
  constructor(
    private router:Router,
    private categoriaService:CategoriaService,
    private socket:Socket,
    private usuarioService:UsuarioService
  ) { }
  
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      return this.categoriaService.getCategoriasPerUser(localStorage.getItem('id')).pipe(
        take(1),
        map((resp:any)=>{
          console.log(resp);
          
          if(resp.code == 200){
            
            if(resp.categorias_free > 0){
              this.router.navigate(["/cliente"])
              return false
            }else{
              return true
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
