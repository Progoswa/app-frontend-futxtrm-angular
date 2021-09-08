import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CambiosPerfilSuccessComponent } from '../perfil-dialogs/cambios-perfil-success/cambios-perfil-success.component';
import { MatDialog } from '@angular/material';
import { PasswordInvalidComponent } from '../perfil-dialogs/password-invalid/password-invalid.component';
import { Socket } from 'ngx-socket-io';
import csc from 'country-state-city'
 
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.scss']
})
export class AdminPerfilComponent implements OnInit {
  usuario: any;

  constructor(
    private usuarioService:UsuarioService,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private socket:Socket,
    public translate:TranslateService
  ) { }

  perfilForm = this.fb.group({
    nombre: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    apellido: ['', [Validators.required,  Validators.maxLength(40) ,Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$")] ],
    telefono:['',[Validators.required,]],
    direccion:['',[Validators.required]],
    pais: [ '', Validators.required ],
    estado: [ '', Validators.required ],
    ciudad: [ '', Validators.required ],
    foto:['',[Validators.required]]
  })

  seguridadForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}"), Validators.maxLength(50) ] ],
    username: ['', [Validators.required, Validators.maxLength(50) ] ],
    password: ['',[Validators.required,Validators.minLength(8)]],
    cambiar: [false],
    npassword: ['',[ Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/) ]],
    rnpassword: [''],
  },{validator:this.checkPasswords})


  checkPasswords(form: FormGroup) { // funcion syncrona para verificar que las contraseñas coinciden
    let pass = form.controls.npassword.value;
    let confirmPass = form.controls.rnpassword.value;
    if(form.controls.cambiar.value == true){
      if(pass != '' && confirmPass != ''){
        if(pass !== confirmPass){
          form.controls.rnpassword.setErrors({ 'repeatInvalid' : true })
        }
      }else{
        form.controls.rnpassword.setErrors({ 'repeatInvalid' : true })
      }
    }else{
      form.controls.rnpassword.setErrors(null)
    }
  
    
  
    return null     
  }
 
  ngOnInit() {
    this.getUser()
    this.getPaises()
  }

  paises = []
  estados = []
  ciudades = []

  getPaises(){
    this.paises = csc.getAllCountries()

    
  }

  getEstados(pais){
  
    this.estados = csc.getStatesOfCountry(pais.id)
    
  }

  getCitys(estado){
    this.ciudades = csc.getCitiesOfState(estado.id)
  }
  getUser(){
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
        resp.data.url =  resp.url + resp.data.foto
        this.usuario = resp.data
        this.seguridadForm.controls.email.setValue(resp.data.email)
        this.seguridadForm.controls.username.setValue(resp.data.username)
        
        this.setProfileFormValue(resp.url,resp.data)
       
      }
      
    })
  }


  subirImagen($event){
    let formData: FormData = new FormData();
      formData.append('image',$event.target.files[0])
      this.usuarioService.uploadImage(formData).subscribe((resp:any)=>{
     
        
        if(resp.ok){
          this.perfilForm.controls.foto.setValue(resp.name)
          this.usuario.urlPerfil = resp.url
        }
        
      })
      
    
  }

  

  actualizarSeguridad(){
    this.usuarioService.updateSeguridadUser(localStorage.getItem('id'),this.seguridadForm.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.socket.emit('cambios_en_datos',{to:localStorage.getItem('id')})
        this.resetFormSeguridad()
        this.getUser()
        this.success(this.translate.instant('pages.profile.profile.success.title'),this.translate.instant('pages.profile.profile.success.subtitle'))
      }else{
        if(resp.err.code == 404){
          
          this.success(this.translate.instant('pages.profile.security.failed.title'),this.translate.instant('pages.profile.security.failed.subtitle'))
        }
      }
     
      
    })
    
  }


  resetFormSeguridad() {
    for (const control in this.seguridadForm.controls) {
      this.seguridadForm.controls[control].setValue('')
        this.seguridadForm.controls[control].setErrors(null)
        
      
    }
  }

  actualizarPerfil(){
    this.usuarioService.updatePerfilUser(localStorage.getItem('id'),this.perfilForm.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.socket.emit('cambios_en_datos',{to:localStorage.getItem('id')})
        this.getUser()
        this.success(this.translate.instant('pages.profile.profile.success.title'),this.translate.instant('pages.profile.profile.success.subtitle'))
      }
    })
  }

  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }


 


  setProfileFormValue(url,data) {
    this.perfilForm.controls.foto.setValue(data.foto) 
    this.perfilForm.controls.nombre.setValue(data.nombre) 
    this.perfilForm.controls.pais.setValue(data.pais) 
    this.perfilForm.controls.estado.setValue(data.estado) 
    this.perfilForm.controls.ciudad.setValue(data.ciudad) 
    this.perfilForm.controls.apellido.setValue(data.apellido) 
    this.perfilForm.controls.telefono.setValue(data.telefono) 
    this.perfilForm.controls.direccion.setValue(data.direccion) 
    this.usuario.urlPerfil = url +data.foto
  }


}
