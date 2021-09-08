import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../../registro-components/registro-servicios/register.service';
import { EmailRepeatComponent } from '../../../registro-components/registro-dialogs/email-repeat/email-repeat.component';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { RolesService } from '../../../globals-services/roles.service';
import csc from 'country-state-city'
 
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-nuevo-administrador',
  templateUrl: './nuevo-administrador.component.html',
  styleUrls: ['./nuevo-administrador.component.scss']
})
export class NuevoAdministradorComponent implements OnInit {
  roles: any;

  constructor(
    private fb:FormBuilder,
    private registroService:RegisterService,
    private dialog:MatDialog,
    private router:Router,
    private rolesService:RolesService,
    private translate:TranslateService
  ) { 

    
  }

  ngOnInit() {
    this.getRoles() 
    this.getPaises()
  }
paises = []
  estados = []
  ciudades = []

  getPaises(){
    this.paises = csc.getAllCountries()

    
  }

  getEstados(pais){

    
    this.estados = []
    this.estados = csc.getStatesOfCountry(pais.id)
    
  }

  getCitys(estado){
    this.ciudades = csc.getCitiesOfState(estado.id)
  }
  clienteForm = this.fb.group( {

    nombre: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    apellido: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    email: ['', [Validators.required, Validators.maxLength(50) ,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}")] ],  
    username: ['', [Validators.required, Validators.maxLength(50) ] ],
    telefono: [ '',  [Validators.required]],
    direccion: [ '', Validators.required ],
    pais: [ '', Validators.required ],
    estado: [ '', Validators.required ],
    ciudad: [ '', Validators.required ],
    adminRole: [ '', Validators.required ]

 })


 

getRoles(){
  this.rolesService.getRoles().subscribe((resp:any)=>{
    if(resp.ok){
      this.roles = resp.roles
    }
  })
}

resolved(captchaResponse: string) {
 
}

register(){
  let cliente = this.clienteForm.value
  cliente.role = 'administrador'
  cliente.verificado = true
  cliente.idAdmin = localStorage.getItem('id')
  cliente.nombre = cliente.nombre.substring(0, 1).toUpperCase() + cliente.nombre.substring(1);
  cliente.apellido = cliente.apellido.substring(0, 1).toUpperCase() + cliente.apellido.substring(1);
  cliente.password = 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);      
    return v.toString(16);
  });
  cliente.pais = cliente.pais.name

  this.registroService.register(cliente).subscribe((resp:any)=>{
    
    if(resp.ok){
   
      this.success(this.translate.instant('pages.users.new.success.title'),`${this.translate.instant('pages.users.new.success.subtitle')} ${resp.user.username}`)
      this.router.navigate(['/admin/usuarios/usuarios'])
    }else{
      if(resp.err.code == 11000){
        this.fieldRepeat(resp.index)
        
      }else{
        
      }
    }
    
  })
  
}

fieldRepeat(index){
  let data
  switch (index) {
    case 'email':
        data = {title:this.translate.instant('pages.users.new.failed.email.title'),msg:this.translate.instant('pages.users.new.failed.email.subtilte')}
      break;
    
    case 'username':
      data = {title:this.translate.instant('pages.users.new.failed.username.title'),msg:this.translate.instant('pages.users.new.failed.username.subtitle')}
      break;
    
    default:
      break;
  }
  const dialogRef = this.dialog.open(EmailRepeatComponent, {

    width: '500px',
    data
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

success(title,msg){
 
  this.dialog.open(SuccessDialogComponent, {
    width: '500px',
    data:{title,msg}
  });

}

}
