import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-cambios-perfil-success',
  templateUrl: './cambios-perfil-success.component.html',
  styleUrls: ['./cambios-perfil-success.component.scss']
})
export class CambiosPerfilSuccessComponent implements OnInit {

constructor(
    public dialogRef: MatDialogRef<CambiosPerfilSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
