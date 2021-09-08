import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { EstadisticasDelSitioComponent } from "./auditoria-components/estadisticas-del-sitio/estadisticas-del-sitio.component";
import { ReportesComponent } from "./auditoria-components/reportes/reportes.component";
import { AuditoriaInternaComponent } from "./auditoria-components/auditoria-interna/auditoria-interna.component";
import { AdminPerfilComponent } from "./auditoria-components/admin-perfil/admin-perfil.component";
import { AdminUsuarioComponent } from "./auditoria-components/admin-usuario/admin-usuario.component";
import { AdminSeguridadComponent } from "./admin-seguridad/admin-seguridad.component";
import { AuthGuardAdminService } from "../guards/auth-guard-admin.service";
import { AdminNotificationsComponent } from "./admin-notifications/admin-notifications.component";
import { UsuariosComponent } from "./usuarios-components/usuarios/usuarios.component";
import { NuevoAdministradorComponent } from "./usuarios-components/nuevo-administrador/nuevo-administrador.component";
import { ConsultarUsuarioComponent } from "./usuarios-components/consultar-usuario/consultar-usuario.component";
import { RolesComponent } from "./usuarios-components/roles/roles.component";
import { NuevoRolComponent } from "./usuarios-components/nuevo-rol/nuevo-rol.component";
import { CategoriasComponent } from "./configuracion-components/categorias/categorias.component";
import { EntrenamientosComponent } from "./configuracion-components/entrenamientos-components/entrenamientos/entrenamientos.component";
import { SeccionesCategoriaComponent } from "./configuracion-components/secciones-categoria/secciones-categoria.component";
import { EntrenamientoSeccionComponent } from "./configuracion-components/entrenamientos-seccion-components/entrenamiento-seccion/entrenamiento-seccion.component";
import { AdminPagosComponent } from "./admin-pagos/admin-pagos.component";
import { AdminPagoComponent } from "./admin-pago/admin-pago.component";
import { EditarRoleComponent } from "./usuarios-components/editar-role/editar-role.component";
import { CargaMasivaComponent } from "./carga-masiva/carga-masiva.component";
import { CategoriesFreeComponent } from "./categories-free/categories-free.component";
import { MembresiasComponent } from "./membresias/membresias.component";
import { AdminPagoMComponent } from "./admin-pago-m/admin-pago-m.component";
import { TokenGuardService } from "../guards/token-guard.service";

export const AdminRoutes: Routes = [
  {
    path: "inicio",
    component: InicioComponent,
    data: {
      title: "breadcrumb.admin.home.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.home.title1",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/usuarios",
    component: UsuariosComponent,
    data: {
      title: "breadcrumb.admin.users.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.users.title1",
        },
        {
          link: "/admin/usuarios/usuarios",
          title: "breadcrumb.admin.users.title2",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/roles",
    component: RolesComponent,
    data: {
      title: "breadcrumb.admin.roles.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.roles.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.roles.title2",
          link: "/admin/usuarios/usuarios",
        },
        {
          title: "breadcrumb.admin.roles.title3",
          link: "/admin/usuarios/roles",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/roles/nuevo",
    component: NuevoRolComponent,
    data: {
      title: "breadcrumb.admin.new_role.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.new_role.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.new_role.title2",
          link: "/admin/usuarios/usuarios",
        },
        {
          title: "breadcrumb.admin.new_role.title3",
          link: "/admin/usuarios/roles",
        },
        {
          title: "breadcrumb.admin.new_role.title4",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/roles/editar",
    component: EditarRoleComponent,
    data: {
      title: "breadcrumb.admin.edit_role.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.edit_role.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.edit_role.title2",
          link: "/admin/usuarios/usuarios",
        },
        {
          title: "breadcrumb.admin.edit_role.title3",
          link: "/admin/usuarios/roles",
        },
        {
          title: "breadcrumb.admin.edit_role.title4",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/agregar",
    component: NuevoAdministradorComponent,
    data: {
      title: "breadcrumb.admin.add_user.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.add_user.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.add_user.title2",
          link: "/admin/usuarios/usuarios",
        },
        {
          title: "breadcrumb.admin.add_user.title3",
          link: "/admin",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "usuarios/consultar",
    component: ConsultarUsuarioComponent,
    data: {
      title: "breadcrumb.admin.consult_user.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.consult_user.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.consult_user.title2",
          link: "/admin/usuarios/usuarios",
        },
        {
          title: "breadcrumb.admin.consult_user.title3",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "configuracion/categorias",
    component: CategoriasComponent,
    data: {
      title: "breadcrumb.admin.categories.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.categories.title1",
        },
        {
          link: "",
          title: "breadcrumb.admin.categories.title2",
        },
        {
          link: "/admin/configuracion/categorias",
          title: "breadcrumb.admin.categories.title3",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "configuracion/secciones/categoria",
    component: SeccionesCategoriaComponent,
    data: {
      title: "breadcrumb.admin.sections.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.sections.title1",
        },
        {
          link: "",
          title: "breadcrumb.admin.sections.title2",
        },
        {
          link: "/admin/configuracion/categorias",
          title: "breadcrumb.admin.sections.title3",
        },
        {
          title: "breadcrumb.admin.sections.title4",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "configuracion/entrenamientos",
    component: EntrenamientosComponent,
    data: {
      title: "breadcrumb.admin.exercises.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.exercises.title1",
        },
        {
          link: "",
          title: "breadcrumb.admin.exercises.title2",
        },
        {
          link: "/admin/configuracion/entrenamientos",
          title: "breadcrumb.admin.exercises.title3",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "configuracion/entrenamientos/seccion",
    component: EntrenamientoSeccionComponent,
    data: {
      title: "breadcrumb.admin.exercises_section.title",
      breadcrumbs: [
        {
          link: "/admin",
          title: "breadcrumb.admin.exercises_section.title1",
        },
        {
          link: "",
          title: "breadcrumb.admin.exercises_section.title2",
        },
        {
          link: "/admin/configuracion/categorias",
          title: "breadcrumb.admin.exercises_section.title3",
        },
        {
          title: "breadcrumb.admin.exercises_section.title4",
          link: "",
        },
        {
          title: "breadcrumb.admin.exercises_section.title5",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "auditoria",
    component: AuditoriaInternaComponent,
    data: {
      title: "breadcrumb.admin.audits.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.audits.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.audits.title2",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "perfil",
    component: AdminPerfilComponent,
    data: {
      title: "breadcrumb.admin.profile.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.profile.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.profile.title2",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },

  {
    path: "notificaciones",
    component: AdminNotificationsComponent,
    data: {
      title: "breadcrumb.admin.notifications.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.notifications.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.notifications.title2",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "pagos",
    component: AdminPagosComponent,
    data: {
      title: "breadcrumb.admin.payments.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.payments.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.payments.title2",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "pago",
    component: AdminPagoComponent,
    data: {
      title: "breadcrumb.admin.payment.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.payment.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.payment.title2",
          link: "/admin/pagos",
        },
        {
          title: "breadcrumb.admin.payment.title3",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "pagom",
    component: AdminPagoMComponent,
    data: {
      title: "breadcrumb.admin.payment.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.payment.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.payment.title2",
          link: "/admin/pagos",
        },
        {
          title: "breadcrumb.admin.payment.title3",
          link: "",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "carga",
    component: CargaMasivaComponent,
    data: {
      title: "breadcrumb.admin.bulk_load.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.bulk_load.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.bulk_load.title2",
          link: "/admin/carga",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "free",
    component: CategoriesFreeComponent,
    data: {
      title: "breadcrumb.admin.free_categories.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.free_categories.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.free_categories.title2",
          link: "/admin/carga",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
  {
    path: "membresias",
    component: MembresiasComponent,
    data: {
      title: "breadcrumb.admin.memberships.title",
      breadcrumbs: [
        {
          title: "breadcrumb.admin.memberships.title1",
          link: "/admin",
        },
        {
          title: "breadcrumb.admin.memberships.title2",
          link: "/admin/carga",
        },
      ],
    },
    canActivate: [AuthGuardAdminService, TokenGuardService],
  },
];
