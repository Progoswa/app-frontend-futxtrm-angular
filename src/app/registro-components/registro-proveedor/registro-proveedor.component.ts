import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailRepeatComponent } from '../registro-dialogs/email-repeat/email-repeat.component';
import { FacebookWrongComponent } from '../../login-components/login-dialogs/facebook-wrong/facebook-wrong.component';
import { GoogleWrongComponent } from '../../login-components/login-dialogs/google-wrong/google-wrong.component';
import { RegistroSuccessComponent } from '../registro-dialogs/registro-success/registro-success.component';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from '../registro-servicios/register.service';

@Component({
  selector: 'app-registro-proveedor',
  templateUrl: './registro-proveedor.component.html',
  styleUrls: ['./registro-proveedor.component.scss']
})
export class RegistroProveedorComponent implements OnInit {

  constructor(
    private router:Router,
    private dialog:MatDialog,
    private fb:FormBuilder,
    private registroService:RegisterService,
  ) { }

  ngOnInit() {
  }

  subcategorias = []



  proveedorForm = this.fb.group( {

    nombre: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    apellido: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    telefono: [ '',  [Validators.required, Validators.minLength(8),  Validators.maxLength(11), Validators.pattern("[0-9]{9,11}") ] ],
    email: ['', [Validators.required, Validators.maxLength(50) ,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}")] ],
    username: ['', [Validators.required, Validators.maxLength(50) ]],
    password: [ '',  [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/) ] ],
    rpassword: [ '',  [ Validators.required, Validators.minLength(8) ] ],
    direccion: [ '', Validators.required ],
    categoria: [''],
    subcategorias: [''],
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


  categorias;




  register(){
    let proveedor = this.proveedorForm.value
    proveedor.role = 'provider'
    
    this.registroService.register(proveedor).subscribe((resp:any)=>{
      if(resp.ok){
        this.router.navigate(['/ingresa'])
        this.registroSucces()
      }else{
        if(resp.err.code == 11000){
          this.fieldRepeat(resp.index)
          
        }else{
          
        }
      }
    })

    
  }



  registroSucces() {
    const dialogRef = this.dialog.open(RegistroSuccessComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
    });
  }

googleWrong(){
 
  const dialogRef = this.dialog.open(GoogleWrongComponent, {
    width: '500px',
    data:{type:'register'}

  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

faceboookWrong(){
 
  const dialogRef = this.dialog.open(FacebookWrongComponent, {
    width: '500px',
    data:{type:'register'}
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

fieldRepeat(index){
  let data
  switch (index) {
    case 'email':
        data = {title:'Correo en uso',msg:'El correo electronico ya se encuentra registrado'}
      break;
    
    case 'username':
        data = {title:'Usuario en uso',msg:'El nombre de usuario ya se encuentra registrado'}
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


}
