import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CategoriaService } from '../../globals-services/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CalendarioService } from '../../globals-services/calendario.service';
import { Router } from '@angular/router';
import { CategoriaSeleccionComponent } from '../categoria-seleccion/categoria-seleccion.component';

@Component({
  selector: 'app-categorias-calendario',
  templateUrl: './categorias-calendario.component.html',
  styleUrls: ['./categorias-calendario.component.scss']
})
export class CategoriasCalendarioComponent implements OnInit {
  categorias: any;
  categoria: any;
  diffHour: number;
  diff: string;

  constructor(
    public dialogRef: MatDialogRef<CategoriasCalendarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private calendarioService:CalendarioService,
    private router:Router,
    private dialog:MatDialog
  ) { }

  startWeek = moment(this.data.week).startOf('week')

  ngOnInit() {
    
    this.getCategorias()
  }
  getCategorias() {
    this.categoriaService.getMyCategoriasInfo(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
     
      
        
        // this.categorias = resp.categorias
        this.categorias = resp.categoriasAndTime
      }
    })
  }


 

  getCategoria(id){
    
    this.categoriaService.categoriaOwner({categoria:id,usuario:localStorage.getItem('id')}).subscribe((resp:any)=>{
      this.categoria = resp.categoria.categoria
     
  
      
      
    })
  }

  categoriaForm = this.fb.group({
    categoria:['',[Validators.required]],

  })




  async aceptar(){
    
    let categoria = this.categorias.find((categoria)=>{
      return categoria.categoria.categoria._id == this.categoriaForm.value.categoria
    })
    console.log(categoria);
    
    categoria.categoria.categoria.tiempo = categoria.tiempo
    categoria =  categoria.categoria.categoria

    
    
    let comprar = this.dialog.open(CategoriaSeleccionComponent,{
      width:'80vw',
      data:categoria
    })

    this.dialogRef.close()
    
    
  }


 

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  
}
