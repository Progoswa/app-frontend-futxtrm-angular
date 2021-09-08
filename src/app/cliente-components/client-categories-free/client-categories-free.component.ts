import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Socket } from "ngx-socket-io";
import { AceptarComponent } from "../../globals-dialogs/aceptar/aceptar.component";
import { CategoriaFreeService } from "../../globals-services/categoria-free.service";
import { CategoriaService } from "../../globals-services/categoria.service";
import { UsuarioService } from "../../globals-services/usuario.service";

@Component({
  selector: "app-client-categories-free",
  templateUrl: "./client-categories-free.component.html",
  styleUrls: ["./client-categories-free.component.scss"],
})
export class ClientCategoriesFreeComponent implements OnInit {
  url: any;
  msg: { title: string; message: string };
  constructor(
    private categoriasService: CategoriaService,
    private categoriaFreeService: CategoriaFreeService,
    private dialog: MatDialog,
    private socket: Socket,
    private userService: UsuarioService,
    private router: Router,
    private translate: TranslateService
  ) {
    socket.on("lang_change_r", () => {
      this.ngOnInit();
    });
  }

  categorias = [];

  ngOnInit() {
    this.getCategories();
    this.getMsg();
  }

  categoria = null;

  select(categoria) {
    this.categoria = categoria;
  }

  categoriaSelected(categoria) {
    return this.categoria?._id == categoria._id ? true : false;
  }

  getCategories() {
    this.categoriaFreeService
      .getCategoriesFree(localStorage.getItem("lang"))
      .subscribe((resp: any) => {
        if (resp.code == 200) {
          this.categorias = resp.categorias;
          this.url = resp.url;
          console.log(this.categorias);
        }
      });
  }

  next() {
    let aceptar = this.dialog.open(AceptarComponent, {
      width: "400px",
      data: {
        msg: this.translate.instant("user.free.next.title"),
        content: this.translate.instant("user.free.next.subtitle"),
      },
    });

    aceptar.afterClosed().subscribe((resp) => {
      if (resp) {
        let categoria = this.categoria;
        categoria.usuario = localStorage.getItem("id");
        this.categoriaFreeService
          .userCategorieFree(categoria)
          .subscribe((resp: any) => {
            if (resp.code == 200) {
              this.userService.verifyCategories();
              this.router.navigate(["/cliente"]);
            }
          });
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  getMsg() {
    this.categoriaFreeService
      .getMsg(localStorage.getItem("lang"))
      .subscribe(
        (resp: { code: number; data: { title: string; message: string } }) => {
          if (resp.code == 200) {
            this.msg = resp.data;
          }
        }
      );
  }

  getImg(imagen) {
    return `url(${this.url}${imagen})`;
  }
}
