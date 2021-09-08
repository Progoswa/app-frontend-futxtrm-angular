import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EntrenamientoService } from '../../../../globals-services/entrenamiento.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-entrenamiento',
  templateUrl: './editar-entrenamiento.component.html',
  styleUrls: ['./editar-entrenamiento.component.scss']
})
export class EditarEntrenamientoComponent implements OnInit {

  urlArchivo: any = null;
  urlVideo: any = this.data.urlVideo;
  urlImagen: any = this.data.urlImagen;

  
  constructor(
    public dialogRef: MatDialogRef<EditarEntrenamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entrenamientoService:EntrenamientoService,
    private fb:FormBuilder,
    private sanitizer: DomSanitizer
  
  ) { }

  ngOnInit() {
  
  }

type = 'video/*'
  typeArchive(event){
    this.urlArchivo = null
    this.entrenamientoForm.controls.nombre_archivo.setValue(null)

    switch (event.value) {
      case 'video':
        this.type =  'video/*'
        break;
      case 'imagen':
        this.type =  'image/*'
        break;
      case 'gif':
        this.type =  'image/gif'
        break;
    
      default:
        break;
    }
  }

  tipos = [1,2,3,4,5]

  entrenamientoForm = this.fb.group({
    ejercicio:[this.data.ejercicio,[Validators.required,Validators.minLength(4)]],
    descripcion:[this.data.descripcion,[]],
    repeticiones:[this.data.repeticiones,[Validators.required]],
    descanso:[this.data.descanso,[Validators.required,Validators.pattern(/^[0-9.]+$/)]],
    tiempo:[this.data.tiempo,[Validators.required,Validators.pattern(/^[0-9.]+$/)]],
    formato:[this.data.formato,[Validators.required]],
    tipo:[this.data.tipo],
    requerimientos:[this.data.requerimientos],
    id_vimeo:[this.data.id_vimeo,[Validators.pattern(/^[0-9]{9,9}$/)]],
    video:[this.data.video],
    video_f:[{value:this.data.video_f,disabled:true},],
    imagen:[this.data.imagen],
    imagen_f:[{value:this.data.imagen_f,disabled:true}],
    usuario:[localStorage.getItem('id'),[Validators.required]]
  })
 

  aceptar(){
    this.entrenamientoForm.value.ejercicio = this.entrenamientoForm.value.ejercicio.substring(0, 1).toUpperCase() + this.entrenamientoForm.value.ejercicio.substring(1);

    this.entrenamientoService.editarEntrenamiento(this.data._id,this.entrenamientoForm.value).subscribe((resp:any)=>{
   
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }

  urlVimeo = null
 

  
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  cargando = false
  subirImagen($event,type){
    this.cargando = true
    let formData: FormData = new FormData();
      formData.append('entrenamiento',$event.target.files[0])
      this.entrenamientoService.uploadEntrenamientos(formData).subscribe((resp:any)=>{
        this.cargando= false
       
        
        if(resp.ok){
          if(type == 'video'){
            this.entrenamientoForm.controls.video.setValue(resp.name)
            this.entrenamientoForm.controls.video_f.setValue(resp.name)
            this.urlVideo = resp.url
          }else{
            this.entrenamientoForm.controls.imagen.setValue(resp.name)
            this.entrenamientoForm.controls.imagen_f.setValue(resp.name)
            this.urlImagen = resp.url
          }
         
        }
        
      })
      
    
  }


}
