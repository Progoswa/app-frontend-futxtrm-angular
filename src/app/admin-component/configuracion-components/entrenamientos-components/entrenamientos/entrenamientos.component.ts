import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { EntrenamientoService } from '../../../../globals-services/entrenamiento.service';
import { SuccessDialogComponent } from '../../../../globals-dialogs/success-dialog/success-dialog.component';
import { BorrarComponent } from '../../../../globals-dialogs/borrar/borrar.component';
import { NuevoEntrenamientoComponent } from '../nuevo-entrenamiento/nuevo-entrenamiento.component';
import { EditarEntrenamientoComponent } from '../editar-entrenamiento/editar-entrenamiento.component';
import { UsuarioService } from '../../../../globals-services/usuario.service';
import { VerEntrenamientoComponent } from '../ver-entrenamiento/ver-entrenamiento.component';
import { Socket } from 'ngx-socket-io';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.scss']
})
export class EntrenamientosComponent implements OnInit {

  url: any;
  
  constructor(
    private dialog:MatDialog,
    private entrenamientoService:EntrenamientoService,
    private router:Router,
    private usuarioService:UsuarioService,
    private socket:Socket,
    private translate:TranslateService
  ) {

    
  }
  
    displayedColumns: string[] = ['ejercicio','tipo','fecha','opciones'];
    dataSource = new MatTableDataSource([])

  
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  listarEntrenamientos(entrenamientos){
    this.dataSource = new MatTableDataSource(entrenamientos)
  
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.socket.on('lang_change_r',()=>{
      this.getEntrenamientos()
    })
    
    this.getEntrenamientos()
    this.getPermisos()
  }

permisos: any = [];
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
      
      
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEntrenamientos(){
    this.entrenamientoService.getEntrenamientos(localStorage.getItem('lang')).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.url = resp.url
        this.listarEntrenamientos(resp.entrenamientos)
      }
    })
  }

 


  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }



  eliminar(id){

    const dialogRef = this.dialog.open(BorrarComponent, {
      width: '350px'  
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
 
      if(result){
        this.entrenamientoService.eliminarEntrenamiento(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success(this.translate.instant("pages.exercises.delete.success.title"),`${this.translate.instant("pages.exercises.delete.success.subtitle")} ${resp.entrenamiento.ejercicio}`)
            this.getEntrenamientos()
          }
        })
      }
      
    });

  }

  consultar(id){
    this.router.navigate(['/admin/usuarios/consultar'],{state:{id}})
  }

  estado = true

  


  secciones(){

  }

  editar(entrenamiento){
    entrenamiento.urlVideo = `${this.url}/${entrenamiento.video}`
    entrenamiento.urlImagen = `${this.url}/${entrenamiento.imagen}`
    const dialogRef = this.dialog.open(EditarEntrenamientoComponent, {
      width: '600px',
      disableClose:true,
      data:entrenamiento
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.success(this.translate.instant("pages.exercises.edit.success.title"),this.translate.instant("pages.exercises.edit.success.subtitle"))
          this.getEntrenamientos()
      }
      
    });
    }
  ver(entrenamiento){
    entrenamiento.urlVideo = `${this.url}/${entrenamiento.video}`
    entrenamiento.urlImagen = `${this.url}/${entrenamiento.imagen}`
    const dialogRef = this.dialog.open(VerEntrenamientoComponent, {
      width: '600px',
    
      data:entrenamiento
  
    });
  
  
    }
  
    

}
