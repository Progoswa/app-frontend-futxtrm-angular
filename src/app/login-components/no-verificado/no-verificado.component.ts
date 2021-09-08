import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login-services/login.service';
import { MatDialog } from '@angular/material';
import { EmailResendComponent } from '../login-dialogs/email-resend/email-resend.component';

@Component({
  selector: 'app-no-verificado',
  templateUrl: './no-verificado.component.html',
  styleUrls: ['./no-verificado.component.scss']
})
export class NoVerificadoComponent implements OnInit {
  constructor(
    private router:Router,
    private loginService:LoginService,
    private dialog:MatDialog, 
    private route:ActivatedRoute
  ) { 
  this.data = this.router.getCurrentNavigation().extras.state


  }

  data;
  resend_email(){

    this.loginService.resendVerifyEmail({id:this.data.id}).subscribe((resp:any)=>{
      
      if(resp.ok){
        this.emailResend()
      }else{
      
        
      }
    })
    
  }
  emailResend() {
    let dialogRef = this.dialog.open(EmailResendComponent,{
      width:'450px'
    })
    dialogRef.afterClosed().subscribe(result => {
 
    });
  }

  ngOnInit() {
 
   
    if(this.data == undefined){
      this.router.navigate(['/ingresa'])
    }
    
 
 
  }
}
