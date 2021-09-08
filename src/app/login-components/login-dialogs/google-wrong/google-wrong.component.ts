import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-google-wrong',
  templateUrl: './google-wrong.component.html',
  styleUrls: ['./google-wrong.component.scss']
})
export class GoogleWrongComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GoogleWrongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
