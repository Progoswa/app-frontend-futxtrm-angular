import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-email-repeat',
  templateUrl: './email-repeat.component.html',
  styleUrls: ['./email-repeat.component.scss']
})
export class EmailRepeatComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EmailRepeatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
