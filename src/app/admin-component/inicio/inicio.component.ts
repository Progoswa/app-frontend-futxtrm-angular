import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EstadisticasService } from '../../globals-services/estadisticas.service';
import { UsuarioService } from '../../globals-services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  usuarios:any = 0;
  plantillas:any = 0;
  categorias:any = 0;
  pagos: any = 0;
  monto: any = 0;

  constructor(
    private estadisticasService:EstadisticasService,
    public userService:UsuarioService
      ) { 
        
      }

  ngOnInit() {
    this.getEstadisticas()
  }
  getEstadisticas() {
    this.getPagos()
    this.getMonto()
    this.getCategorias()
    this.getPlantillas()
    this.getUsuarios()
  }
  getMonto() {
    this.estadisticasService.monto().subscribe((resp:any)=>{
      this.monto = resp.monto
    })
  }


  getPagos() {
    this.estadisticasService.pagos().subscribe((resp:any)=>{
      this.pagos = resp.pagos
    })
  }
  getPlantillas() {
    this.estadisticasService.plantillas().subscribe((resp:any)=>{
      this.plantillas = resp.plantillas
    })
  }
  getUsuarios() {
    this.estadisticasService.usuarios().subscribe((resp:any)=>{
      this.usuarios = resp.usuarios
    })
  }
  getCategorias() {
    this.estadisticasService.categorias().subscribe((resp:any)=>{
      this.categorias = resp.categorias
    })
  }

}
