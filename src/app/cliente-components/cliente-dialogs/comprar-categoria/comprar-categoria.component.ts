import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaService } from '../../../globals-services/categoria.service';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-comprar-categoria',
  templateUrl: './comprar-categoria.component.html',
  styleUrls: ['./comprar-categoria.component.scss']
})
export class ComprarCategoriaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComprarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private sanitizer: DomSanitizer,
    private translate:TranslateService
  ) { }

  ngOnInit() {
  }


  aceptar(){
    this.dialogRef.close(true);
    
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  fotmatTime(minutos){
    return `${moment.utc().startOf('day').add({ minutes: minutos }).format('HH')} ${this.translate.instant('user.home.buy.hours')} ${moment.utc().startOf('day').add({ minutes: minutos }).format('mm')} ${this.translate.instant('user.home.buy.minuts')}`
  }
 
}
