import { Component, OnInit } from "@angular/core";
import { CategoriaService } from "../../globals-services/categoria.service";
import { MatDialog } from "@angular/material";
import { AceptarComponent } from "../../globals-dialogs/aceptar/aceptar.component";
import { ErrorDialogComponent } from "../../globals-dialogs/error-dialog/error-dialog.component";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { ComprarCategoriaComponent } from "../cliente-dialogs/comprar-categoria/comprar-categoria.component";
import { Router } from "@angular/router";
import { CategoriaSeleccionComponent } from "../categoria-seleccion/categoria-seleccion.component";
import { Socket } from "ngx-socket-io";
import { UsuarioService } from "../../globals-services/usuario.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-cliente-inicio",
  templateUrl: "./cliente-inicio.component.html",
  styleUrls: ["./cliente-inicio.component.scss"],
})
export class ClienteInicioComponent implements OnInit {
  categorias: any = [];
  misCategorias: any[] = [];
  categoriasAndTime: any[] = [];
  url: any;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private router: Router,
    private socket: Socket,
    public usuarioService: UsuarioService,
    public translate: TranslateService
  ) {
    console.log(translate);
  }

  ngOnInit() {
    this.getMyCategorias();
    this.socket.on("lang_change_r", () => {
      this.getMyCategorias();
    });
  }

  getCategorias() {
    this.categoriaService
      .getCategorias(localStorage.getItem("lang"))
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.categorias = resp.categorias;

          const { categoriasAndTime } = resp;

          let NoLocks = [];
          let Locks = categoriasAndTime.filter((categoria) => {
            if (!this.misCategorias.includes(categoria.categoria._id)) {
              NoLocks.push(categoria);
            } else return categoria;
          });

          Promise.all(Locks);

          this.categoriasAndTime = Locks.concat(NoLocks);
          this.url = resp.url;
        }
      });
  }

  getMyCategorias() {
    console.log(localStorage.getItem("id"));

    this.categoriaService
      .getMyCategorias(localStorage.getItem("id"))
      .subscribe((resp: any) => {
        console.log("resp");
        console.log(resp);
        if (resp.ok) {
          resp.categorias.forEach((element) => {
            this.misCategorias.push(element.categoria);
          });

          this.getCategorias();
        }
      });
  }

  comprar(categoria, tiempo) {
    categoria.tiempo = tiempo;
    let comprar = this.dialog.open(ComprarCategoriaComponent, {
      width: "350px",
      data: categoria,
    });

    comprar.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/cliente/categoria/comprar"], {
          queryParams: { id: categoria._id },
        });
      }
    });
  }

  getImg(imagen) {
    return `url(${this.url}${imagen})`;
  }

  success(title: string, msg: string) {
    let alert = this.dialog.open(SuccessDialogComponent, {
      width: "350px",
      data: { title, msg },
    });
  }

  error(title: string, msg: string) {
    let alert = this.dialog.open(ErrorDialogComponent, {
      width: "350px",
      data: { title, msg },
    });
  }

  verCategoria(categoria, tiempo) {
    categoria.tiempo = tiempo;
    console.log(categoria);

    let comprar = this.dialog.open(CategoriaSeleccionComponent, {
      width: "80vw",
      data: categoria,
    });
  }
}
