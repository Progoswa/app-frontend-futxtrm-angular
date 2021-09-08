import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantillaService } from '../../globals-services/plantilla.service';
import { MatDialog } from '@angular/material';
import { BorrarComponent } from '../../globals-dialogs/borrar/borrar.component';
import { SuccessDialogComponent } from '../../globals-dialogs/success-dialog/success-dialog.component';
import { CalendarioService } from '../../globals-services/calendario.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cliente-plantillas',
  templateUrl: './cliente-plantillas.component.html',
  styleUrls: ['./cliente-plantillas.component.scss']
})
export class ClientePlantillasComponent implements OnInit {
  plantillas: any;

  constructor(
    private router:Router,
    private plantillaService:PlantillaService,
    private dialog:MatDialog,
    private calendarioService: CalendarioService,
    public translate:TranslateService

  ) { }

  ngOnInit() {
    this.misPlantillas()
  }
  misPlantillas() {
    this.plantillas = []
    this.calendarioService.getMyCalendarios(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
      
        
        resp.calendarios.forEach((calendario) => {
          if(calendario.plantilla != null){
           
            
            this.plantillas.push(calendario)
          }
        });
      }
      
    })
   
    
  }


  getTotalTime(plantilla){
    // let cantidad = 0
    let minutos = 0
    plantilla.plantilla.forEach((objeto) => {
      // cantidad += objeto.cantidad
      minutos += objeto.minutos * objeto.cantidad
    });
    return minutos
    
  }

  verPlantilla(id){
    this.router.navigate(['/cliente/plantilla'],{queryParams:{id}})
    
  }


  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }


  borrar(id){
    let borrar = this.dialog.open(BorrarComponent,{
      width:'350px'
    })

    borrar.afterClosed().subscribe((result)=>{
      if(result){
        this.plantillaService.deletePlantilla(id).subscribe((resp:any)=>{
          if(resp.ok){
            this.misPlantillas()
            this.success(this.translate.instant('user.templates.delete.title'),this.translate.instant('user.templates.delete.subtitle'))
          }
        })
      }
    })
  }

}
