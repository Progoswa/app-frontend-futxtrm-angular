import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-facebook-wrong',
  templateUrl: './facebook-wrong.component.html',
  styleUrls: ['./facebook-wrong.component.scss']
})
export class FacebookWrongComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacebookWrongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
