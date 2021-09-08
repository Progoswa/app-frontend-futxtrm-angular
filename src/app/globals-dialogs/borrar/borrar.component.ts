import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.scss']
})
export class BorrarComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<BorrarComponent>,
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
