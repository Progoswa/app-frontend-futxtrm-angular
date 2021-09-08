import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';
import { BorrarComponent } from '../../globals-dialogs/borrar/borrar.component';
import { CategoriaFreeService } from '../../globals-services/categoria-free.service';
import { CategoriaService } from '../../globals-services/categoria.service';
import { MembresiaService } from '../../globals-services/membresia.service';
import { AddCategorieComponent } from '../free-dialogs/add-categorie/add-categorie.component';
import { EditTextComponent } from '../free-dialogs/edit-text/edit-text.component';
import { NuevaMembresiaComponent } from '../membresias-dialogs/nueva-membresia/nueva-membresia.component';
import { UpdateMembresiasComponent } from '../membresias-dialogs/update-membresias/update-membresias.component';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  url: any;
  msg:{title:string,message:string};
  membresias: any;
  constructor(
    private categoriasService:CategoriaService,
    private categoriaFreeService:CategoriaFreeService,
    private dialog:MatDialog,
    private socket:Socket,
    private membresiaService:MembresiaService,
    public translate:TranslateService 
  ) {
    socket.on('lang_change_r',()=>{
      this.ngOnInit()
    })
   }

  categorias = []

  ngOnInit() {
    this.getMembresias()

  }



 



  getImg(imagen){

    
    return `url(${this.url}${imagen})`
  }

  update(data){
    data.url = `${this.url}${data.image}`
    let update = this.dialog.open(UpdateMembresiasComponent,{
      minWidth:'400px',
      width:'30%',
      data
    })

    update.afterClosed().subscribe((resp)=>{
      this.getMembresias()
    })
  }

  
  add(){
    let add = this.dialog.open(NuevaMembresiaComponent,{
      width:'30%',
      minWidth:"400px"
    })

    add.afterClosed().subscribe((resp)=>{
      if(resp){
        this.getMembresias()
      }
    })
  }

  status(id){
    this.membresiaService.status(id).subscribe((resp:any)=>{
      if(resp.code == 200){
        this.getMembresias()
      }
    })
  }

  getMembresias() {
    this.membresiaService.getMembresias(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.code == 200){
        console.log(resp.membresias);
        
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
