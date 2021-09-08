import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaFreeService } from '../../../globals-services/categoria-free.service';
import { MsgFree } from '../../categories-free/categories-free.component';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaFreeService:CategoriaFreeService,
    private fb:FormBuilder

  ) {
    categoriaFreeService.getMsg(localStorage.getItem("lang")).subscribe((resp:{code:number,data:MsgFree})=>{
      if(resp.code == 200){
       this.textForm.setValue(resp.data)
      }
    })
   }

   textForm = this.fb.group({
     title:['',[Validators.required]],
     message:['',[Validators.required]],
     days:['',[Validators.required]],
   })

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close(false)
  }

  aceptar(){

    this.categoriaFreeService.updateMsg(localStorage.getItem("lang"),this.textForm.value).subscribe((resp)=>{
      this.dialogRef.close(true)
    })
    
  }

}
