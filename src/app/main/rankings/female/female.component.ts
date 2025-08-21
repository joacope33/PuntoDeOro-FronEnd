import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

@Component({
  selector: 'app-female',
  imports: [CommonModule, NgxPaginationModule, FormsModule], // Incluye FormsModule aquí
  templateUrl: './female.component.html',
  styleUrls: ['./female.component.css'],
  standalone: true,
})
export class FemaleComponent implements OnInit {
  jugadores: any[] = [];
  categorias: number[] = [];
  selectedCategory: number = 0;
  page: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/jugadores.json').subscribe((data) => {
      this.jugadores = data.filter((jugador) => jugador.genero === 'femenino');
      this.categorias = Array.from(
        new Set(this.jugadores.map((jugador) => jugador.categoria))
      );
    });
  }

  filterByCategory() {
    return this.jugadores
      .filter((jugador) => jugador.genero === 'femenino')
      .filter(
        (jugador) =>
          this.selectedCategory == 0 ||
          jugador.categoria == this.selectedCategory
      );
  }
}
