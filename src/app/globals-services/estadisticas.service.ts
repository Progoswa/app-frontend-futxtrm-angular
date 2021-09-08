import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

constructor(
  private http:HttpClient
) { }


pagos(){
  return this.http.get(`${environment.URL_API}/estadisticas/pagos`)
}
monto(){
  return this.http.get(`${environment.URL_API}/estadisticas/monto`)
}

plantillas(){
  return this.http.get(`${environment.URL_API}/estadisticas/plantillas`)
}

usuarios(){
  return this.http.get(`${environment.URL_API}/estadisticas/usuarios`)
}

categorias(){
  return this.http.get(`${environment.URL_API}/estadisticas/categorias`)
}

}
