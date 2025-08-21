import { Injectable } from '@angular/core';
import { HttpCliente } from '@angular/common/http'; //llamo al modulo para hacer solicitudes post,put,get
import { Observable } from 'rxjs'; //libreria para tratamiento de datos

@Injectable({
  providedIn: 'root',
})
export class JugadoresService {
  private jsonUrl = 'assets/jugadores.json';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
