import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../globals-services/categoria.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import * as moment from 'moment'
import { CalendarioService } from '../../globals-services/calendario.service';
import { ErrorDialogComponent } from '../../globals-dialogs/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fecha-predeterminada',
  templateUrl: './fecha-predeterminada.component.html',
  styleUrls: ['./fecha-predeterminada.component.scss']
})
export class FechaPredeterminadaComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<FechaPredeterminadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private cd:ChangeDetectorRef,
    private calendarioService:CalendarioService,
    private dialog:MatDialog,
    private router:Router,
    private translate:TranslateService

  ) { }

  ngOnInit() {
    this.fechaDia(this.data.dias)
  }

  min: any;
  horarioForm = this.fb.group({
    min:['',[Validators.required]],
    max:['',[Validators.required]]
  })

  week = moment().startOf('week')

  turno = ''

  aceptar(){
    this.horarioForm.value.min = moment(this.min).format('HH:mm')
    let calendario = {
      dias:this.data.dias,
      categoria:this.data._id,
      usuario:localStorage.getItem('id'),
      horario:this.horarioForm.value
    }

    
    

    this.calendarioService.predeterminada(calendario).subscribe((resp:any)=>{
     if(resp.ok){
      this.router.navigate(["/cliente/calendario/plantilla"],{state:{plantillas:resp.plantillas}})
      this.dialogRef.close(true);
     }else{
       if(resp.err.code == 100){
        this.err(this.translate.instant('user.home.choose.default.limit.title'),this.translate.instant('user.home.choose.default.limit.subtitle'))
       }else{
        this.err(this.translate.instant('user.home.choose.default.error.title'),this.translate.instant('user.home.choose.default.error.subtitle'))
       }
      
      this.dialogRef.close(true);
     }
  
    })
    
   
    
  }

  err(title,msg){
    this.dialog.open(ErrorDialogComponent,{
      width:'450px',
      data:{title,msg}
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


  fechaDia(dias:any[]){
 this.data.dias = dias.map((dia)=>{
  dia.fecha = moment(this.week).add(dia.dia,'days')

  if(dia.fecha < moment()){
    this.week = moment().add(1,'week').startOf('week')
    this.fechaDia(dias)
  }
  return dia
 })
    this.data.dias.sort((a,b)=>{
      return a.fecha - b.fecha
    })
  }
 
  format(fecha){
    return moment(fecha).format('DD-MM-YYYY')
  }

  hour = null


  maxDate = new Date(moment().endOf('month').add(1,'days').format('YYYY-MM-DD'))
  minDate = new Date()

  hourChange(){
    this.hour = null;
    this.horarioForm.controls.max.setValue(null)
    let value:String =   this.horarioForm.controls.min.value.replace(/\D/g,'').slice(0,4)
    switch (value.length) {
      case 3:
          
        if(Number(value.slice(1,3)) >= 60){
          value = `${value[0]}:00`
        }else{
          value = `${value[0]}:${value.slice(1,3)}`
        }
         
        break;
      case 4:
        if(Number(value.slice(0,2)) > 12){
          
          if(Number(value.slice(2,4)) >= 59){
            value = `12:00`
          }else{
            value = `12:${value.slice(2,4)}`
          }
        }else{
          if(Number(value.slice(2,4)) >= 59){
            value = `${value.slice(0,2)}:00`
          }else{
            value = `${value.slice(0,2)}:${value.slice(2,4)}`
          }
    
        }
        
        
        
        break;
    
      default:
        break;
    }
    this.horarioForm.controls.min.setValue(value)
    
    
   
  }

  selectHour(type){

   
    
    this.hour = type
    
    let hour = this.horarioForm.controls.min.value.replace(/\D/g,'')

    if(this.hour == 'am'){
      if(Number(hour) < 800){
        this.horarioForm.controls.min.setValue("8:00")
      }else if(Number(hour) > 1200){
        this.horarioForm.controls.min.setValue("8:00")
      }
    }else{
      if(Number(hour) > 800 && Number(hour) < 1200){
        this.horarioForm.controls.min.setValue("8:00")
      }
    }
    
    let hour_min = null
    if(this.hour == 'pm'){
      hour_min = moment().startOf('day').add(12,'hours').add(this.horarioForm.controls.min.value,'hours')
    }else{
      hour_min = moment().startOf('day').add(this.horarioForm.controls.min.value,'hours')
    }

 
    this.horarioForm.controls.max.setValue(moment(hour_min).add(this.data.tiempo,'minutes').format('HH:mm'))
    this.min = moment(hour_min)
    
    
  }


}
