import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../../material-component/dialog/dialog.component';
import { NewPasswordSuccesComponent } from '../login-dialogs/new-password-succes/new-password-succes.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordService } from '../login-services/password.service';

@Component({
  selector: 'app-nueva-password',
  templateUrl: './nueva-password.component.html',
  styleUrls: ['./nueva-password.component.scss']
})
export class NuevaPasswordComponent implements OnInit {
  token: any;
  
  constructor(
    private fb:FormBuilder,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private passwordService:PasswordService
  ) { }


  nuevaForm = this.fb.group( {

    password: ['', [Validators.required, Validators.minLength(8)] ],
    rpassword: ['', [Validators.required, Validators.minLength(8)] ]

 },{validators:this.checkPasswords})

 checkPasswords(form: FormGroup) { // funcion syncrona para verificar que las contraseñas coinciden
  let pass = form.controls.password.value;
  let confirmPass = form.controls.rpassword.value;
  if(pass !== confirmPass){
    form.controls.rpassword.setErrors({ 'repeatInvalid' : true })
  }
  return null     
}


valido;

  ngOnInit() {
    this.route.queryParams.subscribe((resp)=>{
      
      this.authToken(resp.token)
      
    })
  }



  authToken(token){
    this.passwordService.authRecoveryPassword({token}).subscribe((resp:any)=>{
     if(resp.ok){
      this.token = token
      this.valido = true
     }else{
       this.valido = false
     }
      
    })
  }


  newPassword(){
    
    
    
    this.passwordService.setNewPassword({recovery_password_token:this.token,password:this.nuevaForm.value.password}).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.success()
      }
    })
  }

  success(): void {
    this.router.navigate(['/ingresa'])
    
    const dialogRef = this.dialog.open(NewPasswordSuccesComponent, {
      width: '450px',
  
    });

    dialogRef.afterClosed().subscribe(result => {
 
    });
  }
}
