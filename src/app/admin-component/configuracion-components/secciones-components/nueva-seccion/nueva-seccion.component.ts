import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { SeccionService } from '../../../../globals-services/seccion.service';

@Component({
  selector: 'app-nueva-seccion',
  templateUrl: './nueva-seccion.component.html',
  styleUrls: ['./nueva-seccion.component.scss']
})
export class NuevaSeccionComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<NuevaSeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private seccionService:SeccionService,
    private fb:FormBuilder
  
  ) { }

  ngOnInit() {
  }


  seccionForm = this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(4)]],
    descripcion:['',[Validators.required,Validators.minLength(4)]],
    condicional:[false,[Validators.required]],
    usuario:[localStorage.getItem('id'),[Validators.required]],
    categoria:[this.data.categoria,[Validators.required]]  })
 

    bloques = [{ejercicios:0,minutos:0}]


    bloquesOK(){
      let invalid =  this.bloques.find((bloque)=>{
        if(bloque.ejercicios < 0 || bloque.minutos < 0){
          return bloque
        }
      })

      return (invalid != undefined)?true:false
    }

  aceptar(){
    this.seccionForm.value.bloques = this.bloques
    this.seccionForm.value.nombre = this.seccionForm.value.nombre.substring(0, 1).toUpperCase() + this.seccionForm.value.nombre.substring(1);

    this.seccionService.crearSeccion(this.seccionForm.value).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }

  addBloque(){
    this.bloques.push({ejercicios:0,minutos:0})
  }
  
  removeBloque(){
    this.bloques.pop()
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
