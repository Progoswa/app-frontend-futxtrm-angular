import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BorrarComponent } from '../../globals-dialogs/borrar/borrar.component';
import { CategoriaFreeService } from '../../globals-services/categoria-free.service';
import { CategoriaService } from '../../globals-services/categoria.service';
import { MembresiaService } from '../../globals-services/membresia.service';
@Component({
  selector: 'app-cliente-membresias',
  templateUrl: './cliente-membresias.component.html',
  styleUrls: ['./cliente-membresias.component.scss']
})
export class ClienteMembresiasComponent implements OnInit {
  url: any;
  msg:{title:string,message:string};
  membresias: any;
  constructor(
    private categoriasService:CategoriaService,
    private categoriaFreeService:CategoriaFreeService,
    private dialog:MatDialog,
    private socket:Socket,
    private membresiaService:MembresiaService,
    private router:Router
  ) {
    socket.on('lang_change_r',()=>{
      this.ngOnInit()
    })
   }

  categorias = []

  ngOnInit() {
    this.getMembresias()

  }



  info(membresia){
    this.router.navigate(["/cliente/membresia/info"],{queryParams:{id:membresia}})
  }



  getImg(imagen){

    
    return `url(${this.url}${imagen})`
  }


  
  
  getMembresias() {
    this.membresiaService.getMembresiasInfo(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.code == 200){
        this.membresias = resp.membresias
        this.url = resp.url
      }
    })
    
  }

  remove(membresia){
    let remove = this.dialog.open(BorrarComponent,{
      width:'400px'
    })

    remove.afterClosed().subscribe((resp)=>{
      console.log(resp);
      
      if(resp){
        this.membresiaService.delete(membresia).subscribe((resp:any)=>{
          if(resp.code == 200){
            this.getMembresias()
          }
        })
      }
    })
  }

}
