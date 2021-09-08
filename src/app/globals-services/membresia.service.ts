import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

constructor(
  private http:HttpClient
) { }

getMembresias(lang){
  return this.http.get(`${environment.URL_API}/membresia/all/${lang}`)
}

getMembresia(id){
  return this.http.get(`${environment.URL_API}/membresia/one/${id}`)
}

owner(body){
  return this.http.post(`${environment.URL_API}/membresia/owner`,body)

}
getMembresiasInfo(lang){
  return this.http.get(`${environment.URL_API}/membresia/infoall/${lang}`)
}

create(body){
  return this.http.post(`${environment.URL_API}/membresia/create`,body)
}

update(id,body){
  return this.http.put(`${environment.URL_API}/membresia/update/${id}`,body)
}
status(id){
  return this.http.put(`${environment.URL_API}/membresia/status/${id}`,null)
}

delete(id){
  return this.http.delete(`${environment.URL_API}/membresia/delete/${id}`)
}

}
