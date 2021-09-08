import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-password-succes',
  templateUrl: './new-password-succes.component.html',
  styleUrls: ['./new-password-succes.component.scss']
})
export class NewPasswordSuccesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewPasswordSuccesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
