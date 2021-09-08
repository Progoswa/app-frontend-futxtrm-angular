import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-registro-success',
  templateUrl: './registro-success.component.html',
  styleUrls: ['./registro-success.component.scss']
})
export class RegistroSuccessComponent implements OnInit {

   constructor(
    public dialogRef: MatDialogRef<RegistroSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
