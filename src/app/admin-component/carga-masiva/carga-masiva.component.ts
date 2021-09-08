import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CargarCategoriasComponent } from '../carga-dialogs/cargar-categorias/cargar-categorias.component';
import { ErrorDialogComponent } from '../../globals-dialogs/error-dialog/error-dialog.component';
import { CargarSeccionesComponent } from '../carga-dialogs/cargar-secciones/cargar-secciones.component';
import { CargarEntrenamientoComponent } from '../carga-dialogs/cargar-entrenamiento/cargar-entrenamiento.component';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss']
})
export class CargaMasivaComponent implements OnInit {

  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit() {
  }

  categorias(){
    this.dialog.open(CargarCategoriasComponent,{
      width:'450px'
    })
  }

  secciones(){
    this.dialog.open(CargarSeccionesComponent,{
      width:'450px'
    })
  }
  entrenamientos(){
    this.dialog.open(CargarEntrenamientoComponent,{
      width:'450px'
    })
  }


 

  errorDialog(title,msg){
 
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }

}
