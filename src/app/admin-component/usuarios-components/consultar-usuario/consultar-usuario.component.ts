import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../globals-services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Socket } from 'ngx-socket-io';
import { CambiosPerfilSuccessComponent } from '../../auditoria-components/perfil-dialogs/cambios-perfil-success/cambios-perfil-success.component';
import { Router } from '@angular/router';
import { ModificarComponent } from '../../../globals-dialogs/modificar/modificar.component';
import csc from 'country-state-city'
 
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styleUrls: ['./consultar-usuario.component.scss']
})
export class ConsultarUsuarioComponent implements OnInit {

usuario: any;
  subcategorias: any;

  constructor(
    private usuarioService:UsuarioService,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private router:Router,
  ) { 
    if(this.router.getCurrentNavigation().extras.state == undefined){
      this.router.navigate(['/admin/usuarios/usuarios'])
    }else{
      this.id = this.router.getCurrentNavigation().extras.state.id
    }
  }

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
    this.usuarioService.getUser(this.id).subscribe((resp:any)=>{
      if(resp.ok){
        resp.data.url =  resp.url + resp.data.foto
        this.usuario = resp.data   
        this.setProfileFormValue(resp.url,resp.data)
      }
      
    })
  }
  id(id: any) {
    throw new Error("Method not implemented.");
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

  

 



  actualizarPerfil(){
    const dialogRef = this.dialog.open(ModificarComponent, {
      width: '400px'
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.perfilForm.value.id = this.id
      this.perfilForm.value.idAdmin = localStorage.getItem('id')
  
      this.usuarioService.updateUserByAdmin(this.perfilForm.value).subscribe((resp:any)=>{
        if(resp.ok){
        
          this.getUser()
          this.cambiosPerfilSuccess()
        }
      })
    });

  
  }


  cambiosPerfilSuccess() {
    const dialogRef = this.dialog.open(CambiosPerfilSuccessComponent, {
      width: '400px'
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
     
    });
    
  }

  formatRole(role){
    switch (role) {
      case 'admin':
        return 'Administrador'
        break;
      case 'client':
        return 'Cliente'
        break;
    
      case 'provider':
        return 'Proveedor'
        break;
    
      default:
        break;
    }
  }


  setProfileFormValue(url,data) {
    this.perfilForm.controls.foto.setValue(data.foto) 
    this.perfilForm.controls.nombre.setValue(data.nombre) 
    this.perfilForm.controls.apellido.setValue(data.apellido) 
    this.perfilForm.controls.pais.setValue(data.pais) 
    this.perfilForm.controls.estado.setValue(data.estado) 
    this.perfilForm.controls.ciudad.setValue(data.ciudad) 
    this.perfilForm.controls.telefono.setValue(data.telefono) 
    this.perfilForm.controls.direccion.setValue(data.direccion) 
    this.usuario.urlPerfil = url +data.foto
  }

}
