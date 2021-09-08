import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriaService } from '../../globals-services/categoria.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FechaPredeterminadaComponent } from '../fecha-predeterminada/fecha-predeterminada.component';
import { FechaPersonalizadaComponent } from '../fecha-personalizada/fecha-personalizada.component';

@Component({
  selector: 'app-categoria-seleccion',
  templateUrl: './categoria-seleccion.component.html',
  styleUrls: ['./categoria-seleccion.component.scss']
})
export class CategoriaSeleccionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoriaSeleccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private dialog:MatDialog

  ) { }

  ngOnInit() {
    
  }


  aceptar(){
    this.dialogRef.close(true);
    
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  predeterminada(){
  
    let fecha = this.dialog.open(FechaPredeterminadaComponent,{
      width:'600px',
      data:this.data
    })
    
    fecha.afterClosed().subscribe((resp)=>{
      if(resp){
        this.dialogRef.close(true)
      }
    })
    
  }
  personalizada(){
  
    let fecha = this.dialog.open(FechaPersonalizadaComponent,{
      width:'600px',
      data:this.data
    })
    
    fecha.afterClosed().subscribe((resp)=>{
      if(resp){
        this.dialogRef.close(true)
      }
    })
    
  }

  
}
