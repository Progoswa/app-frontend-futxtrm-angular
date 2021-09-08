import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';

import * as moment from 'moment';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.scss']
})
export class NuevaCategoriaComponent implements OnInit {
  url: any = null;
  cargando: boolean;

  constructor(
    public dialogRef: MatDialogRef<NuevaCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    public translate:TranslateService
  
  ) { }

  ngOnInit() {
  }

 

  categoriaForm = this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(4)]],
    frecuencia:['',[Validators.required,Validators.minLength(4)]],
    imagen:['',[Validators.required,Validators.minLength(4)]],
    descripcion:['',[Validators.required,Validators.minLength(4)]],
    usuario:[localStorage.getItem('id'),[Validators.required]]
  })


  subirImagen($event){
    let formData: FormData = new FormData();
      formData.append('image',$event.target.files[0])
      this.usuarioService.uploadImage(formData).subscribe((resp:any)=>{
     
        
        if(resp.ok){

          this.categoriaForm.controls.imagen.setValue(resp.name)
          this.url = resp.url
        }
        
      })
      
    
  }

 


  dias = [{dia:new FormControl([]),tipo:new FormControl([])}]

  dayList = [0,1,2,3,4,5,6]
  tipos = [1,2,3,4,5]
  addDia(){
    this.dias.push({dia:new FormControl([]),tipo:new FormControl([])})
  }

  removeDia(i){
    this.dias = this.dias.filter((dia,index)=>{
      return index != i
    })
    
  }

  precios = [
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
  daySelected(dia){
    let exist = this.dias.find((day)=>{
      return day.dia == dia
    })
    return (exist == undefined)?false:true
  }

  aceptar(){
      let categoria = this.categoriaForm.value
    categoria.nombre = categoria.nombre.substring(0, 1).toUpperCase() + categoria.nombre.substring(1);
    categoria.dias = this.dias
    categoria.lang = localStorage.getItem("lang")
    categoria.precios = this.precios
    
    this.categoriaService.crearCategoria(categoria).subscribe((resp:any)=>{

      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
