import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';
import { AceptarComponent } from '../../globals-dialogs/aceptar/aceptar.component';
import { CategoriaFreeService } from '../../globals-services/categoria-free.service';
import { CategoriaService } from '../../globals-services/categoria.service';
import { MembresiaService } from '../../globals-services/membresia.service';
import { UsuarioService } from '../../globals-services/usuario.service';

@Component({
  selector: 'app-no-categorie',
  templateUrl: './no-categorie.component.html',
  styleUrls: ['./no-categorie.component.scss']
})
export class NoCategorieComponent implements OnInit {
  free = false
  url: any;
  msg:{title:string,message:string};
  membresias: any;
  j = 0;
  constructor(
    private categoriasService:CategoriaService,
    private categoriaFreeService:CategoriaFreeService,
    private membresiasService:MembresiaService,
    private dialog:MatDialog,
    private socket:Socket,
    private userService:UsuarioService,
    private router:Router,
    public translate:TranslateService,
    private route:ActivatedRoute
  ) {
    route.queryParams.subscribe((data)=>{
      this.option = data.o || 'c'
    })
    this.userService.verifyCategories()
    categoriasService.getCategoriasPerUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.code == 200){
        if(resp.categorias_free == 0){
          this.free = true
        }
      }
    })
    socket.on('lang_change_r',()=>{
      this.ngOnInit()
    })
   }  


  categorias = []

  ngOnInit() {
    this.getCategories()
    this.getMsg()
  }

  categoria = null;

  select(categoria){
    this.categoria = categoria
  }

  categoriaSelected(categoria){
    return (this.categoria == categoria)?true:false
    
  }

  i = 0

  option = 'c'

  cOption(o){
    this.option = o
    this.categoria = null
    this.i = 0
  }

 getCategories(){
  this.categoriasService.getCategorias(localStorage.getItem("lang")).subscribe((resp:any)=>{
    console.log(resp);
    
    if(resp.ok){
      this.categorias = resp.categorias
      this.url = resp.url
      
    }
    
  })
  this.membresiasService.getMembresiasInfo(localStorage.getItem("lang")).subscribe((resp:any)=>{
    console.log(resp);
    
    if(resp.code == 200){
      this.membresias = resp.membresias
    }
  })
  }

   next(){
     let data;
     if(this.option == 'c'){
      data = {msg:this.translate.instant('user.start.categorie.next.title'),content:this.translate.instant('user.start.categorie.next.subtitle')}

     }else{
      data = {msg:this.translate.instant('user.start.membership.next.title'),content:this.translate.instant('user.start.membership.next.subtitle')}

     }
     let aceptar = this.dialog.open(AceptarComponent,{
       width:'400px',
       data
     })

     aceptar.afterClosed().subscribe((resp)=>{
       if(resp){
        if(this.option == 'c'){
          this.router.navigate(["/cliente/categoria/comprar"],{queryParams:{id:this.categoria}})
         } else {
          this.router.navigate(["/cliente/membresia/comprar"],{queryParams:{id:this.categoria}})
         }
       

         
       }
     })
   }

  logout(){
    this.userService.logout()
  }


  getMsg() {
    this.categoriaFreeService.getMsg(localStorage.getItem('lang')).subscribe((resp:{code:number,data:{title:string,message:string}})=>{
     
      
      if(resp.code == 200){

        this.msg = resp.data
      }
    })
  }

  add(i){
    if(this.option == 'c'){
      this.i += i

      if(this.i > this.categorias.length - 3){
          this.i -= 1
      }else if(this.i < 0){
        this.i = 0
      }
    }else{
      this.j += i
      if(this.j > this.membresias.length - 3){
        this.j -= 1
    }else if(this.j < 0){
      this.j = 0
    }
    }
    
  }
 
  getImg(imagen){
    return `url(${this.url}${imagen})`
  }
}
