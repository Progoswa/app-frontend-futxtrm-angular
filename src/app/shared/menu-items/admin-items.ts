import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { Socket } from 'ngx-socket-io';


export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  group?: any[];
}







@Injectable()
export class AdminItems {

  constructor(
    public translateService:TranslateService,
    private socket:Socket
  ){

    
  }



 
  generateItems(){
   let UsuariosGroup = [
      {state:'usuarios/usuarios',name:this.translateService.instant("sidebar.admin.users.users"),type:'link'},
      {state:'usuarios/roles',name:this.translateService.instant("sidebar.admin.users.roles"),type:'link'},
    ];
    
   let ConfiguracionGroup = [
      {state:'configuracion/entrenamientos', name: this.translateService.instant("sidebar.admin.settings.exercises"),type:'link'},
      {state:'configuracion/categorias', name: this.translateService.instant("sidebar.admin.settings.categories"),type:'link'},
    ]
    

    
  return  ([
      { state: 'inicio', name: this.translateService.instant("sidebar.admin.home"), type: 'link', icon: 'home' },
      // { state: 'servicios', name: 'Servicios', type: 'link', icon: 'star_border' },
      // { state: 'conflictos', name: 'Conflictos', type: 'link', icon: 'sports_kabaddi' },
      { state: 'configuracion', name: this.translateService.instant("sidebar.admin.settings.title"), type: 'group', icon: 'settings', group:ConfiguracionGroup },
      { state: 'usuarios', name: this.translateService.instant("sidebar.admin.users.title"), type: 'group', icon: 'people_alt',group:UsuariosGroup },
      { state: 'carga', name: this.translateService.instant("sidebar.admin.bulk_load"), type: 'link', icon: 'cloud_upload' },
      { state: 'free', name: this.translateService.instant("sidebar.admin.free_categories"), type: 'link', icon: 'money_off' },
      { state: 'membresias', name: this.translateService.instant("sidebar.admin.memberships"), type: 'link', icon: 'card_membership' },
      { state: 'pagos', name: this.translateService.instant("sidebar.admin.payments"), type: 'link', icon: 'attach_money' },
      // { state: 'servicios-cliente', name: 'Servicios al cliente', type: 'group', icon: 'support_agent',group:serviciosClienteGroup },
      { state: 'auditoria', name: this.translateService.instant("sidebar.admin.audits"), type: 'link', icon: 'insert_chart' },
     
    ]);
  
  }




  getMenuitem(): Menu[] {

    
    return this.generateItems();
  }




}
