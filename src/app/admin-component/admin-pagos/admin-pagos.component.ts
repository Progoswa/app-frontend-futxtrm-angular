import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
} from "@angular/material";

import { Router } from "@angular/router";
import { UsuarioService } from "../../globals-services/usuario.service";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { BorrarComponent } from "../../globals-dialogs/borrar/borrar.component";
import { PagosService } from "../../globals-services/pagos.service";
import { Socket } from "ngx-socket-io";
import { ExcelService } from "../../globals-services/excel.service";
import * as moment from "moment";
import { async } from "@angular/core/testing";
import {
  PdfMakeWrapper,
  Img,
  Txt,
  Columns,
  Cell,
  Table,
  Stack,
} from "pdfmake-wrapper";
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-admin-pagos",
  templateUrl: "./admin-pagos.component.html",
  styleUrls: ["./admin-pagos.component.scss"],
})
export class AdminPagosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pagos: any;
  usuario: any;
  historial: any;
  pagosM: any;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router,
    private pagosService: PagosService,
    private socket: Socket,
    private excelService: ExcelService,
    private translate: TranslateService
  ) {}

  listar(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listarM(data) {
    this.dataSourceM = new MatTableDataSource(data);
    this.dataSourceM.paginator = this.paginator;
    this.dataSourceM.sort = this.sort;
  }
  ngOnInit() {
    this.getPermisos();
    this.socket.on("pago", () => {
      this.getPagos();
    });

    this.getPagos();
    this.usuarioService
      .getUser(localStorage.getItem("id"))
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.usuario = resp.data;
        }
      });
  }

  displayedColumns: string[] = [
    "cliente",
    "categoria",
    "referencia",
    "fecha",
    "opciones",
  ];
  displayedColumnsM: string[] = [
    "cliente",
    "membresia",
    "referencia",
    "fecha",
    "opciones",
  ];
  dataSource;
  dataSourceM;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceM.filter = filterValue.trim().toLowerCase();
  }

  capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
  }
  getPagos() {
    this.pagosService.getAll().subscribe((resp: any) => {
      console.log(resp);
      if (resp.ok) {
        let pagos = resp.pagos;
        this.pagos = resp.pagos;
        this.pagosM = resp.pagosM;
        this.listar(pagos);
        this.listarM(resp.pagosM);
      }
    });
  }

  option = "categorias";

  setOption(option) {
    this.option = option;
  }

  formatRole(role) {
    switch (role) {
      case "administrador":
        return "Administrador";
        break;
      case "usuario":
        return "Usuario";
        break;

      case "provider":
        return "Proveedor";
        break;

      default:
        break;
    }
  }

  permisos: any = {};
  getPermisos() {
    this.usuarioService
      .getUser(localStorage.getItem("id"))
      .subscribe((resp: any) => {
        this.permisos = resp.data.adminRole;
      });
  }

  exportAsXLSX(data, nombre): void {
    this.excelService.exportAsExcelFile(data, nombre);
  }

  success(title, msg) {
    this.dialog.open(SuccessDialogComponent, {
      width: "500px",
      data: { title, msg },
    });
  }

  generateExcel() {
    this.success(
      this.translate.instant("pages.payments.xlsx.generate.title"),
      this.translate.instant("pages.payments.xlsx.generate.subtitle")
    );
    let pagos = [];
    let j = 0;
    this.pagos.forEach(async (pago, i, arr: any[]) => {
      pagos.push({
        Fecha: moment(pago.fecha).format("DD-MM-YYYY HH:mm"),
        Usuario: `${pago.usuario.nombre} ${pago.usuario.apellido} (${pago.usuario.username})`,
        Categoria: pago.categoria.nombre,
        Metodo: pago.metodo,
        Referencia: pago.referencia,
        Estado: await this.formatStatus(pago.status),
      });
      j += 1;
      if (j == arr.length) {
        this.exportAsXLSX(pagos, "Pagos");
      }
    });
  }
  generateExcelM() {
    this.success(
      this.translate.instant("pages.payments.xlsx.generate.title"),
      this.translate.instant("pages.payments.xlsx.generate.subtitle")
    );
    let pagos = [];
    let j = 0;
    this.pagosM.forEach(async (pago, i, arr: any[]) => {
      pagos.push({
        Fecha: moment(pago.fecha).format("DD-MM-YYYY HH:mm"),
        Usuario: `${pago.usuario.nombre} ${pago.usuario.apellido} (${pago.usuario.username})`,
        Membresia: pago.membresia.name,
        Metodo: pago.metodo,
        Referencia: pago.referencia,
        Estado: "Pagada",
      });
      j += 1;
      if (j == arr.length) {
        this.exportAsXLSX(pagos, "Pagos membresias");
      }
    });
  }
  async generatePDF() {
    this.success(
      this.translate.instant("pages.payments.pdf.generate.title"),
      this.translate.instant("pages.payments.pdf.generate.subtitle")
    );

    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    pdf.background(
      await new Img("assets/images/watermark.png")
        .width(400)
        .height(600)
        .absolutePosition(100, 100)
        .opacity(0.1)
        .build()
    );

    pdf.add(
      await new Img("assets/images/logon.png")
        .height(75)
        .width(200)
        .alignment("center")
        .build()
    );

    pdf.add(pdf.ln(1));

    pdf.add(new Txt(`Fecha: ${moment().format("DD-MM-YYYY HH:mm")}`).end);

    pdf.add(
      new Txt(`Administrador: ${this.usuario.nombre} ${this.usuario.apellido}`)
        .end
    );
    pdf.add(new Txt(`Teléfono: ${this.usuario.telefono}`).end);
    pdf.add(new Txt(`Correo: ${this.usuario.email}`).end);
    pdf.add(pdf.ln(1));

    pdf.add(
      new Table([
        [
          new Txt(`Registro de pagos`)
            .width("*")
            .fontSize(15)
            .color("#fff")
            .alignment("center").end,
        ],
      ])
        .layout({
          defaultBorder: false,
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 ? "#D0AE3D" : null;
          },
        })
        .widths(["*"]).end
    );

    let table = [];

    table.push([
      new Txt("Usuario").color("#000").bold().alignment("left").end,
      new Txt("Monto").color("#000").bold().end,
      new Txt("Categoria").color("#000").bold().end,
      new Txt("Metodo").color("#000").bold().end,
      new Txt("Referencia").color("#000").bold().alignment("center").end,
      new Txt("Estado").color("#000").bold().alignment("center").end,
      new Txt("Fecha").color("#000").bold().alignment("center").end,
    ]);

    for (const registro of this.pagos) {
      table.push([
        new Txt(
          `${registro.usuario.nombre} ${registro.usuario.apellido} (${registro.usuario.username})`
        )
          .fontSize(10)
          .alignment("left").end,
        new Txt(`${registro.monto}$ USD`).fontSize(10).alignment("center").end,
        new Txt(`${registro.categoria.nombre}`).fontSize(10).alignment("center")
          .end,
        new Txt(`${registro.metodo}`).fontSize(10).alignment("center").end,
        new Txt(`${registro.referencia}`).fontSize(10).alignment("center").end,
        new Txt(`${await this.formatStatus(registro.status)}`)
          .fontSize(10)
          .alignment("center").end,
        new Txt(moment(registro.fecha).format("DD-MM-YYYY HH:mm"))
          .fontSize(10)
          .alignment("center").end,
      ]);
    }
    pdf.add(
      new Table(table)
        .widths(["auto", "auto", "auto", "auto", "auto", "auto", "auto"])
        .layout({
          hLineWidth: () => {
            return 0.2;
          },
          vLineWidth: () => {
            return 0.2;
          },
        }).end
    );

    pdf.create().download("historial_pagos_futxtrm");
  }
  async generatePDFM() {
    this.success(
      this.translate.instant("pages.payments.pdf.generate.title"),
      this.translate.instant("pages.payments.pdf.generate.subtitle")
    );

    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    pdf.add(
      await new Img("assets/images/logon.png")
        .height(75)
        .width(200)
        .alignment("center")
        .build()
    );
    pdf.background(
      await new Img("assets/images/watermark.png")
        .width(400)
        .height(600)
        .absolutePosition(100, 100)
        .opacity(0.1)
        .build()
    );

    pdf.add(pdf.ln(1));

    pdf.add(new Txt(`Fecha: ${moment().format("DD-MM-YYYY HH:mm")}`).end);

    pdf.add(
      new Txt(`Administrador: ${this.usuario.nombre} ${this.usuario.apellido}`)
        .end
    );
    pdf.add(new Txt(`Teléfono: ${this.usuario.telefono}`).end);
    pdf.add(new Txt(`Correo: ${this.usuario.email}`).end);
    pdf.add(pdf.ln(1));

    pdf.add(
      new Table([
        [
          new Txt(`Registro de pagos`)
            .width("*")
            .fontSize(15)
            .color("#fff")
            .alignment("center").end,
        ],
      ])
        .layout({
          defaultBorder: false,
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 ? "#D0AE3D" : null;
          },
        })
        .widths(["*"]).end
    );

    let table = [];

    table.push([
      new Txt("Usuario").color("#000").bold().alignment("left").end,
      new Txt("Monto").color("#000").bold().end,
      new Txt("Membresia").color("#000").bold().end,
      new Txt("Metodo").color("#000").bold().end,
      new Txt("Referencia").color("#000").bold().alignment("center").end,
      new Txt("Estado").color("#000").bold().alignment("center").end,
      new Txt("Fecha").color("#000").bold().alignment("center").end,
    ]);

    for (const registro of this.pagosM) {
      table.push([
        new Txt(
          `${registro.usuario.nombre} ${registro.usuario.apellido} (${registro.usuario.username})`
        )
          .fontSize(10)
          .alignment("left").end,
        new Txt(`${registro.monto}$ USD`).fontSize(10).alignment("center").end,
        new Txt(`${registro.membresia.name}`).fontSize(10).alignment("center")
          .end,
        new Txt(`${registro.metodo}`).fontSize(10).alignment("center").end,
        new Txt(`${registro.referencia}`).fontSize(10).alignment("center").end,
        new Txt(`Pagada`).fontSize(10).alignment("center").end,
        new Txt(moment(registro.fecha).format("DD-MM-YYYY HH:mm"))
          .fontSize(10)
          .alignment("center").end,
      ]);
    }
    pdf.add(
      new Table(table)
        .widths(["auto", "auto", "auto", "auto", "auto", "auto", "auto"])
        .layout({
          hLineWidth: () => {
            return 0.2;
          },
          vLineWidth: () => {
            return 0.2;
          },
        }).end
    );

    pdf.create().download("historial_pagos__membresia_futxtrm");
  }
  formatStatus(n) {
    switch (n) {
      case 0:
        return "En espera";
        break;

      case 1:
        return "Aprobada";
        break;
      case 2:
        return "Rechazada";
        break;

      default:
        break;
    }
  }

  eliminar(id, option) {
    const dialogRef = this.dialog.open(BorrarComponent, {
      width: "350px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (option == "c") {
          this.pagosService
            .delete(id, localStorage.getItem("id"))
            .subscribe((resp: any) => {
              if (resp.ok) {
                this.success(
                  this.translate.instant("pages.payments.delete.title"),
                  this.translate.instant("pages.payments.delete.subtitle")
                );
                this.getPagos();
              }
            });
        } else {
          this.pagosService
            .deleteM(id, localStorage.getItem("id"))
            .subscribe((resp: any) => {
              if (resp.ok) {
                this.success(
                  this.translate.instant("pages.payments.delete.title"),
                  this.translate.instant("pages.payments.delete.subtitle")
                );
                this.getPagos();
              }
            });
        }
      }
    });
  }

  consultar(id, option) {
    if (option == "c") {
      this.router.navigate(["/admin/pago"], { queryParams: { id } });
    } else {
      this.router.navigate(["/admin/pagom"], { queryParams: { id } });
    }
  }

  estado = true;
}
