import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Jugador {
  nombre: string;
  bandera: string;
}

export interface Score {
  own: number;
  opponent: number;
}

export interface Partido {
  ganador: boolean;
  ganadorId: string;
  perdedorId: string;
  equipo1: Jugador[];
  scores1: Score[];
  equipo2: Jugador[];
  scores2: Score[];
}

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) {}

  obtenerPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>('assets/partidos.json');
  }
}