import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { PlantillaService } from "../../globals-services/plantilla.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorDialogComponent } from "../../globals-dialogs/error-dialog/error-dialog.component";
import { PedirDatoStringComponent } from "../../globals-dialogs/pedir-dato-string/pedir-dato-string.component";
import { SuccessDialogComponent } from "../../globals-dialogs/success-dialog/success-dialog.component";
import { MatDialog } from "@angular/material";
import { CategoriaService } from "../../globals-services/categoria.service";
import { CalendarioService } from "../../globals-services/calendario.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-plantilla-calendario",
  templateUrl: "./plantilla-calendario.component.html",
  styleUrls: ["./plantilla-calendario.component.scss"],
})
export class PlantillaCalendarioComponent implements OnInit {
  id: any;
  categoria: any;
  secciones: any;
  url: any;
  calendario: any;
  calendarioid: any;
  plantillas: any;
  plantillasToCharge: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private plantillaService: PlantillaService,
    private calendarioService: CalendarioService,
    public translate: TranslateService
  ) {
    if (router.getCurrentNavigation() != null) {
      if (router.getCurrentNavigation().extras.state != null) {
        this.plantillas = router.getCurrentNavigation().extras.state.plantillas;
      } else {
        this.router.navigate(["/cliente"]);
      }
    } else {
      this.router.navigate(["/cliente"]);
    }
  }

  ngOnInit() {
    this.plantilla = [];
    let that = this;
    function askConfirmation(evt) {
      var msg = that.translate.instant("user.calendar.template.exit");
      evt.returnValue = msg;
      return msg;
    }
    window.addEventListener("beforeunload", askConfirmation);
    if (this.plantillas != undefined) {
      this.calendarioid = this.plantillas[0]._id;
      this.getCalendario(this.calendarioid);
    } else {
      this.router.navigate(["/cliente"]);
    }

    // this.owner()
    // this.getSecciones()
  }
  getCalendario(calendarioid: any) {
    this.calendarioService.getByID(calendarioid).subscribe((resp: any) => {
      if (resp.ok) {
        this.id = resp.calendario.categoria._id;
        this.calendario = resp.calendario;

        this.owner();
        this.getSecciones();
      }
    });
  }

  uploadVimeo(id) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`
    );
  }
  DomSanitizer;

  formatDate(date) {
    return moment(date).utc(false).format("YYYY-MM-DD");
  }
  getSecciones() {
    this.categoriaService.categoriaSecciones(this.id).subscribe((resp: any) => {
      if (resp.ok) {
        const { secciones_entrenamientos } = resp;

        let precalentamiento = [];
        let condicional = [];
        let fuerza = [];
        let resistencia = [];
        let velocidad = [];
        let coordinación = [];
        let tecnico_tactico = [];
        let juego_enfrentamientos = [];
        let estiramiento = [];

        secciones_entrenamientos.forEach((seccion) => {
          const item = seccion.seccion.nombre;

          switch (item) {
            case "Precalentamiento":
              precalentamiento.push(seccion);
              break;
            case "Técnico/Tactico":
              tecnico_tactico.push(seccion);
              break;
            case "Capacidad condicional":
              condicional.push(seccion);
              break;
            case "Juego/Enfrentamientos":
              juego_enfrentamientos.push(seccion);
              break;
            case "Estiramiento":
              estiramiento.push(seccion);
              break;
            case "Fuerza":
              fuerza.push(seccion);
              break;
            case "Resistencia":
              resistencia.push(seccion);
              break;
            case "Velocidad":
              velocidad.push(seccion);
              break;
            case "Coordinación":
              coordinación.push(seccion);
              break;
          }
        });
        this.secciones = precalentamiento
          .concat(condicional)
          .concat(fuerza)
          .concat(resistencia)
          .concat(velocidad)
          .concat(coordinación)
          .concat(tecnico_tactico)
          .concat(juego_enfrentamientos)
          .concat(estiramiento);

        console.log(this.secciones);

        this.url = resp.url;

        this.secciones.forEach((seccion) => {
          this.plantilla.push({
            seccion: seccion.seccion._id,
            ejercicios: [],
            cantidad: seccion.bloque.ejercicios,
            minutos: seccion.bloque.minutos,
          });
        });
      }
    });
  }

  owner() {
    this.categoriaService
      .categoriaOwner({
        categoria: this.id,
        usuario: localStorage.getItem("id"),
      })
      .subscribe((resp: any) => {
        if (!resp.ok) {
          this.router.navigate(["/cliente"]);
        } else {
          this.categoria = resp.categoria.categoria;
        }
      });
  }

  success(title, msg) {
    this.dialog.open(SuccessDialogComponent, {
      width: "500px",
      data: { title, msg },
    });
  }

  entrenamientoSelected(seccion, entrenamiento) {
    let ejercicio = this.plantilla.find((objeto) => {
      if (objeto.seccion == seccion) {
        return objeto.ejercicios.includes(entrenamiento);
      }
    });

    if (ejercicio == undefined) {
      return false;
    } else {
      return true;
    }
  }

  seccionCheck(seccion) {
    let seccionFind = this.plantilla.find((objeto) => {
      return objeto.seccion == seccion;
    });

    if (seccionFind.cantidad == seccionFind.ejercicios.length) {
      return true;
    } else {
      return false;
    }
  }

  addToPlantilla(seccion, entrenamiento) {
    this.plantilla = this.plantilla.map((objeto) => {
      if (objeto.seccion == seccion) {
        let exist = objeto.ejercicios.find((ejercicio) => {
          return ejercicio == entrenamiento;
        });

        if (exist == undefined) {
          if (objeto.ejercicios.length < objeto.cantidad) {
            objeto.ejercicios.push(entrenamiento);
          } else {
            this.success(
              this.translate.instant("user.calendar.template.max.title"),
              this.translate.instant("user.calendar.template.max.subtitle")
            );
          }
        } else {
          objeto.ejercicios = objeto.ejercicios.filter((ejercicio) => {
            return ejercicio != entrenamiento;
          });
        }
      }
      return objeto;
    });
  }

  plantilla = [];

  generarPlantilla() {
    let dato = this.dialog.open(PedirDatoStringComponent, {
      width: "350px",
      data: {
        label: this.translate.instant("user.calendar.template.name.title"),
        msg: this.translate.instant("user.calendar.template.name.subtitle"),
      },
    });

    dato.afterClosed().subscribe((dato) => {
      if (dato != false) {
        this.plantillaService
          .nuevaPlantilla({
            usuario: localStorage.getItem("id"),
            plantilla: this.plantilla,
            nombre: dato,
            categoria: this.id,
          })
          .subscribe((resp: any) => {
            if (resp.ok) {
              this.calendario.plantilla = resp.plantilla._id;
              this.plantillasToCharge.push({
                calendarioID: this.calendarioid,
                calendario: this.calendario,
              });
              if (this.plantillas.length > 1) {
                this.plantillas = this.plantillas.filter((plantilla) => {
                  return plantilla._id != this.calendarioid;
                });
                this.ngOnInit();
              } else {
                this.plantillasToCharge.forEach((obj) => {
                  this.calendarioService
                    .setPlantilla(obj.calendarioID, obj.calendario)
                    .subscribe();
                });
                this.router.navigate(["/cliente/calendario"]);
              }
              this.success(
                this.translate.instant("user.calendar.template.success.title"),
                this.translate.instant(
                  "user.calendar.template.success.subtitle"
                )
              );
            } else {
              if (resp.err.code == 10) {
                this.errorDialog(
                  this.translate.instant("user.calendar.template.limit.title"),
                  this.translate.instant(
                    "user.calendar.template.limit.subtitle"
                  )
                );
              } else {
                this.errorDialog(
                  this.translate.instant("user.calendar.template.error.title"),
                  this.translate.instant(
                    "user.calendar.template.error.subtitle"
                  )
                );
              }
            }
          });
      }
    });
  }

  changeBloque(bloque, seccion) {
    this.plantilla = this.plantilla.map((objeto) => {
      if (objeto.seccion == seccion) {
        objeto.cantidad = bloque.ejercicios;
        objeto.minutos = bloque.minutos;
        objeto.ejercicios = [];
      }
      return objeto;
    });
  }

  condicionChange(seccion) {
    this.calendario.condicional = seccion.condicional;

    this.plantilla = this.plantilla.map((objeto) => {
      if (objeto.seccion == seccion.seccion._id) {
        objeto.ejercicios = [];
      }
      return objeto;
    });
  }

  canGenerate() {
    let can = this.plantilla.find((objeto) => {
      return objeto.cantidad != objeto.ejercicios.length;
    });

    return can == undefined ? true : false;
  }

  errorDialog(title, msg) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: { title, msg },
    });
  }
}
