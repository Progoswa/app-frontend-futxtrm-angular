import { Routes } from '@angular/router';
import { AuthGuardAdminService } from '../guards/auth-guard-admin.service';
import { ClienteInicioComponent } from './cliente-inicio/cliente-inicio.component';
import { AuthGuardUsuarioService } from '../guards/auth-guard-usuario.service';
import { ClienteCategoriaComponent } from './cliente-categoria/cliente-categoria.component';
import { ClientePlantillasComponent } from './cliente-plantillas/cliente-plantillas.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { ClienteCalendarioComponent } from './cliente-calendario/cliente-calendario.component';
import { PlantillaCalendarioComponent } from './plantilla-calendario/plantilla-calendario.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { ComprarCategoriaComponent } from './cliente-dialogs/comprar-categoria/comprar-categoria.component';
import { CategoriaPagarComponent } from './categoria-pagar/categoria-pagar.component';
import { ClienteNotificacionesComponent } from './cliente-notificaciones/cliente-notificaciones.component';
import { ClientCategoriesFreeComponent } from './client-categories-free/client-categories-free.component';
import { ClienteMembresiasComponent } from './cliente-membresias/cliente-membresias.component';
import { MembresiaInfoComponent } from './membresias-ctrl/membresia-info/membresia-info.component';
import { ComprarMembresiaComponent } from './membresias-ctrl/comprar-membresia/comprar-membresia.component';
import { CategorieGuardService } from '../guards/categorie-guard.service';
import { TokenGuardService } from '../guards/token-guard.service';



export const ClienteRoutes: Routes = [
  {
    path: 'inicio',
    component: ClienteInicioComponent,
    data:{
      title:'Inicio',
      breadcrumbs:['Inicio']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },

  {
    path: 'categoria',
    component: ClienteCategoriaComponent,
    data:{
      title:'Categoria',
      breadcrumbs:['Inicio','Categoria']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'membresias',
    component: ClienteMembresiasComponent,
    data:{
      title:'Categoria',
      breadcrumbs:['Inicio','Categoria']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'membresia/info',
    component: MembresiaInfoComponent,
  
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'membresia/comprar',
    component: ComprarMembresiaComponent,
  
    canActivate:[AuthGuardUsuarioService,TokenGuardService]
  },
  {
    path: 'calendario',
    component: ClienteCalendarioComponent,
    data:{
      title:'Calendario',
      breadcrumbs:['Inicio','Calendario']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'calendario/plantilla',
    component: PlantillaCalendarioComponent,
    data:{
      title:'Calendario',
      breadcrumbs:['Inicio','Calendario','Plantilla']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'plantillas',
    component: ClientePlantillasComponent,
    data:{
      title:'Plantillas',
      breadcrumbs:['Inicio','Plantillas']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'plantilla',
    component: PlantillaComponent,
    data:{
      title:'Plantilla',
      breadcrumbs:['Inicio','Plantilla']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'perfil',
    component: ClientePerfilComponent,
    data:{
      title:'Perfil',
      breadcrumbs:['Inicio','perfil']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  {
    path: 'categoria/comprar',
    component: CategoriaPagarComponent,
    data:{
      title:'Categoria',
      breadcrumbs:['Inicio','pagar']
    },
    canActivate:[AuthGuardUsuarioService,TokenGuardService]
  },
  {
    path: 'notificaciones',
    component: ClienteNotificacionesComponent,
    data:{
      title:'Notificaciones',
      breadcrumbs:['Inicio','Notificaciones']
    },
    canActivate:[AuthGuardUsuarioService,CategorieGuardService,TokenGuardService]
  },
  
];
