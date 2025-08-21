import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-male',
  imports: [CommonModule, NgxPaginationModule,FormsModule],
  templateUrl: './male.component.html',
  styleUrl: './male.component.css',
  standalone: true,
})
export class MaleComponent implements OnInit {
  jugadores: any[] = [];
  categorias: number[] = [];
  selectedCategory: number = 0;
  page: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/jugadores.json').subscribe((data) => {
      this.jugadores = data.filter((jugador) => jugador.genero === 'masculino');
      this.categorias = Array.from(
        new Set(this.jugadores.map((jugador) => jugador.categoria))
      );
    });
  }

  filterByCategory() {
    return this.jugadores
      .filter((jugador) => jugador.genero === 'masculino')
      .filter(
        (jugador) =>
          this.selectedCategory == 0 ||
          jugador.categoria == this.selectedCategory
      );
  }
}
