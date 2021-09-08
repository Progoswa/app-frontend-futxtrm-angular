import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-email-resend',
  templateUrl: './email-resend.component.html',
  styleUrls: ['./email-resend.component.scss']
})
export class EmailResendComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmailResendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
