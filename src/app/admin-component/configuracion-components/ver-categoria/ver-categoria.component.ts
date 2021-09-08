import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.scss']
})
export class VerCategoriaComponent implements OnInit {

 
   constructor(
    public dialogRef: MatDialogRef<VerCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    public translate:TranslateService
  
  ) { }

  ngOnInit() {
    console.log(this.data);
    
  }


  url = this.data.url
  categoriaForm = this.fb.group({
    nombre:[this.data.nombre,[Validators.required,Validators.minLength(4)]],
    frecuencia:[this.data.frecuencia,[Validators.required,Validators.minLength(4)]],
    imagen:[this.data.imagen,[Validators.required,Validators.minLength(4)]],
    descripcion:[this.data.descripcion,[Validators.required,Validators.minLength(4)]],
    usuario:[localStorage.getItem('id'),[Validators.required]]

  })

  hourValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
  
    let form = <FormGroup>control.root
 
    
  
    
    const valid = ( form.value.max > form.value.min)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }

  dias = this.data.dias

  dayList = [0,1,2,3,4,5,6]
  tipos = [1,2,3,4,5]

  precios = this.data.precios
  addDia(){
    this.dias.push({dia:new FormControl([]),tipo:new FormControl([])})
  }

  removeDia(i){
    this.dias = this.dias.filter((dia,index)=>{
      return index != i
    })
    
  }

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
    categoria.precios = this.precios
    this.categoriaService.editarCategoria(this.data._id,categoria).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
