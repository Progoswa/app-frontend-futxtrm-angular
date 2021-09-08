import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresiaService } from '../../../globals-services/membresia.service';
import { UsuarioService } from '../../../globals-services/usuario.service';

@Component({
  selector: 'app-membresia-info',
  templateUrl: './membresia-info.component.html',
  styleUrls: ['./membresia-info.component.scss']
})
export class MembresiaInfoComponent implements OnInit {
  membresia: any = null;
  url: any;
  owner: any;

  constructor(
    private route:ActivatedRoute,
    private membresiaService:MembresiaService,
    private router:Router,
    private userService:UsuarioService
  ) { 
    route.queryParams.subscribe((data)=>{
      membresiaService.getMembresia(data.id).subscribe((resp:any)=>{
        if (resp.code == 200) {
          this.membresia = resp.membresia
          this.url = resp.url
          membresiaService.owner({usuario:userService.user._id,membresia:resp.membresia._id}).subscribe((resp:any)=>{
            if(resp.code == 200){
              this.owner = resp.membresia
            }
            
          })
          
        } else {
          router.navigate(["/cliente/membresias"])
        }
        
      })
      
    })
  }

  ngOnInit() {
  }

  getImg(imagen){return `url(${this.url}${imagen})`}

  comprar(){
    let id = this.membresia._id
    this.router.navigate(["/cliente/membresia/comprar"],{queryParams:{id}})
  }

}
