import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { SeccionService } from '../../../../globals-services/seccion.service';

@Component({
  selector: 'app-editar-seccion',
  templateUrl: './editar-seccion.component.html',
  styleUrls: ['./editar-seccion.component.scss']
})
export class EditarSeccionComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<EditarSeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private seccionService:SeccionService,
    private fb:FormBuilder
  
  ) { }

  ngOnInit() {
  }


  bloques = this.data.bloques

  seccionForm = this.fb.group({
    nombre:[this.data.nombre,[Validators.required,Validators.minLength(4)]],
    descripcion:[this.data.descripcion,[Validators.required,Validators.minLength(4)]],
    condicional:[this.data.condicional,[Validators.required]],
    usuario:[localStorage.getItem('id'),[Validators.required]],
    categoria:[this.data.categoria,[Validators.required]]  })
 

  aceptar(){
    this.seccionForm.value.bloques = this.bloques
    this.seccionForm.value.nombre = this.seccionForm.value.nombre.substring(0, 1).toUpperCase() + this.seccionForm.value.nombre.substring(1);

    this.seccionService.editarSeccion(this.data._id,this.seccionForm.value).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }

  
  bloquesOK(){
    let invalid =  this.bloques.find((bloque)=>{
      if(bloque.ejercicios < 0 || bloque.minutos < 0){
        return bloque
      }
    })

    return (invalid != undefined)?true:false
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addBloque(){
    this.bloques.push({ejercicios:0,minutos:0})
  }

  removeBloque(){
    this.bloques.pop()
  }
  


}
