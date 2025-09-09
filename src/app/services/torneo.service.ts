import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConfigTorneo} from '../main/torneos/ConfigTorneo';
// Ajustá la URL base según tu entorno
const API = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class TorneoService {

constructor(private http: HttpClient) {}

  subirLogo(torneoId: string, file: File): Observable<{ ok: boolean; url: string }> {
    const formData = new FormData();
    formData.append('logo', file); // <-- el nombre "logo" debe match con upload.single('logo')

    return this.http.post<{ ok: boolean; url: string }>(`${API}/torneos/${torneoId}/logo`, formData);
  }

  borrarLogo(torneoId: string, pathToDelete: string) {
    return this.http.delete(`${API}/torneos/${torneoId}/logo`, {
      body: { pathToDelete }
    });
  }

  obtenerTorneos(): Observable<ConfigTorneo[]> {
      return this.http.get<ConfigTorneo[]>('assets/torneos/torneos.json');
    }
}