import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrarComponent } from '../../../globals-dialogs/borrar/borrar.component';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { VerCategoriaComponent } from '../ver-categoria/ver-categoria.component';
import { Socket } from 'ngx-socket-io';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  url: any;
  
  constructor(
    private dialog:MatDialog,
    private categoriasService:CategoriaService,
    private router:Router,
    private usuarioService:UsuarioService,
    private socket:Socket,
    private translate:TranslateService
  ) {

    
  }

  
  listarCategorias(categorias){
    this.dataSource = new MatTableDataSource(categorias)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

    this.socket.on('lang_change_r',()=>{
      this.getCategorias()
    })

     this.getPermisos()

    this.getCategorias()
  }


  permisos: any = [];
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
   
      
    })
  }

  displayedColumns: string[] = ['nombre','fecha','secciones','opciones'];
  dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategorias(){
    this.categoriasService.getCategorias(localStorage.getItem('lang')).subscribe((resp:any)=>{
      
      if(resp.ok){
     
        this.url = resp.url
        this.listarCategorias(resp.categorias)
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
        this.categoriasService.eliminarCategoria(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success(this.translate.instant('pages.categories.delete.title'),`${this.translate.instant('pages.categories.delete.subtitle')} ${resp.categoria.nombre}`)
           

            this.getCategorias()
          }
        })
      }
      
    });

  }

  consultar(id){
    this.router.navigate(['/admin/usuarios/consultar'],{state:{id}})
  }

  estado = true

  cambiarStatus(id){
 
  }


  secciones(id){

    this.router.navigate(['/admin/configuracion/secciones/categoria'],{queryParams:{id}})
  }

  editar(categoria){
    categoria.url = `${this.url}${categoria.imagen}`
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '550px',
      disableClose:true,
      data:categoria
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
     
      
      if(result){
        this.success(this.translate.instant('pages.categories.edit.success.title'),this.translate.instant('pages.categories.edit.success.subtitle'))
          this.getCategorias()
      }
      
    });
    }

  ver(categoria){
    categoria.url = `${this.url}${categoria.imagen}`
    const dialogRef = this.dialog.open(VerCategoriaComponent, {
      width: '550px',
      data:categoria
  
    });
    }
  
  nuevaCategoria(){
    const dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      width: '550px',
      disableClose:true
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
      
      if(result){
        this.success(this.translate.instant('pages.categories.new.success.title'),this.translate.instant('pages.categories.new.success.subtitle'))
          this.getCategorias()
      }
      
    });
    }
}
