import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-recuperar-password-failed-dialog',
  templateUrl: './recuperar-password-failed-dialog.component.html',
  styleUrls: ['./recuperar-password-failed-dialog.component.scss']
})
export class RecuperarPasswordFailedDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<RecuperarPasswordFailedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
