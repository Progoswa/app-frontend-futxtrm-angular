import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { MembresiaService } from '../../../globals-services/membresia.service';
import { UsuarioService } from '../../../globals-services/usuario.service';

@Component({
  selector: 'app-nueva-membresia',
  templateUrl: './nueva-membresia.component.html',
  styleUrls: ['./nueva-membresia.component.scss']
})
export class NuevaMembresiaComponent implements OnInit {
  url: any;

  constructor(
    public dialogRef: MatDialogRef<NuevaMembresiaComponent>,
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
    name:['',[Validators.required]],
    description:['',[Validators.required]],
    image:['',[Validators.required]],
    lang:[localStorage.getItem('lang')],
    categorias:[null,[Validators.required]]
  })

  categorias = []
  prices = [
    {
      meses:1,
      precio:0,
      descuento:0
    },
    {
      meses:3,
      precio:0,
      descuento:0
    },
    {
      meses:6,
      precio:0,
      descuento:0
    },
    {
      meses:12,
      precio:0,
      descuento:0
    }
  ]

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
    this.membresiaService.create(membresia).subscribe((resp:any)=>{
      if(resp.code == 200){
        this.dialogRef.close(true)
      }
    })    
  }
}
