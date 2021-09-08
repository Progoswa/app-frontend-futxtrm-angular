import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutes } from './admin.routing';
import { EstadisticasDelSitioComponent } from './auditoria-components/estadisticas-del-sitio/estadisticas-del-sitio.component';
import { ReportesComponent } from './auditoria-components/reportes/reportes.component';
import { AuditoriaInternaComponent } from './auditoria-components/auditoria-interna/auditoria-interna.component';
import { AdminPerfilComponent } from './auditoria-components/admin-perfil/admin-perfil.component';
import { AdminUsuarioComponent } from './auditoria-components/admin-usuario/admin-usuario.component';
import { AdminSeguridadComponent } from './admin-seguridad/admin-seguridad.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { CambiosPerfilSuccessComponent } from './auditoria-components/perfil-dialogs/cambios-perfil-success/cambios-perfil-success.component';
import { PasswordInvalidComponent } from './auditoria-components/perfil-dialogs/password-invalid/password-invalid.component';
import { ErrorDialogComponent } from '../globals-dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../globals-dialogs/success-dialog/success-dialog.component';
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { BorrarComponent } from '../globals-dialogs/borrar/borrar.component';
import { NuevoAdministradorComponent } from './usuarios-components/nuevo-administrador/nuevo-administrador.component';
import { ConsultarUsuarioComponent } from './usuarios-components/consultar-usuario/consultar-usuario.component';
import { RolesComponent } from './usuarios-components/roles/roles.component';
import { NuevoRolComponent } from './usuarios-components/nuevo-rol/nuevo-rol.component';
import { CategoriasComponent } from './configuracion-components/categorias/categorias.component';
import { NuevaCategoriaComponent } from './configuracion-components/nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from './configuracion-components/editar-categoria/editar-categoria.component';
import { EntrenamientosComponent } from './configuracion-components/entrenamientos-components/entrenamientos/entrenamientos.component';
import { NuevoEntrenamientoComponent } from './configuracion-components/entrenamientos-components/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { EditarEntrenamientoComponent } from './configuracion-components/entrenamientos-components/editar-entrenamiento/editar-entrenamiento.component';
import { SeccionesCategoriaComponent } from './configuracion-components/secciones-categoria/secciones-categoria.component';
import { NuevaSeccionComponent } from './configuracion-components/secciones-components/nueva-seccion/nueva-seccion.component';
import { EditarSeccionComponent } from './configuracion-components/secciones-components/editar-seccion/editar-seccion.component';
import { EntrenamientoSeccionComponent } from './configuracion-components/entrenamientos-seccion-components/entrenamiento-seccion/entrenamiento-seccion.component';
import { ListarEntrenamientosComponent } from './configuracion-components/entrenamientos-seccion-components/listar-entrenamientos/listar-entrenamientos.component';
import { VerEntrenamientoSeccionComponent } from './configuracion-components/entrenamientos-seccion-components/ver-entrenamiento-seccion/ver-entrenamiento-seccion.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminPagoComponent } from './admin-pago/admin-pago.component';
import { EditarRoleComponent } from './usuarios-components/editar-role/editar-role.component';
import { AsignarRoleComponent } from './usuarios-components/asignar-role/asignar-role.component';
import { VimeoMainPipe } from '../vimeo.module';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { VerCategoriaComponent } from './configuracion-components/ver-categoria/ver-categoria.component';
import { VerSeccionComponent } from './configuracion-components/secciones-components/ver-seccion/ver-seccion.component';
import { VerEntrenamientoComponent } from './configuracion-components/entrenamientos-components/ver-entrenamiento/ver-entrenamiento.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';
import { CargarCategoriasComponent } from './carga-dialogs/cargar-categorias/cargar-categorias.component';
import { CargarSeccionesComponent } from './carga-dialogs/cargar-secciones/cargar-secciones.component';
import { CargarEntrenamientoComponent } from './carga-dialogs/cargar-entrenamiento/cargar-entrenamiento.component';
import { CategoriesFreeComponent } from './categories-free/categories-free.component';
import { EditTextComponent } from './free-dialogs/edit-text/edit-text.component';
import { AddCategorieComponent } from './free-dialogs/add-categorie/add-categorie.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NuevaMembresiaComponent } from './membresias-dialogs/nueva-membresia/nueva-membresia.component';
import { UpdateMembresiasComponent } from './membresias-dialogs/update-membresias/update-membresias.component';
import { AdminPagoMComponent } from './admin-pago-m/admin-pago-m.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    VimeoMainPipe,
    NgxMatIntlTelInputModule,
    NgxMaterialTimepickerModule,
    TranslateModule
  
   ],

  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [
    EstadisticasDelSitioComponent,
    ReportesComponent,
    AuditoriaInternaComponent,
    AdminPerfilComponent,
    AdminUsuarioComponent,
    AdminSeguridadComponent,
    AdminNotificationsComponent,
    CambiosPerfilSuccessComponent,
    PasswordInvalidComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    UsuariosComponent,
    BorrarComponent,
    NuevoAdministradorComponent,
    ConsultarUsuarioComponent,
    RolesComponent,
    NuevoRolComponent,
    CategoriasComponent,
    NuevaCategoriaComponent,
    EditarCategoriaComponent,
    EntrenamientosComponent,
    NuevoEntrenamientoComponent,
    EditarEntrenamientoComponent,
    SeccionesCategoriaComponent,
    NuevaSeccionComponent,
    EditarSeccionComponent,
    EntrenamientoSeccionComponent,
    ListarEntrenamientosComponent,
    VerEntrenamientoSeccionComponent,
    AdminPagosComponent,
    AdminPagoComponent,
    EditarRoleComponent,
    AsignarRoleComponent,
    VerCategoriaComponent,
    VerSeccionComponent,
    VerEntrenamientoComponent,
    CargaMasivaComponent,
    CargarCategoriasComponent,
    CargarSeccionesComponent,
    CargarEntrenamientoComponent,
    CategoriesFreeComponent,
    EditTextComponent,
    AddCategorieComponent,
    MembresiasComponent,
    NuevaMembresiaComponent,
    UpdateMembresiasComponent,
    AdminPagoMComponent
    
    
    
  
    
  ]
})
export class AdminComponentsModule {}


