import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-entrenamiento-seccion',
  templateUrl: './ver-entrenamiento-seccion.component.html',
  styleUrls: ['./ver-entrenamiento-seccion.component.scss']
})
export class VerEntrenamientoSeccionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VerEntrenamientoSeccionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private sanitizer:DomSanitizer
) { }

  ngOnInit() {
  }  

  uploadVimeo(id){
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`)
  
   
  }

} 
