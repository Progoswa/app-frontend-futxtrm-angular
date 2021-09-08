import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

constructor(
  private http:HttpClient
) { }

categorias(formData){
  return this.http.post(`${environment.URL_API}/carga/categorias`,formData)
}

secciones(formData){
  return this.http.post(`${environment.URL_API}/carga/secciones`,formData)

}
entrenamientos(formData){
  return this.http.post(`${environment.URL_API}/carga/entrenamientos`,formData)

}

}
