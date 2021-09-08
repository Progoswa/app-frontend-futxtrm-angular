import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PagosService } from "../../globals-services/pagos.service";
import { ErrorDialogComponent } from "../../globals-dialogs/error-dialog/error-dialog.component";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { MatDialog } from "@angular/material";
import { AceptarComponent } from "../../globals-dialogs/aceptar/aceptar.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-admin-pago",
  templateUrl: "./admin-pago.component.html",
  styleUrls: ["./admin-pago.component.scss"],
})
export class AdminPagoComponent implements OnInit {
  id: any;
  pago: any;
  url: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagosService: PagosService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    route.queryParams.subscribe((data) => {
      this.id = data.id;
    });
  }

  ngOnInit() {
    this.opciones = true;
    this.getPago();
  }

  success(title: string, msg: string) {
    this.dialog.closeAll();
    let alert = this.dialog.open(SuccessDialogComponent, {
      width: "350px",
      data: { title, msg },
      hasBackdrop: true,
    });
  }

  opciones = true;

  error(title: string, msg: string) {
    this.dialog.closeAll();
    let alert = this.dialog.open(ErrorDialogComponent, {
      width: "350px",
      data: { title, msg },
      hasBackdrop: true,
    });
  }

  getPago() {
    this.pagosService.getPago(this.id).subscribe((resp: any) => {
      if (resp.ok) {
        console.log("resp==============================================");
        console.log(resp.pago);

        this.pago = resp.pago;
        this.url = resp.url;
        if (resp.pago.status != 0) {
          this.opciones = false;
        }
      }
    });
  }

  msg(status) {
    switch (status) {
      case 0:
        return this.translate.instant("pages.payments.categories.payment.msg0");
        break;
      case 1:
        return this.translate.instant("pages.payments.categories.payment.msg1");
        break;
      case 2:
        return this.translate.instant("pages.payments.categories.payment.msg3");
        break;

      default:
        break;
    }
  }

  aceptar(id) {
    let option = this.dialog.open(AceptarComponent, {
      width: "350px",
      data: {
        msg: this.translate.instant(
          "pages.payments.categories.payment.try.accept.title"
        ),
        content: this.translate.instant(
          "pages.payments.categories.payment.try.accept.subtitle"
        ),
      },
    });

    option.afterClosed().subscribe((result) => {
      if (result) {
        this.pagosService
          .aceptarOffline(id, localStorage.getItem("id"))
          .subscribe((resp: any) => {
            if (resp.ok) {
              this.success(
                this.translate.instant(
                  "pages.payments.categories.payment.success.accept.title"
                ),
                this.translate.instant(
                  "pages.payments.categories.payment.success.accept.subtitle"
                )
              );
              this.router.navigate(["/admin/pagos"]);
            }
          });
      }
    });
  }

  rechazar(id) {
    let option = this.dialog.open(AceptarComponent, {
      width: "350px",
      data: {
        msg: this.translate.instant(
          "pages.payments.categories.payment.try.refuse.title"
        ),
        content: this.translate.instant(
          "pages.payments.categories.payment.try.refuse.subtitle"
        ),
      },
    });

    option.afterClosed().subscribe((result) => {
      if (result) {
        this.pagosService
          .rechazarOffline(id, localStorage.getItem("id"))
          .subscribe((resp: any) => {
            if (resp.ok) {
              this.success(
                this.translate.instant(
                  "pages.payments.categories.payment.success.refuse.title"
                ),
                this.translate.instant(
                  "pages.payments.categories.payment.success.refuse.subtitle"
                )
              );
              this.router.navigate(["/admin/pagos"]);
            }
          });
      }
    });
  }
}
