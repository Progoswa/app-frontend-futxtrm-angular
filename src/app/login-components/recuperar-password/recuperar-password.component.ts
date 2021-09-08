import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../login-services/password.service';
import { MatDialog } from '@angular/material';
import { RecuperarPasswordDialogComponent } from '../login-dialogs/recuperar-password-dialog/recuperar-password-dialog.component';
import { Router } from '@angular/router';
import { RecuperarPasswordFailedDialogComponent } from '../login-dialogs/recuperar-password-failed-dialog/recuperar-password-failed-dialog.component';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit {

  
  constructor(
    private fb:FormBuilder,
    private passwordService:PasswordService,
    private dialog:MatDialog,
    private router:Router
  ) { }


  recuperarForm = this.fb.group( {

    email: ['', [Validators.required, Validators.email] ]

 })

 recuperar(){
   this.passwordService.recoveryPassword(this.recuperarForm.value).subscribe((resp:any)=>{

     
     if(resp.ok){
       this.router.navigate(['/ingresa'])
        this.dialog.open(RecuperarPasswordDialogComponent,{
          width:"450px"
        })
     }else{
       if(resp.user == null){
        this.dialog.open(RecuperarPasswordFailedDialogComponent,{
          width:"450px"
        })
       }
     }
   })
 }
  ngOnInit() {
  }
}
