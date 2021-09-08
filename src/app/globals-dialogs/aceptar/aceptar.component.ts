import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, Validators } from "@angular/forms";
import { PagosService } from "../../globals-services/pagos.service";

@Component({
  selector: "app-aceptar",
  templateUrl: "./aceptar.component.html",
  styleUrls: ["./aceptar.component.scss"],
})
export class AceptarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private pagosService: PagosService,

    public dialogRef: MatDialogRef<AceptarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  aceptar() {
    console.log(1);
    const { number, exp, cvc } = this.cardForm.value;

    if (number != "" && exp != "" && cvc != "") {
      console.log({
        number: number,
        exp: exp,
        cvc: cvc,
        id_usuario: localStorage.getItem("id"),
      });
      this.pagosService
        .GratisGuardar({
          number: number,
          exp: exp,
          cvc: cvc,
          usuario: localStorage.getItem("id"),
        })
        .subscribe((resp) => this.dialogRef.close(true));
    }

    // this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  formatNumber() {
    let value: String = this.cardForm.controls.number.value;
    value = value.slice(0, 20);
    value = value.replace(/\D/g, "");
    let format = null;
    if (value.length <= 4) {
      format = `${value.slice(0, 4)}`;
    } else if (value.length <= 8) {
      format = `${value.slice(0, 4)}-${value.slice(4, 8)}`;
    } else if (value.length <= 12) {
      format = `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(
        8,
        12
      )}`;
    } else {
      format = `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(
        8,
        12
      )}-${value.slice(12, 16)}`;
    }

    this.cardForm.controls.number.setValue(format);
  }

  formatFecha() {
    let value: String = this.cardForm.controls.exp.value;
    value = value.slice(0, 8);
    value = value.replace(/\D/g, "");
    let format = `${value.slice(0, 2)}/${value.slice(2, 6)}`;
    this.cardForm.controls.exp.setValue(format);
  }

  formatCvc() {
    let value: String = this.cardForm.controls.cvc.value;
    value = value.slice(0, 3);
    value = value.replace(/\D/g, "");

    this.cardForm.controls.cvc.setValue(value);
  }

  cardForm = this.fb.group({
    number: ["", [Validators.required, Validators.minLength(19)]],
    exp: ["", Validators.required],
    cvc: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern("[0-9]{3,3}"),
      ],
    ],
  });
}
