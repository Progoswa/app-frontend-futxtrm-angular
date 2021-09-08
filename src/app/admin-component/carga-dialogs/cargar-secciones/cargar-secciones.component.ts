import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { FormBuilder } from '@angular/forms';
import { CargaService } from '../../../globals-services/carga.service';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../globals-dialogs/error-dialog/error-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cargar-secciones',
  templateUrl: './cargar-secciones.component.html',
  styleUrls: ['./cargar-secciones.component.scss']
})
export class CargarSeccionesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CargarSeccionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private cargaService:CargaService,
    private dialog:MatDialog,
    public translate:TranslateService

  ) { }

  ngOnInit() {
    this.getCategorias()
  }


  categorias = []
  categoria:any = null
  getCategorias() {
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
    this.formData.append('categoria',this.categoria)
    this.cargaService.secciones(this.formData).subscribe((resp:any)=>{
      this.formData.delete('categoria')
      if(resp.ok){
        this.success(this.translate.instant("pages.bulk_load.sections.success.title"),this.translate.instant("pages.bulk_load.sections.success.subtitle"))
        this.dialogRef.close(true)
      }else{
        this.errorDialog(this.translate.instant("pages.bulk_load.sections.failed.title"),this.translate.instant("pages.bulk_load.sections.failed.subtitle"))
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
