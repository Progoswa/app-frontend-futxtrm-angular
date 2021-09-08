import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Socket } from 'ngx-socket-io';
import { BorrarComponent } from '../../globals-dialogs/borrar/borrar.component';
import { CategoriaFreeService } from '../../globals-services/categoria-free.service';
import { CategoriaService } from '../../globals-services/categoria.service';
import { UsuarioService } from '../../globals-services/usuario.service';
import { AddCategorieComponent } from '../free-dialogs/add-categorie/add-categorie.component';
import { EditTextComponent } from '../free-dialogs/edit-text/edit-text.component';
export interface MsgFree{
  title:string
  message:string
  days:number
}
@Component({
  selector: 'app-categories-free',
  templateUrl: './categories-free.component.html',
  styleUrls: ['./categories-free.component.scss']
})
export class CategoriesFreeComponent implements OnInit {
  url: any;
  msg:MsgFree;
  constructor(
    private categoriasService:CategoriaService,
    private categoriaFreeService:CategoriaFreeService,
    private dialog:MatDialog,
    private socket:Socket,
    private userService:UsuarioService
  ) {
    socket.on('lang_change_r',()=>{
      this.ngOnInit()
    })
   }

  categorias = []

  ngOnInit() {
    this.getCategories()
    this.getMsg()
  }

 getCategories(){
  this.categoriaFreeService.getCategoriesFree(localStorage.getItem("lang")).subscribe((resp:any)=>{
    if(resp.code == 200){
      this.categorias = resp.categorias
      this.url = resp.url
      console.log(this.categorias);
      
    }
    
  })
  }


  getMsg() {
    this.categoriaFreeService.getMsg(localStorage.getItem('lang')).subscribe((resp:{code:number,data:MsgFree})=>{
     
      
      if(resp.code == 200){

        this.msg = resp.data
      }
    })
  }




  getImg(imagen){

    
    return `url(${this.url}${imagen})`
  }

  edit(){
    let edit = this.dialog.open(EditTextComponent,{
      width:'400px'
    })

    edit.afterClosed().subscribe((resp)=>{
      this.getMsg()
      this.getCategories()
    })
  }

  
  add(){
    let add = this.dialog.open(AddCategorieComponent,{
      width:'400px'
    })

    add.afterClosed().subscribe((resp)=>{
      if(resp){
        this.getCategories()
      }
    })
  }

  remove(categorie){
    let remove = this.dialog.open(BorrarComponent,{
      width:'400px'
    })

    remove.afterClosed().subscribe((resp)=>{
      console.log(resp);
      
      if(resp){
        this.categoriaFreeService.deleteCategorieFree(categorie).subscribe((resp:any)=>{
          if(resp.code == 200){
            this.getCategories()
          }
        })
      }
    })
  }
}
