import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../../registro-components/registro-servicios/register.service';
import { EmailRepeatComponent } from '../../../registro-components/registro-dialogs/email-repeat/email-repeat.component';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { RolesService } from '../../../globals-services/roles.service';
import { AceptarComponent } from '../../../globals-dialogs/aceptar/aceptar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.scss']
})
export class NuevoRolComponent implements OnInit {

 
  constructor(
    private fb:FormBuilder,
    private dialog:MatDialog,
    private router:Router,
    private rolesService:RolesService,
    public translate:TranslateService
  ) { }

  ngOnInit() {
  }

  rolesForm = this.fb.group( {
    nombre:['',[Validators.required]],
    pagos_eliminar:[false,[Validators.required]],
    pagos_aceptar_rechazar:[false,[Validators.required]],
    categorias_crear:[false,[Validators.required]],
    categorias_editar:[false,[Validators.required]],
    categorias_eliminar:[false,[Validators.required]],
    secciones_crear:[false,[Validators.required]],
    secciones_editar:[false,[Validators.required]],
    secciones_eliminar:[false,[Validators.required]],
    secciones_entrenamiento_agregar:[false,[Validators.required]],
    secciones_entrenamiento_remover:[false,[Validators.required]],
    entrenamientos_cargar:[false,[Validators.required]],
    entrenamientos_editar:[false,[Validators.required]],
    entrenamientos_eliminar:[false,[Validators.required]],
    usuarios_crear:[false,[Validators.required]],
    usuarios_cambiar_estado:[false,[Validators.required]],
    usuarios_eliminar:[false,[Validators.required]],
    usuarios_consultar:[false,[Validators.required]],
    roles_crear:[false,[Validators.required]],
    roles_editar:[false,[Validators.required]],
    roles_eliminar:[false,[Validators.required]],
    roles_asignar:[false,[Validators.required]],
    admin:[localStorage.getItem('id')]

 })


 crear(){
   let opcion = this.dialog.open(AceptarComponent,{
     width:'350px',
     data:{msg:this.translate.instant('pages.roles.new.msg.create.title'),content:this.translate.instant('pages.roles.new.msg.create.subtitle')}
   })

   opcion.afterClosed().subscribe((result)=>{
     if(result){
      this.rolesService.crear(this.rolesForm.value).subscribe((resp:any)=>{
        if(resp.ok){
          this.success(this.translate.instant('pages.roles.new.msg.success.title'),this.translate.instant('pages.roles.new.msg.success.subtitle'))
          this.router.navigate(['/admin/usuarios/roles'])
        }
      })
     }
   })
 }



success(title,msg){
 
  this.dialog.open(SuccessDialogComponent, {
    width: '500px',
    data:{title,msg}
  });

}

}
