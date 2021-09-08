import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriaService } from "../../globals-services/categoria.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { ErrorDialogComponent } from "../../globals-dialogs/error-dialog/error-dialog.component";
import { PagosService } from "../../globals-services/pagos.service";
import { UsuarioService } from "../../globals-services/usuario.service";
import { TranslateService } from "@ngx-translate/core";

declare var paypal: any;
declare var stripe: any;
declare var elements: any;

@Component({
  selector: "app-categoria-pagar",
  templateUrl: "./categoria-pagar.component.html",
  styleUrls: ["./categoria-pagar.component.scss"],
})
export class CategoriaPagarComponent implements OnInit {
  id: any = null;
  categoria: any;

  @ViewChild("cardInfo", { static: false }) cardInfo: ElementRef;
  url: any;

  success(title: string, msg: string) {
    this.dialog.closeAll();
    this.dialog.open(SuccessDialogComponent, {
      width: "450px",
      data: { title, msg },
      hasBackdrop: true,
    });
  }

  error(title: string, msg: string) {
    this.dialog.closeAll();
    this.dialog.open(ErrorDialogComponent, {
      width: "350px",
      data: { title, msg },
      hasBackdrop: true,
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private pagosService: PagosService,
    private usuarioService: UsuarioService,
    public translate: TranslateService
  ) {
    console.log(translate);

    route.queryParams.subscribe((data) => {
      this.id = data.id;
    });
  }

  pagoForm = this.fb.group({
    usuario: [localStorage.getItem("id"), [Validators.required]],
    referencia: [""],
    captura: [""],
    metodo: ["", [Validators.required]],
    categoria: [this.id, [Validators.required]],
  });

  precio = null;

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

  @ViewChild("paypal") paypalElement: ElementRef;

  formatDate(date) {
    return date
      ? `${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`
      : "MM/AAAA";
  }

  other() {
    this.pagoForm.controls.metodo.setValue("");
  }

  generando = false;

  async generateButton() {
    this.generando = true;

    try {
      this.paypalElement.nativeElement.innerHTML = "";

      let that = this;
      await paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: `${
                      this.precio.precio -
                      this.precio.precio * (this.precio.descuento / 100)
                    }`,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Show a success message to the buyer
              let pago = that.pagoForm.value;
              pago.metodo = "paypal";
              pago.referencia = details.id;
              pago.monto =
                that.precio.precio -
                that.precio.precio * (that.precio.descuento / 100);
              that.pagosService
                .paymentWithPaypal({ pago, price: that.precio })
                .subscribe((resp: any) => {
                  if (resp.ok) {
                    that.usuarioService.verifyCategories();
                    that.router.navigate(["/cliente/inicio"]);
                    that.success(
                      that.translate.instant(
                        "user.categorie_payment.paypal.approve.title"
                      ),
                      that.translate.instant(
                        "user.categorie_payment.paypal.approve.subtitle"
                      )
                    );
                  }
                });
            });
          },
          onCancel: function (data) {
            // Show a cancel page, or return to cart
            that.error(
              that.translate.instant(
                "user.categorie_payment.paypal.cancel.title"
              ),
              that.translate.instant(
                "user.categorie_payment.paypal.cancel.subtitle"
              )
            );
          },
          onError: function (err) {
            // Show an error page here, when an error occurs
            that.error(
              that.translate.instant(
                "user.categorie_payment.paypal.error.title"
              ),
              that.translate.instant(
                "user.categorie_payment.paypal.error.subtitle"
              )
            );
          },
        })
        .render(this.paypalElement.nativeElement);
      this.generando = false;
    } catch (error) {
      setTimeout(() => {
        this.generando = false;

        this.generateButton();
      }, 1000);
    }
  }

  ngOnInit() {
    this.categoriaService.getCategoria(this.id).subscribe(async (resp: any) => {
      if (resp.ok) {
        this.categoria = resp.categoria;

        this.pagoForm.controls.categoria.setValue(this.id);
        this.offlineForm.controls.categoria.setValue(this.id);
      }
    });
  }

  procesar() {
    let fecha: string = this.cardForm.value.exp;
    let exp = fecha.split("/");
    let card = {
      number: `${this.cardForm.value.number.replace(/\D/g, "")}`,
      exp_month: Number(exp[0]),
      exp_year: Number(exp[1]),
      cvc: `${this.cardForm.value.cvc}`,
    };

    this.success(
      this.translate.instant("user.categorie_payment.card.proccess.title"),
      this.translate.instant("user.categorie_payment.card.proccess.subtitle")
    );

    this.pagosService
      .paymentWithStripe({
        precio: this.precio,
        categoria: this.id,
        card,
        usuario: localStorage.getItem("id"),
      })
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.usuarioService.verifyCategories();
          this.success(
            this.translate.instant("user.categorie_payment.card.success.title"),
            this.translate.instant(
              "user.categorie_payment.card.success.subtitle"
            )
          );
          this.router.navigate(["/cliente/inicio"]);
        } else {
          switch (resp.err.code) {
            case 10:
              this.error(
                this.translate.instant(
                  "user.categorie_payment.card.error.10.title"
                ),
                this.translate.instant(
                  "user.categorie_payment.card.error.10.title"
                )
              );
              break;
            case 11:
              this.error(
                this.translate.instant(
                  "user.categorie_payment.card.error.11.title"
                ),
                this.translate.instant(
                  "user.categorie_payment.card.error.11.title"
                )
              );
              break;
            case 12:
              this.error(
                this.translate.instant(
                  "user.categorie_payment.card.error.12.title"
                ),
                this.translate.instant(
                  "user.categorie_payment.card.error.12.title"
                )
              );
              break;

            default:
              this.error(
                this.translate.instant(
                  "user.categorie_payment.card.error.default.title"
                ),
                this.translate.instant(
                  "user.categorie_payment.card.error.default.title"
                )
              );

              break;
          }
        }
      });
  }

  numberFormat(number) {}

  offlineForm = this.fb.group({
    usuario: [localStorage.getItem("id"), [Validators.required]],
    categoria: [this.id, [Validators.required]],
    metodo: ["offline", [Validators.required]],
    status: [0],
    referencia: ["", [Validators.required]],
    captura: ["", Validators.required],
    precio: [],
  });

  subirImagen($event) {
    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.usuarioService.uploadImage(formData).subscribe((resp: any) => {
      if (resp.ok) {
        this.offlineForm.controls.captura.setValue(resp.name);
        this.url = resp.url;
      }
    });
  }

  pagoOffline() {
    let offline = this.offlineForm.value;
    offline.precio = this.precio;
    offline.monto = this.precio.precio;
    this.pagosService.paymentOffline(offline).subscribe((resp: any) => {
      if (resp.ok) {
        this.usuarioService.verifyCategories();
        this.success(
          this.translate.instant(
            "user.categorie_payment.offline.success.title"
          ),
          this.translate.instant(
            "user.categorie_payment.offline.success.subtitle"
          )
        );
        this.router.navigate(["/cliente/inicio"]);
      } else {
        this.error(
          this.translate.instant("user.categorie_payment.offline.error.title"),
          this.translate.instant(
            "user.categorie_payment.offline.error.subtitle"
          )
        );
      }
    });
  }
}
