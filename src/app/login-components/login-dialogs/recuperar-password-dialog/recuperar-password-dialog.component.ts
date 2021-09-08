import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-recuperar-password-dialog',
  templateUrl: './recuperar-password-dialog.component.html',
  styleUrls: ['./recuperar-password-dialog.component.scss']
})
export class RecuperarPasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecuperarPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
