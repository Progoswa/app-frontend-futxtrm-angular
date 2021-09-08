import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login-components/login/login.component';
import { RecuperarPasswordComponent } from './login-components/recuperar-password/recuperar-password.component';
import { RegistroComponent } from './registro-components/registro/registro.component';
import { RegistroClienteComponent } from './registro-components/registro-cliente/registro-cliente.component';
import { RegistroProveedorComponent } from './registro-components/registro-proveedor/registro-proveedor.component';
import { NoVerificadoComponent } from './login-components/no-verificado/no-verificado.component';
import { NuevaPasswordComponent } from './login-components/nueva-password/nueva-password.component';
import { VerificarComponent } from './login-components/verificar/verificar.component';
import { adminFullComponent } from './admin-layout/admin.full.component';
import { SessionGuardService } from './guards/session-guard.service';
import { AuthGuardAdminService } from './guards/auth-guard-admin.service';
import { clienteFullComponent } from './cliente-layout/cliente.full.component';
import { UsuarioService } from './globals-services/usuario.service';
import { AuthGuardUsuarioService } from './guards/auth-guard-usuario.service';
import { ClientCategoriesFreeComponent } from './cliente-components/client-categories-free/client-categories-free.component';
import { NoCategorieComponent } from './cliente-components/no-categorie/no-categorie.component';
import { FreeGuardService } from './guards/free-guard.service';
import { NoCategorieService } from './guards/no-categorie.service';
import { TokenGuardService } from './guards/token-guard.service';
import { ChooseStartComponent } from './cliente-components/choose-start/choose-start.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate:[SessionGuardService],
    
    children: [
      {
        path: '',
        redirectTo: '/ingresa',
        pathMatch: 'full',
        canActivate:[SessionGuardService]
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ],
 
  },
  {
    path: 'admin',
    component: adminFullComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./admin-component/admin.module').then(m => m.AdminComponentsModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./admin-component/inicio/inicio.module').then(m => m.InicioModule)
      }
    ],
    canActivate:[AuthGuardAdminService]
  },
  {
    path: 'cliente',
    component: clienteFullComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./cliente-components/cliente.module').then(m => m.ClienteComponentsModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./cliente-components/cliente-inicio/cliente-inicio.module').then(m => m.ClienteInicioModule)
      }
    ],
    canActivate:[AuthGuardUsuarioService]
  },

  {
    path: 'ingresa',
    component:LoginComponent,
    canActivate:[SessionGuardService]
  },
  {
    path:'recuperar-contrasena',
    component:RecuperarPasswordComponent,
    canActivate:[SessionGuardService]
  },
  {
    path:'nueva-contrasena',
    component:NuevaPasswordComponent,
    canActivate:[SessionGuardService]
  },
  {
    path:'registrate',
    component:RegistroComponent,
    canActivate:[SessionGuardService]
    
  },
  {
    path:'registro-cliente',
    component:RegistroClienteComponent,
    canActivate:[SessionGuardService]
    
  },
  {
    path:'registro-proveedor',
    component:RegistroProveedorComponent,
    canActivate:[SessionGuardService]
    
  },
  {
    path:'no-verificado',
    component:NoVerificadoComponent
    
  },
  {
    path:'verificar',
    component:VerificarComponent
    
  },
  {
    path: 'start',
    component: NoCategorieComponent,
    data:{
      title:'Categoria',
      breadcrumbs:['Inicio','Categoria']
    },
    canActivate:[AuthGuardUsuarioService,NoCategorieService,TokenGuardService]
  },
  {
    path: 'choose',
    component: ChooseStartComponent,
    canActivate:[AuthGuardUsuarioService,NoCategorieService,TokenGuardService]
  },
  {
    path: 'free',
    component: ClientCategoriesFreeComponent,
    data:{
      title:'Categoria',
      breadcrumbs:['Inicio','Categoria']
    },
    canActivate:[AuthGuardUsuarioService,FreeGuardService,TokenGuardService]
  }
];
