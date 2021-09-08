import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pedir-dato-string',
  templateUrl: './pedir-dato-string.component.html',
  styleUrls: ['./pedir-dato-string.component.scss']
})
export class PedirDatoStringComponent implements OnInit {
  dato: any;

  constructor(
    public dialogRef: MatDialogRef<PedirDatoStringComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  
  ) { }

  ngOnInit() {
  }

  

  aceptar(){
    this.dato = this.dato.substring(0, 1).toUpperCase() + this.dato.substring(1);
    
    this.dialogRef.close(this.dato)
  }

  onNoClick(){
    this.dialogRef.close(false)
  }

}
