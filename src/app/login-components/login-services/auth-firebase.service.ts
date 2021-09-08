import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';

import { Router } from '@angular/router';
import { RegisterService } from '../../registro-components/registro-servicios/register.service';
import { LoginService } from './login.service';
import { AngularFireAuth } from  "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  user: User;
  constructor(
    public  afAuth:  AngularFireAuth, 
    public  router:  Router,
    private registerService:RegisterService,
    private loginService:LoginService
  ) {
  
   
  
   }
  
  
     registerSocial(role,type){
     return new Promise(async(resolve,reject)=>{
       let option;
  
      switch (type) {
        case 'google':
          option = new auth.GoogleAuthProvider()
          break;
        case 'facebook':
          option = new auth.FacebookAuthProvider()
          break;
      
        default:
          break;
      }
    
       await  this.afAuth.signInWithPopup(option).then((resp)=>{
     
        

         
         if(resp.user){

        

          let profile:any = resp.additionalUserInfo.profile
          
            if(resp.additionalUserInfo.providerId == 'google.com'){
              let userInfo = {
                nombre: profile.given_name,
                apellido: profile.family_name,
                email: resp.user.email,
                uid: resp.user.uid,
                role,
                socialAccount:true,
                telefono:resp.user.phoneNumber
               }
       

               
           this.registerService.registerSocial(userInfo).subscribe((resp:any)=>{
            
            if(resp.ok){
 
               resolve(resp.user)
            }else{
              if(resp.err.code == 11000){
                 reject({type,code:11000})
              }else{
                reject({type})
              }
            }
          })
            }else {

              let userInfo = {
                nombre: profile.first_name,
                apellido: profile.last_name,
                email: profile.email,
                uid: resp.user.uid,
                role,
                socialAccount:true,
                telefono:resp.user.phoneNumber
               }
               
              
           this.registerService.registerSocial(userInfo).subscribe((resp:any)=>{
      
            if(resp.ok){
 
               resolve(resp.user)
            }else{
              if(resp.err.code == 11000){
                 reject({type,code:11000})
              }else{
                reject({type})
              }
            }
          })
            }
         
  
          
          
         
  

           
         }
     
       }).catch((err)=>{
       })
     })
  
  }
  
  
  
  
  
  loginSocial(type){
    return new Promise(async (resolve,reject)=>{
      let option;
      switch (type) {
        case 'google':
          option = new auth.GoogleAuthProvider()
          break;
        case 'facebook':
          option = new auth.FacebookAuthProvider()
          break;
      
        default:
          break;
      }
      await  this.afAuth.signInWithPopup(option).then((resp)=>{
        if(resp.user){
         
          this.loginService.loginSocialNetwork({uid:resp.user.uid}).subscribe((resp:any)=>{
            if(resp.ok){
              resolve(resp.user)
            }else{
             resp.err.type = type
              
              reject(resp.err)
            }
          })
        }
    
      }).catch((err)=>{})
  
  
    })
  
  
  
  }

}
