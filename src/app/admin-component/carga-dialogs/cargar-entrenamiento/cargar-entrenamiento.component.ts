import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { FormBuilder } from '@angular/forms';
import { CargaService } from '../../../globals-services/carga.service';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../globals-dialogs/error-dialog/error-dialog.component';
import { SeccionService } from '../../../globals-services/seccion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cargar-entrenamiento',
  templateUrl: './cargar-entrenamiento.component.html',
  styleUrls: ['./cargar-entrenamiento.component.scss']
})
export class CargarEntrenamientoComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<CargarEntrenamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private cargaService:CargaService,
    private dialog:MatDialog,
    private seccionService:SeccionService,
    public translate:TranslateService

  ) { }

  ngOnInit() {
    this.getCategorias()
  }


  categorias = []
  categoria:any = null
  getCategorias() {
    this.categoriaService.categoriaSecciones
    this.categoriaService.getCategorias(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.ok){
        this.categorias = resp.categorias
      }
    })
  }

 
  formData: FormData = new FormData();

  

  onNoClick(){
    this.dialogRef.close(false)
  }

  secciones = []
  seccion = null

  selectChange(categoria){
    this.seccion = null
   this.seccionService.getSeccionesByCategoriaID(categoria).subscribe((resp:any)=>{
     if(resp.ok){
       this.secciones = resp.secciones
     }
   })
    
  }

  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }

  errorDialog(title,msg){
 
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }

  aceptar(){
    this.formData.append('seccion',this.seccion)
    this.cargaService.entrenamientos(this.formData).subscribe((resp:any)=>{
      console.log(resp);
      
      this.formData.delete('seccion')
      if(resp.ok){
        this.success(this.translate.instant("pages.bulk_load.exercises.success.title"),this.translate.instant("pages.bulk_load.exercises.success.subtitle"))
        this.dialogRef.close(true)
      }else{
        this.errorDialog(this.translate.instant("pages.bulk_load.exercises.failed.title"),this.translate.instant("pages.bulk_load.exercises.failed.subtitle"))
      }
      
    })
    
  }

  name:string = '';

  seleccionarArchivo($event){
    this.name = $event.target.files[0].name
    
      this.formData.append('file',$event.target.files[0])
      this.formData.append('admin',localStorage.getItem('id'))
      
      
    
  }


}
