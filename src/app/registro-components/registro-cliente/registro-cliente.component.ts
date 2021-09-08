import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleWrongComponent } from '../../login-components/login-dialogs/google-wrong/google-wrong.component';
import { MatDialog } from '@angular/material';
import { FacebookWrongComponent } from '../../login-components/login-dialogs/facebook-wrong/facebook-wrong.component';
import { RegisterService } from '../registro-servicios/register.service';
import { EmailRepeatComponent } from '../registro-dialogs/email-repeat/email-repeat.component';
import { RegistroSuccessComponent } from '../registro-dialogs/registro-success/registro-success.component';
import { AuthFirebaseService } from '../../login-components/login-services/auth-firebase.service';
import { SuccessDialogComponent } from '../../globals-dialogs/success-dialog/success-dialog.component';

import csc from 'country-state-city'
 
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogComponent } from '../../globals-dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss']
})
export class RegistroClienteComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private dialog:MatDialog,
    private registroService:RegisterService,
    private authFirebaseService:AuthFirebaseService,
    public translate:TranslateService
  ) { }

  ngOnInit() {
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
    username: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9,.!? ]*$') ] ],
    password: [ '',  [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/) ] ],
    rpassword: [ '',  [ Validators.required, Validators.minLength(8) ] ],
    telefono: [ '',  [Validators.required]],
    direccion: [ '', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.!? ]*$')] ],
    pais: [ '', Validators.required ],
    estado: [ '', Validators.required ],
    ciudad: [ '', Validators.required ],
    recaptchaReactive :['',Validators.required]

 },{validator: this.checkPasswords })


 checkPasswords(form: FormGroup) { // funcion syncrona para verificar que las contraseñas coinciden
  let pass = form.controls.password.value;
  let confirmPass = form.controls.rpassword.value;
  if(pass !== confirmPass){
    form.controls.rpassword.setErrors({ 'repeatInvalid' : true })
  }

  return null     
}

resolved(captchaResponse: string) {
 
}

  async register(){
    try {
      let cliente = await this.clienteForm.value
      cliente.role = 'usuario'
      cliente.nombre = cliente.nombre.substring(0, 1).toUpperCase() + cliente.nombre.substring(1);
      cliente.apellido = cliente.apellido.substring(0, 1).toUpperCase() + cliente.apellido.substring(1);
      cliente.pais = cliente.pais.name
      
      this.registroService.register(cliente).subscribe((resp:any)=>{
        
        if(resp.ok){
          this.router.navigate(['/ingresa'])
          this.registroSucces()
        }else{
          if(resp.err.code == 11000){
            this.fieldRepeat(resp.index)
            console.log(resp.err, 'error server');
            
          }else{
            
          }
        }
        
      })
    } catch (error) {
      
    }

  
}
  registroSucces() {
    const dialogRef = this.dialog.open(RegistroSuccessComponent, {
      width: '500px'
    });
  

  }



fieldRepeat(index){
  
  switch (index) {
    case 'email':
      this.errorDialog(this.translate.instant('sign_up.error.email.title'),this.translate.instant('sign_up.error.email.msg'))
      break;
    
    case 'username':
      this.errorDialog(this.translate.instant('sign_up.error.user.title'),this.translate.instant('sign_up.error.user.msg'))
      break;
    
    default:
      this.errorDialog(this.translate.instant('sign_up.error.unknow.title'),this.translate.instant('sign_up.error.unknow.msg'))

      break;
  }

}



errorDialog(title,msg){
 
  this.dialog.open(ErrorDialogComponent, {
    width: '500px',
    data:{title,msg}
  });

}

success(title,msg){
 
  this.dialog.open(SuccessDialogComponent, {
    width: '500px',
    data:{title,msg}
  });

}





}
