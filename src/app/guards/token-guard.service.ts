import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { UsuarioService } from '../globals-services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService {

constructor(
  public userService:UsuarioService
) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  
    return this.userService.verifyToken(localStorage.getItem('token')).pipe(
      take(1),
      map((resp:any)=>{    
        return true
        
      }),
      catchError((err, caught) => {
        this.userService.logout()
        return of(false)
      })
    )
}
}
