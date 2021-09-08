import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

import * as moment from 'moment';

import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../globals-dialogs/success-dialog/success-dialog.component';
import { CategoriasCalendarioComponent } from '../categorias-calendario/categorias-calendario.component';
import { CalendarioService } from '../../globals-services/calendario.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cliente-calendario',
  templateUrl: './cliente-calendario.component.html',
  styleUrls: ['./cliente-calendario.component.scss']
})
export class ClienteCalendarioComponent implements OnInit {

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  daySunday: Number;
  calendarios: any = [];
  
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private calendarioService:CalendarioService,
    public translate:TranslateService
  ) {

    
  }

  
  listarDias(dia){
    this.dataSource = new MatTableDataSource(dia)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
  
    this.generateWeek()
    this.misPlantillas()
  }
  misPlantillas() {
    this.calendarioService.getMyCalendarios(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
        resp.calendarios.forEach((calendario) =>{
          if(calendario.plantilla != null && calendario.plantilla.borrado == false){
            this.calendarios.push(calendario)
          }
        })
      }
    })
  }

  displayedColumns: string[] = ['hora','domingo', 'lunes', 'martes','miercoles','jueves','viernes','sabado'];
  dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getByDate(fecha,hora){
    let start = moment(this.currentDay).startOf('week')

    
    let plantilla = this.calendarios.find((calendario) => {
        let min = calendario.horario.min.split(':')
        min = Number(`${min[0]}${min[1]}`)
        
        let max = calendario.horario.max.split(':')
        max = Number(`${max[0]}${max[1]}`)

        let dia = moment(calendario.dia).utc(false).format('YYYY-MM-DD')
        let diaQuery = moment(start).add(fecha,'days').format('YYYY-MM-DD')
        
        return (( dia == diaQuery) && ( ((min <= hora) &&  ((hora <= max))) ))
    });

    
    
    return (plantilla != undefined)? plantilla:null
    
  }


  day = []

  generateWeek(){

    this.daySunday = Number( moment().startOf('week').format('DD'))
    
    let hour = 800
   
    for (let i = 0; i < 15; i++) {
     this.day.push({
      hora: hour,
      domingo:null,
      lunes:null,
      martes:null,
      miercoles:null,
      jueves:null,
      viernes:null,
      sabado:null
    })
    hour += 100
    }


    this.listarDias(this.day)
   
  }





  currentMonth = moment().month() + 1

  monthFormat(month){
   
    return this.translate.instant(`months.${month}`)
  }


  currentDay = moment()


  yearFormat(day){
    return moment(day).format('YYYY')
  }


  changeWeek(direccion){
    if(direccion == 0){
      this.currentDay = moment()
      this.currentMonth =  moment().month() + 1
  
    }else{
      this.currentDay = moment( this.currentDay).add(7*direccion,'days')
      this.currentMonth =  moment( this.currentDay).add(7*direccion,'days').month() + 1
  
    }

  }

  getDay(day){
    let starOf = moment(this.currentDay).startOf('week')
    
    return moment(starOf).add(day,'days').format('DD')
  }


  isToday(day){
    let startThisWeek = moment(this.currentDay).startOf('week')
    
    return (moment(startThisWeek).add(day,'days').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY'))?true:false
  }


  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }



  add(){
    this.dialog.open(CategoriasCalendarioComponent,{
      width:'400px',
      data:{week:this.currentDay}
    })
  }



  verPlantilla(plantilla){
    if(plantilla.plantilla.borrado == false){
      this.router.navigate(['/cliente/plantilla'],{queryParams:{id:plantilla.plantilla._id}})
    }
    
  }
  



}
