import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanchasService {
  // Cambiar la URL a la nueva estructura
  private apiUrl = 'http://puntodeoro.ddns.net:8080/canchas/todas';

  constructor(private http: HttpClient) {}

  // Método para obtener una cancha por su ID
  getCanchaById(idcancha: string): Observable<any> {
    const url = `${this.apiUrl}/${idcancha}`;
    return this.http.get(url);
  }
}
