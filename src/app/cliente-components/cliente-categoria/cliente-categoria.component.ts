import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../globals-services/categoria.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../globals-dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material';
import { PlantillaService } from '../../globals-services/plantilla.service';
import { ErrorDialogComponent } from '../../globals-dialogs/error-dialog/error-dialog.component';
import { PedirDatoStringComponent } from '../../globals-dialogs/pedir-dato-string/pedir-dato-string.component';

@Component({
  selector: 'app-cliente-categoria',
  templateUrl: './cliente-categoria.component.html',
  styleUrls: ['./cliente-categoria.component.scss']
})
export class ClienteCategoriaComponent implements OnInit {
  id: any;
  categoria: any;
  secciones: any;
  url: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoriaService:CategoriaService,
     private sanitizer:DomSanitizer,
     private dialog:MatDialog,
     private plantillaService:PlantillaService

  ) { 
 
    
    route.queryParams.subscribe((data)=>{
      this.id = data.id
    })

  }

  ngOnInit() {
    this.owner()
    this.getSecciones()
  }

  uploadVimeo(id){
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`)
  
   
  }
DomSanitizer


  getSecciones() {
    this.categoriaService.categoriaSecciones(this.id).subscribe((resp:any)=>{
      if(resp.ok){
        this.secciones = resp.secciones_entrenamientos
        this.url = resp.url
        
     
        this.secciones.forEach((seccion) => {
            this.plantilla.push(
              {
                seccion:seccion.seccion._id,
                ejercicios:[],
                cantidad:seccion.bloque.ejercicios,
                minutos:seccion.bloque.minutos
              }
            )
        });

      
        
      }
    })
  }
  
  owner() {
    this.categoriaService.categoriaOwner({categoria:this.id,usuario:localStorage.getItem('id')}).subscribe((resp:any)=>{
      if(!resp.ok){
        this.router.navigate(['/cliente'])
      }else{
       this.categoria = resp.categoria.categoria
        
      }
      
    })
  }

  

  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }




  entrenamientoSelected(seccion,entrenamiento){
     let ejercicio = this.plantilla.find((objeto)=>{
      if(objeto.seccion == seccion){
     
        
        return objeto.ejercicios.includes(entrenamiento)
      
      }
    })

    if(ejercicio == undefined){
      return false
    }else{
      return true
    }
    
  
  }


  seccionCheck(seccion){
    let seccionFind = this.plantilla.find((objeto)=>{
      return objeto.seccion == seccion
    })
    
    if(seccionFind.cantidad == seccionFind.ejercicios.length){
      return true
    }else{
      return false
    }
    

  }


  addToPlantilla(seccion,entrenamiento){
   
    
    this.plantilla = this.plantilla.map((objeto)=>{
      if(objeto.seccion == seccion){
       
        let exist = objeto.ejercicios.find((ejercicio)=>{
          return ejercicio == entrenamiento
        })

        if(exist == undefined){
          if(objeto.ejercicios.length < objeto.cantidad){
      
            objeto.ejercicios.push(entrenamiento)
          }else{
            this.success('Cantidad maxima','No puedes seleccionar mas videos de esta seccion')
          }
    
        }else{
          objeto.ejercicios = objeto.ejercicios.filter((ejercicio)=>{
            return ejercicio != entrenamiento
          })
        }
      

      }
      return objeto
    })
  }
  
  plantilla = []

  generarPlantilla(){
    let dato = this.dialog.open(PedirDatoStringComponent,{
      width:'350px',
      data:{label:'Nombre',msg:"Nombre de la plantilla"}
    })

    dato.afterClosed().subscribe((dato)=>{
      if(dato != false){
        this.plantillaService.nuevaPlantilla({usuario:localStorage.getItem('id'),plantilla:this.plantilla,nombre:dato,categoria:this.id}).subscribe((resp:any)=>{
          if(resp.ok){
            this.router.navigate(['/cliente/plantilla'],{queryParams:{id:resp.plantilla._id}})
            this.success('Plantilla generada','Su plantilla se genero correctamente')
          }else{
            if(resp.err.code == 10){
              this.errorDialog('Limite excedido','Solo puede crear una plantilla diaria por categoria')
            }else{

              this.errorDialog('Algo salio mal','Su plantilla no se pudo generar intente mas tarde')
            }
          }
        })
      }
    })

  
  }

  changeBloque(bloque,seccion){

    this.plantilla = this.plantilla.map((objeto)=>{
      if(objeto.seccion == seccion){
        objeto.cantidad = bloque.ejercicios
        objeto.minutos = bloque.minutos
        objeto.ejercicios = []
      }
      return objeto
    })
    
  }

  condicionChange(seccion){

    this.plantilla = this.plantilla.map((objeto)=>{
      if(objeto.seccion == seccion.seccion._id){
        objeto.ejercicios = []
      }
      return objeto
    })
  }

  canGenerate(){
    let can = this.plantilla.find((objeto)=>{
      return objeto.cantidad != objeto.ejercicios.length
    })

    return (can == undefined)? true : false
  }

  errorDialog(title,msg){
 
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }
  

}
