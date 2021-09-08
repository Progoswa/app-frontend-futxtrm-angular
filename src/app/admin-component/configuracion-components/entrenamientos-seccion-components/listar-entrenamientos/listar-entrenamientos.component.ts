import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { EntrenamientoService } from '../../../../globals-services/entrenamiento.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-entrenamientos',
  templateUrl: './listar-entrenamientos.component.html',
  styleUrls: ['./listar-entrenamientos.component.scss']
})
export class ListarEntrenamientosComponent implements OnInit {
  entrenamientos: any;
  url: any;

  constructor(
      public dialogRef: MatDialogRef<ListarEntrenamientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entrenamientosSerivce:EntrenamientoService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getEntrenamientos()
  }

  getEntrenamientos(){
    this.entrenamientosSerivce.getEntrenamientos(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.ok){
    
        this.url = resp.url
        this.entrenamientos = resp.entrenamientos
      }
    })
  }

  getEntrenamientosFilter(query){
    this.entrenamientosSerivce.getEntrenamientosFilter(query).subscribe((resp:any)=>{
      if(resp.ok){
      
        this.url = resp.url
        this.entrenamientos = resp.entrenamientos
      }
    })
  }



 

  uploadVimeo(id){
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`)
  
   
  }

  seleccionados = []


  async seleccionar(id){
    let existe = await  this.seleccionados.find((seleccionado)=>{
      return seleccionado == id
    })

    if(existe == undefined){
      this.seleccionados.push(id)
    }else{
      this.seleccionados = await this.seleccionados.filter((select)=>{
        return select != id
      })
    }

    
    
  }

  buscar(query){
    this.getEntrenamientosFilter(query)
    
  }
  aceptar(){
    let body = {
      entrenamientos:this.seleccionados,
      seccion:this.data.id,
      usuario:localStorage.getItem('id')
    }
    this.entrenamientosSerivce.entrenamientosSeccion(body).subscribe((resp:any)=>{
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
  
  }
  onNoClick(){
    this.dialogRef.close(false)
  }

}
