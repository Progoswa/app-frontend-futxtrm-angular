import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

 constructor(
    public dialogRef: MatDialogRef<ModificarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  
  ) { }

  ngOnInit() {
  }

 

  aceptar(){
    this.dialogRef.close(true);
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
