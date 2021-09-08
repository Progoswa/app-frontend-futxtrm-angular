import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolesService } from '../../../globals-services/roles.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-asignar-role',
  templateUrl: './asignar-role.component.html',
  styleUrls: ['./asignar-role.component.scss']
})
export class AsignarRoleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AsignarRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolesServices:RolesService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.getRoles()
  }


  rolForm = this.fb.group({
    usuario:[this.data.id],
    role:['',[Validators.required]],
    admin:[localStorage.getItem('id')]
  })

  roles = []

  getRoles(){
    this.rolesServices.getRoles().subscribe((resp:any)=>{
      if(resp){
        this.roles = resp.roles
      }
    })
  }

  aceptar(){
    let rol = this.roles.find((rol)=>{
      return rol._id = this.rolForm.value.role
    })
    this.rolForm.value.nombre = rol.nombre
    this.rolesServices.asignar(this.rolForm.value).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.dialogRef.close(true)
      }
    })
    
  }
  
onNoClick(): void {
    this.dialogRef.close(false);
  }

}


