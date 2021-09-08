import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrarComponent } from '../../../globals-dialogs/borrar/borrar.component';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrenamientoService } from '../../../globals-services/entrenamiento.service';
import { SeccionService } from '../../../globals-services/seccion.service';
import { NuevaSeccionComponent } from '../secciones-components/nueva-seccion/nueva-seccion.component';
import { EditarSeccionComponent } from '../secciones-components/editar-seccion/editar-seccion.component';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { VerSeccionComponent } from '../secciones-components/ver-seccion/ver-seccion.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-secciones-categoria',
  templateUrl: './secciones-categoria.component.html',
  styleUrls: ['./secciones-categoria.component.scss']
})
export class SeccionesCategoriaComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  url: any;
  id: any;
  categoria: any;
  
  constructor(
    private dialog:MatDialog,
    private seccionService:SeccionService,
    private router:Router,
    private route:ActivatedRoute,
    private usuarioService:UsuarioService,
    public translate:TranslateService
  ) {

    this.route.queryParams.subscribe((data)=>{
      this.id = data.id
      
    })
  }

  
  listar(data){
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getCategoria()
    this.getSeccionesByCategoria()
    this.getPermisos()
  }
permisos: any = [];
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
      
    })
  }

  getCategoria() {
    this.seccionService.getCategoria(this.id).subscribe((resp:any)=>{
      this.categoria = resp.categoria
      
    })
  }
  getSeccionesByCategoria() {
    this.seccionService.getSeccionesByCategoriaID(this.id).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.listar(resp.secciones)
      }
    })
  }
  



  displayedColumns: string[] = ['nombre', 'descripcion','fecha','opciones'];
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
        this.seccionService.eliminarSeccion(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success(this.translate.instant('pages.sections.delete.title'),`${this.translate.instant('pages.sections.delete.subtitle')} ${resp.seccion.nombre}`)
            this.getSeccionesByCategoria()
          }
        })
      }
      
    });

  }

  consultar(id){
    this.router.navigate(['/admin/usuarios/consultar'],{state:{id}})
  }

  estado = true

 


  nueva(){
    let dialogRef = this.dialog.open(NuevaSeccionComponent,{
      width:'600px',
      data:{categoria:this.id},
      disableClose:true
    })

    dialogRef.afterClosed().subscribe((result)=>{
           if(result){
        this.success(this.translate.instant('pages.sections.new.success.title'),this.translate.instant('pages.sections.new.success.subtitle'))
          this.getSeccionesByCategoria()
      }
      
    })
  }

  editar(data){
    const dialogRef = this.dialog.open(EditarSeccionComponent, {
      width: '600px',
      disableClose:true,
      data
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.success(this.translate.instant('pages.sections.edit.success.title'),`${this.translate.instant('pages.sections.edit.success.subtitle')} ${data.nombre}`)
          this.getSeccionesByCategoria()
      }
      
    });
    }


  ver(data){
    const dialogRef = this.dialog.open(VerSeccionComponent, {
      width: '600px',
     
      data
  
    });
  
    }

    entrenamientos(id){

      this.router.navigate(['/admin/configuracion/entrenamientos/seccion'],{queryParams:{id,cat:this.id}})
      
    }
  
  
}
