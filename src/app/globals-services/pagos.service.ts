import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  constructor(private http: HttpClient) {}

  GratisGuardar(body: any) {
    return this.http.post(`${environment.URL_API}/pagos/gratis`, body);
  }

  paymentWithPaypal(body) {
    return this.http.post(`${environment.URL_API}/pagos/paypal`, body);
  }

  membresiaPaymentWithPaypal(body) {
    return this.http.post(
      `${environment.URL_API}/pagos/membership/paypal`,
      body
    );
  }

  paymentWithStripe(body) {
    return this.http.post(`${environment.URL_API}/pagos/stripe`, body);
  }

  membershipPaymentWithStripe(body) {
    return this.http.post(
      `${environment.URL_API}/pagos/membership/stripe`,
      body
    );
  }

  paymentOffline(body) {
    return this.http.post(`${environment.URL_API}/pagos/offline`, body);
  }

  aceptarOffline(id, admin) {
    return this.http.put(
      `${environment.URL_API}/pagos/aceptar/${id}/${admin}`,
      {}
    );
  }
  rechazarOffline(id, admin) {
    return this.http.put(
      `${environment.URL_API}/pagos/rechazar/${id}/${admin}`,
      {}
    );
  }

  getAll() {
    return this.http.get(`${environment.URL_API}/pagos/pagos`);
  }

  getPago(id) {
    return this.http.get(`${environment.URL_API}/pagos/pago/${id}`);
  }
  getPagoM(id) {
    return this.http.get(`${environment.URL_API}/pagos/pagom/${id}`);
  }

  delete(id, admin) {
    return this.http.delete(`${environment.URL_API}/pagos/pago/${id}/${admin}`);
  }
  deleteM(id, admin) {
    return this.http.delete(
      `${environment.URL_API}/pagos/pagom/${id}/${admin}`
    );
  }
}
