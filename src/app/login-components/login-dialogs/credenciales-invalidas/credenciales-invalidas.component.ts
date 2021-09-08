import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-credenciales-invalidas',
  templateUrl: './credenciales-invalidas.component.html',
  styleUrls: ['./credenciales-invalidas.component.scss']
})
export class CredencialesInvalidasComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<CredencialesInvalidasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
