import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaFreeService {

constructor(
  private http:HttpClient
) { }


getMsg(lang){
  return this.http.get(`${environment.URL_API}/categoriafree/msg/${lang}`)
}

updateMsg(lang,body){
  return this.http.put(`${environment.URL_API}/categoriafree/msg/${lang}`,body)
 
}

getCategoriesFree(lang){
  return this.http.get(`${environment.URL_API}/categoriafree/categories/${lang}`)
}

newCategorieFree(body){
  return this.http.post(`${environment.URL_API}/categoriafree/categorie`,body)

}

userCategorieFree(body){
  return this.http.post(`${environment.URL_API}/categoriafree/user`,body)

}

deleteCategorieFree(id){
  return this.http.delete(`${environment.URL_API}/categoriafree/categorie/${id}`)

}
}
