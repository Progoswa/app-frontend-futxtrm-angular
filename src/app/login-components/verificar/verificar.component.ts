import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login-services/login.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss']
})
export class VerificarComponent implements OnInit {

  verificar;
  token;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private loginService:LoginService
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe((resp)=>{ 
      this.verificarCuenta(resp.token)
    })


  }

  

  verificarCuenta(token){
    this.loginService.authAccount({token}).subscribe((resp:any)=>{
      if(resp.ok){
        this.verificar = true
        // localStorage.setItem('id',resp.userModify._id)
        // localStorage.setItem('role',resp.userModify.role)
      }else{
        if(resp.err.code = 404){
          this.verificar = false;
        }
      }
      
    })
  }


  redirectTo(){
    switch (localStorage.getItem('role')) {
   
      case 'administrador':
      
        
          this.router.navigate(['/admin'])
        break;
      case 'usuario':
          this.router.navigate(['/cliente'])
        break;
      case 'provider':
          this.router.navigate(['/proveedor'])
        break;
      default:
        localStorage.removeItem('id')
        this.router.navigate(['/'])
        break;
    }
    
  }

}
