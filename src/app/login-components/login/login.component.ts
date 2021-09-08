import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { NewPasswordSuccesComponent } from "../login-dialogs/new-password-succes/new-password-succes.component";
import { CredencialesInvalidasComponent } from "../login-dialogs/credenciales-invalidas/credenciales-invalidas.component";
import { FacebookWrongComponent } from "../login-dialogs/facebook-wrong/facebook-wrong.component";
import { GoogleWrongComponent } from "../login-dialogs/google-wrong/google-wrong.component";
import { LoginService } from "../login-services/login.service";
import { Router } from "@angular/router";
import { Socket } from "ngx-socket-io";
import { ErrorDialogComponent } from "../../globals-dialogs/error-dialog/error-dialog.component";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { AuthFirebaseService } from "../login-services/auth-firebase.service";
import { TranslateService } from "@ngx-translate/core";
import { UsuarioService } from "../../globals-services/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuarioService,
    private socket: Socket,
    public translate: TranslateService
  ) {}

  switchLang(lang: string) {
    localStorage.setItem("lang", lang);
    this.translate.use(lang);
  }

  loginForm = this.fb.group({
    usuario: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });

  login() {
    this.loginService.login(this.loginForm.value).subscribe((resp: any) => {
      console.log(resp);

      if (resp.ok) {
        if (this.loginForm.value.remember) {
          localStorage.setItem("remember", "true");
        }

        if (resp.verify && resp.status) {
          console.log(resp);

          localStorage.setItem("id", resp.id);
          localStorage.setItem("token", resp.token);
          this.usuarioService.verifyCategories();
          switch (resp.role) {
            case "administrador":
              this.router.navigate(["/admin"]);
              break;
            case "usuario":
              this.router.navigate(["/cliente"]);
              break;

            default:
              break;
          }
        } else if (!resp.status) {
          this.errorDialog(
            this.translate.instant("login.blocked.title"),
            this.translate.instant("login.blocked.msg")
          );
        } else if (!resp.verify) {
          this.router.navigate(["/no-verificado"], {
            state: { id: resp.id, email: resp.email },
          });
        }
      } else {
        this.errorDialog(
          this.translate.instant("login.wrong.title"),
          this.translate.instant("login.wrong.msg")
        );
      }
    });
  }

  errorDialog(title, msg) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: { title, msg },
    });
  }

  success(title, msg) {
    this.dialog.open(SuccessDialogComponent, {
      width: "500px",
      data: { title, msg },
    });
  }

  ngOnInit() {}
}
