import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-password-invalid',
  templateUrl: './password-invalid.component.html',
  styleUrls: ['./password-invalid.component.scss']
})
export class PasswordInvalidComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PasswordInvalidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
