import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { EntrenamientoService } from '../../../../globals-services/entrenamiento.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-nuevo-entrenamiento',
  templateUrl: './nuevo-entrenamiento.component.html',
  styleUrls: ['./nuevo-entrenamiento.component.scss']
})
export class NuevoEntrenamientoComponent implements OnInit {
  urlArchivo: any = null;
  urlVideo: any;
  urlImagen: any;

  
  
  constructor(
    public dialogRef: MatDialogRef<NuevoEntrenamientoComponent>,
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

  







  entrenamientoForm = this.fb.group({
    ejercicio:['',[Validators.required,Validators.minLength(4)]],
    descripcion:['',[]],
    repeticiones:['',[Validators.required]],
    descanso:[0,[Validators.required,Validators.pattern(/^[0-9.]+$/)]],
    tiempo:[0,[Validators.required,Validators.pattern(/^[0-9.]+$/)]],
    tipo:[''],
    requerimientos:[''],
    formato:['mp4',[Validators.required]],
    id_vimeo:['',[Validators.pattern(/^[0-9]{9,9}$/)]],
    video:[''],
    video_f:[{value:'',disabled:true},],
    imagen:[''],
    imagen_f:[{value:'',disabled:true}],
    usuario:[localStorage.getItem('id'),[Validators.required]],
    seccion:[this.data.seccion]
  })


  urlVimeo = null
 

  aceptar(){
    this.entrenamientoForm.value.ejercicio = this.entrenamientoForm.value.ejercicio.substring(0, 1).toUpperCase() + this.entrenamientoForm.value.ejercicio.substring(1);

    this.entrenamientoService.crearEntrenamiento(this.entrenamientoForm.value).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }
  

 

  onNoClick(): void {
    this.dialogRef.close(false);
  }
 

  tipos = [1,2,3,4,5]
  cargando = false
  video_cargando = false

  subirImagen($event,type){
   
    if(type == 'video'){
      this.video_cargando = true
      this.urlVideo = null;
    }else{
      this.cargando = true
    }
    
    let formData: FormData = new FormData();
      formData.append('entrenamiento',$event.target.files[0])
      this.entrenamientoService.uploadEntrenamientos(formData).subscribe((resp:any)=>{
        this.cargando= false
        this.video_cargando = false
        
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
