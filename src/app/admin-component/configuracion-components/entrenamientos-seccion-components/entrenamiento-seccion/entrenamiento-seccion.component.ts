import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeccionService } from '../../../../globals-services/seccion.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ListarEntrenamientosComponent } from '../listar-entrenamientos/listar-entrenamientos.component';
import { SuccessDialogComponent } from '../../../../globals-dialogs/success-dialog/success-dialog.component';
import { BorrarComponent } from '../../../../globals-dialogs/borrar/borrar.component';
import { EntrenamientoService } from '../../../../globals-services/entrenamiento.service';
import { VerEntrenamientoSeccionComponent } from '../ver-entrenamiento-seccion/ver-entrenamiento-seccion.component';
import { UsuarioService } from '../../../../globals-services/usuario.service';
import { NuevoEntrenamientoComponent } from '../../entrenamientos-components/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entrenamiento-seccion',
  templateUrl: './entrenamiento-seccion.component.html',
  styleUrls: ['./entrenamiento-seccion.component.scss']
})
export class EntrenamientoSeccionComponent implements OnInit {
  data: any;
  seccion: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private seccionService:SeccionService,
    private dialog:MatDialog,
    private entrenamientosService:EntrenamientoService,
    private usuarioService:UsuarioService,
    public translate:TranslateService
    
  ) {

    this.route.queryParams.subscribe((data)=>{
      this.data = data
    })
   }

  ngOnInit() {

    this.getSeccion()
     this.getPermisos()
  }
permisos: any = [];
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
      
    })
  }

  getEntrenamientos() {
    this.entrenamientosService.getEntrenamientosSeccion(this.seccion._id).subscribe((resp:any)=>{
      if(resp.ok){
        this.url = resp.url
        this.listar(resp.entrenamientos)
      }
    })
  }

  getSeccion() {
    this.seccionService.getSeccion(this.data.id).subscribe((resp:any)=>{
      if(resp.ok){
        this.seccion = resp.seccion
        this.getEntrenamientos()
      }else{
        this.router.navigate(['/admin'])
      }
    })
  }


  nueva(){
    let dialogRef = this.dialog.open(ListarEntrenamientosComponent,{
      height:'600px',
      width:'700px',
      data:{id:this.data.id}
    })

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.success('Entrenamientos cargados','Entrenamientos cargados con exito')
        this.getEntrenamientos()
      }
    })
  }
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  url: any;
  id: any;
  categoria: any;
  
 

  
  listar(data){
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  



  displayedColumns: string[] = ['ejercicio','fecha','opciones'];
  dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.entrenamientosService.eliminarEntrenamientoSeccion(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success(this.translate.instant("pages.exercises.section.delete.title"),this.translate.instant("pages.exercises.section.delete.subtitle"))
            this.getEntrenamientos()
          }
        })
      }
      
    });

  }





  ver(data){
    
    data.url = this.url
    
    const dialogRef = this.dialog.open(VerEntrenamientoSeccionComponent, {
    data
  
    });
  
    
  }

  nuevoArchivo(){
    const dialogRef = this.dialog.open(NuevoEntrenamientoComponent, {
      width: '600px',
      
      disableClose:true,
      backdropClass: 'futxrm-color-negro',
      data:{seccion:this.data.id}
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.success(this.translate.instant("pages.exercises.section.new.title"),this.translate.instant("pages.exercises.section.new.subtitle"))

          this.getEntrenamientos()
      }
      
    });
    }
    

}
