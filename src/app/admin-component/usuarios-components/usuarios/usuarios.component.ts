import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { BorrarComponent } from '../../../globals-dialogs/borrar/borrar.component';
import { AsignarRoleComponent } from '../asignar-role/asignar-role.component';

import * as moment from 'moment'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private dialog:MatDialog,
    private usuarioService:UsuarioService,
    private router:Router,
    public translate:TranslateService
  ) {

    
  }

  
  listarUsuarios(usuarios){
    this.dataSource = new MatTableDataSource(usuarios)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = 
    (data: any, filter: string) => {
      if(data.adminRole == null){
        data.adminRole = {nombre:'Cliente'}
      }
      
      
      data.fullname = `${data.nombre} ${data.apellido}`
      filter = filter.trim().toLowerCase()
      data.timeformat = moment(data.fechaCreacion).format('MM/DD/YY, HH:mm A')
      
      return (
        data.adminRole.nombre.trim().toLowerCase().indexOf(filter) != -1 ||
        data.fullname.trim().toLowerCase().indexOf(filter) != -1 ||
        data.username.trim().toLowerCase().indexOf(filter) != -1 ||
        data.timeformat.trim().toLowerCase().indexOf(filter) != -1 
        );
    }
  }

  ngOnInit() {
       this.getPermisos()
    this.getUsuarios()

  
  }
permisos: any = [];
  getPermisos(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.permisos = resp.data.adminRole
      
    })
  }


  displayedColumns: string[] = ['nombre', 'apellido','roleadmin','fecha','status','verificado','opciones'];
  dataSource


  

  applyFilter(event: Event) {
   
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

  
  }




  getUsuarios(){
    this.usuarioService.getUsers().subscribe((resp:any)=>{
      
      if(resp.ok){
        let usuarios = resp.usuarios.filter((usuario)=>{
          return usuario._id != localStorage.getItem('id')
        })
        this.listarUsuarios(usuarios)
      }
    })
  }

 

  asignar(id){
    let asignar = this.dialog.open(AsignarRoleComponent,{
      width:'350px',
      data:{id}
    })

    asignar.afterClosed().subscribe((result)=>{
      if(result){
        this.getUsuarios()
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
        this.usuarioService.delete(id,localStorage.getItem('id')).subscribe((resp:any)=>{
            
          if(resp.ok){
            this.success('Usuario eliminado',`Se elimino al usuario ${resp.usuario.username}`)
            this.getUsuarios()
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
  
    this.usuarioService.updateStatusUsuario({id,idAdmin:localStorage.getItem('id')}).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.success('Cambio realizado',`Se cambio el estado del usuario <strong>${resp.usuario.username}</strong>`)
        this.getUsuarios()
      }
    })
  
    
  }





}
