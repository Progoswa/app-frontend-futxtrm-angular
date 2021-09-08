import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogComponent } from '../../../globals-dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { MembresiaService } from '../../../globals-services/membresia.service';
import { PagosService } from '../../../globals-services/pagos.service';
import { UsuarioService } from '../../../globals-services/usuario.service';
declare var paypal:any;
@Component({
  selector: 'app-comprar-membresia',
  templateUrl: './comprar-membresia.component.html',
  styleUrls: ['./comprar-membresia.component.scss']
})
export class ComprarMembresiaComponent implements OnInit {
  membresia: any;
  generando: boolean;
  precio: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private pagosService:PagosService,
    private cd: ChangeDetectorRef,
    private membresiaService:MembresiaService,
    public userService:UsuarioService,
    public translate:TranslateService
  ) {

    route.queryParams.subscribe((data)=>{
      membresiaService.getMembresia(data.id).subscribe((resp:any)=>{
        if(resp.code == 200){
          this.membresia = resp.membresia
        }else{
          router.navigate(["/cliente/membresias"])
        }
      })
    })
   }

  ngOnInit() {
  }

  success(title: string, msg: string) {
    this.dialog.closeAll()
    let alert = this.dialog.open(SuccessDialogComponent,{
      width:'350px',
      data:{title,msg},
      hasBackdrop:true
    })
  }


  error(title: string, msg: string) {
    this.dialog.closeAll()
   let alert = this.dialog.open(ErrorDialogComponent,{
     width:'350px',
     data:{title,msg},
     hasBackdrop:true
   })
  }

  
  @ViewChild('paypal') paypalElement: ElementRef;  

  async generateButton(){
    this.generando = true
    
    try {
     this.paypalElement.nativeElement.innerHTML = ''
     
      let that = this
      await paypal.Buttons({
        createOrder: (data, actions)=>{
          return actions.order.create({
            purchase_units: [{
                amount: {
                    value: `${(this.precio.precio - (this.precio.precio * (this.precio.descuento/100)))}`
                }
            }]
        });
        },
        onApprove: function(data, actions) {
      
          return actions.order.capture().then(function(details) {
              // Show a success message to the buyer
            
             that.pagosService.membresiaPaymentWithPaypal({price:that.precio,user:that.userService.user,membership:that.membresia,details}).subscribe((resp:any)=>{
               
               if(resp.code == 200){
                  that.userService.verifyCategories()
                 that.router.navigate(['/cliente/inicio'])
                 that.success(that.translate.instant('user.membership_payment.paypal.approve.title'),that.translate.instant('user.membership_payment.paypal.approve.subtitle'))
               }else{
                 console.log(resp);
                 
               }
             })
              
          });
      },
      onCancel: function (data) {  
        // Show a cancel page, or return to cart  
         that.error(that.translate.instant('user.membership_payment.paypal.cancel.title'),that.translate.instant('user.membership_payment.paypal.cancel.subtitle'))
         
      },  
      onError: function (err) {  
        // Show an error page here, when an error occurs  
        that.error(that.translate.instant('user.membership_payment.paypal.error.title'),that.translate.instant('user.membership_payment.paypal.error.subtitle'))
  
      }  
      }).render(this.paypalElement.nativeElement)
      this.generando = false
    } catch (error) {
      
    
      
      setTimeout(()=>{
        this.generando = false
      
        
        this.generateButton()
      },1000)
     
      
    }

  
  }


  cardForm = this.fb.group({
    number:['',[Validators.required,Validators.minLength(19)]],
    exp:['',Validators.required],
    cvc:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern("[0-9]{3,3}")]]
  })



  procesar(){
    let fecha:string = this.cardForm.value.exp
    let exp = fecha.split("/")
    let card = {
      number: `${this.cardForm.value.number.replace(/\D/g,'')}`,
      exp_month: Number(exp[0]),
      exp_year:  Number(exp[1]),
      cvc: `${this.cardForm.value.cvc}`,
    }
    this.success(this.translate.instant('user.membership_payment.card.proccess.title'),this.translate.instant('user.membership_payment.card.proccess.subtitle'))
  
    console.log(card);
    
    this.pagosService.membershipPaymentWithStripe({price:this.precio,membership:this.membresia,card,user:this.userService.user}).subscribe((resp:any)=>{
        console.log(resp);
        
      if(resp.code == 200){
        this.userService.verifyCategories()
        this.success(this.translate.instant('user.membership_payment.card.success.title'),this.translate.instant('user.membership_payment.card.success.subtitle'))
        this.router.navigate(['/cliente/inicio'])
      }else {
        switch (resp.err.code) {
          case 10:
            this.error(this.translate.instant('user.membership_payment.card.error.10.title'),this.translate.instant('user.membership_payment.card.error.10.title'))
            break;
          case 11:
          this.error(this.translate.instant('user.membership_payment.card.error.11.title'),this.translate.instant('user.membership_payment.card.error.11.title'))
            break;
          case 12:
          this.error(this.translate.instant('user.membership_payment.card.error.12.title'),this.translate.instant('user.membership_payment.card.error.12.title'))
            break;
        
          default:
            this.error(this.translate.instant('user.membership_payment.card.error.default.title'),this.translate.instant('user.membership_payment.card.error.default.title'))

            break;
        }
        
      }
      
    })
    
   
    
  }
  

  
  formatNumber(){
    let value:String = this.cardForm.controls.number.value
    value = value.slice(0,20)
    value = value.replace(/\D/g,'')
    let format = null
    if (value.length <= 4) {
       format = `${value.slice(0,4)}`
 
    } else if(value.length <= 8) {
      format = `${value.slice(0,4)}-${value.slice(4,8)}`

    }else if(value.length <= 12){
      format = `${value.slice(0,4)}-${value.slice(4,8)}-${value.slice(8,12)}`

    }else{

      format = `${value.slice(0,4)}-${value.slice(4,8)}-${value.slice(8,12)}-${value.slice(12,16)}`
    }

    this.cardForm.controls.number.setValue(format)
   }

   formatFecha(){
    let value:String = this.cardForm.controls.exp.value
    value = value.slice(0,8)
    value = value.replace(/\D/g,'')
    let format = `${value.slice(0,2)}/${value.slice(2,6)}`
    this.cardForm.controls.exp.setValue(format)
   }

   formatCvc(){
    let value:String = this.cardForm.controls.cvc.value
    value = value.slice(0,3)
    value = value.replace(/\D/g,'')

    this.cardForm.controls.cvc.setValue(value)
   }

}
