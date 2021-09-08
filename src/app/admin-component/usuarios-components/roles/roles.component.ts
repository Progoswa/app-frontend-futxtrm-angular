import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrarComponent } from '../../../globals-dialogs/borrar/borrar.component';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { RolesService } from '../../../globals-services/roles.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private dialog:MatDialog,
    private usuarioService:UsuarioService,
    private router:Router,
    private rolesService:RolesService,
    public translate:TranslateService
  ) {

    
  }

  
  listarRoles(roles){
    this.dataSource = new MatTableDataSource(roles)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getRoles()
this.getPermisos()
  }
permisos: any = {};
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
      
    })
  }



  displayedColumns: string[] = ['nombre','fecha','opciones'];
  dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRoles(){
    this.rolesService.getRoles().subscribe((resp:any)=>{
      
      if(resp.ok){
      
        this.listarRoles(resp.roles)
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
        this.rolesService.eliminar(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success(this.translate.instant('pages.roles.deleted.title'),`${this.translate.instant('pages.roles.deleted.subtitle')} ${resp.rol.nombre}`)
            this.getRoles()
          }
        })
      }
      
    });

  }

  

  estado = true

  

  editar(id){
    this.router.navigate(['/admin/usuarios/roles/editar'],{queryParams:{id}})
  }

  nuevo(){
    this.router.navigate(['/admin/usuarios/roles/nuevo'])
  }

 
}
