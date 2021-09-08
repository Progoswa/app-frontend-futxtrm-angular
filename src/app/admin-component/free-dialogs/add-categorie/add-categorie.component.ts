import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaFreeService } from '../../../globals-services/categoria-free.service';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { MsgFree } from '../../categories-free/categories-free.component';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private categoriaFreeService:CategoriaFreeService

  ) { 
    categoriaFreeService.getCategoriesFree(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.code == 200){
        this.categoriasFree = resp.categorias


        
      }
    })
    
    categoriaFreeService.getMsg(localStorage.getItem("lang")).subscribe((resp:{code:number,data:MsgFree})=>{
      if(resp.code == 200){
       this.categoriaForm.controls.dias.setValue(resp.data.days)
      }
    })
  }

  ngOnInit() {
    this.getCategorias()
  }


  categoriaExist(categorie){
    let exist = this.categoriasFree.find((obj)=>{
      console.log();
      
      return obj.categoria._id == categorie._id
    })
    return (exist == undefined)?false:true
  }



    categorias = []
    categoriasFree = []
  categoriaForm = this.fb.group({
    categoria:['',[Validators.required]],
    dias:['',[Validators.required]],
    lang:[localStorage.getItem("lang"),[Validators.required]]
  })

  getCategorias() {
    this.categoriaService.getCategorias(localStorage.getItem("lang")).subscribe((resp:any)=>{
      if(resp.ok){
        this.categorias = resp.categorias
      }
    })
  }

  
  onNoClick(){
    this.dialogRef.close(false)
  }

  aceptar(){

   this.categoriaFreeService.newCategorieFree(this.categoriaForm.value).subscribe((resp:any)=>{
     if(resp.code == 200){
      this.dialogRef.close(true)
     }
   })
    
  }

}
