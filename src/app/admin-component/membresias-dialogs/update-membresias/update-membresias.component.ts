import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { MembresiaService } from '../../../globals-services/membresia.service';
import { UsuarioService } from '../../../globals-services/usuario.service';

@Component({
  selector: 'app-update-membresias',
  templateUrl: './update-membresias.component.html',
  styleUrls: ['./update-membresias.component.scss']
})
export class UpdateMembresiasComponent implements OnInit {
url = this.data.url;

  constructor(
    public dialogRef: MatDialogRef<UpdateMembresiasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private categoriasService:CategoriaService,
    private usuarioService:UsuarioService,
    private membresiaService:MembresiaService,
    public translate:TranslateService
  ) { }

  ngOnInit() {
    this.getCategorias()
  }
  getCategorias() {
    this.categoriasService.getCategorias(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.ok){
        this.categorias = resp.categorias
      }
    })
  }

  membresiaForm = this.fb.group({
    name:[this.data.name,[Validators.required]],
    description:[this.data.description,[Validators.required]],
    image:[this.data.image,[Validators.required]],
    lang:[localStorage.getItem('lang')],
    categorias:[this.data.categorias,[Validators.required]]
  })

  categorias = []

  prices = this.data.prices

   pricesOk():boolean {
    let errs =  this.prices.filter((price)=>{
      if(price.precio < 0){
        return price
      }else if(price.descuento > 100 || price.descuento < 0){
        return price
      }
    })
    return (errs.length > 0)?false:true
  }

  subirImagen($event){
    let formData: FormData = new FormData();
      formData.append('image',$event.target.files[0])
      this.usuarioService.uploadImage(formData).subscribe((resp:any)=>{
     
        
        if(resp.ok){

          this.membresiaForm.controls.image.setValue(resp.name)
          this.url = resp.url
        }
        
      })
      
    
  }



  onNoClick(){
    this.dialogRef.close(false)
  }
  
  aceptar(){
    let membresia = this.membresiaForm.value
    membresia.prices = this.prices
    this.membresiaService.update(this.data._id,membresia).subscribe((resp:any)=>{
      if(resp.code == 200){
        this.dialogRef.close(true)
      }
    })    
  }

}
