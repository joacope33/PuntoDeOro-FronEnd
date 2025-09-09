import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TorneoDialogComponent } from './torneo-dialog/torneo-dialog.component';
import {
  ConfigTorneo, defaultConfig,
  opcionesModalidad, opcionesTipoCuadro, opcionesTamCuadro,
  opcionesCategorias, opcionesPagos
} from './ConfigTorneo';
import { NgxPaginationModule } from 'ngx-pagination';
import { TorneoService } from '../../services/torneo.service';

@Component({
  selector: 'app-torneos',
  imports: [CommonModule, FormsModule, MatDialogModule,NgxPaginationModule],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css',
})
export class TorneosComponent {
  config: ConfigTorneo = { ...defaultConfig };
  today: string = new Date().toISOString().split('T')[0]; // fecha actual en 'YYYY-MM-DD'
  torneos: ConfigTorneo[] = []; 


  constructor(private dialog: MatDialog, private torneosService: TorneoService) { }

  abrirModal() {
    const ref = this.dialog.open(TorneoDialogComponent, {
      width: '1200px',
      minWidth: '800px',
      data: {
        config: this.config,
        opcionesModalidad, opcionesTipoCuadro, opcionesTamCuadro,
        opcionesCategorias, opcionesPagos
      },
      maxHeight: '85vh', 
      autoFocus: false

    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.config = result; 
      }
    });
  }

//ejemplo de torneo:
// LISTADO (ejemplo mock)
  // Reemplazá con datos reales del backend
  // ---------------------------

  ngOnInit() {
    this.torneosService.obtenerTorneos().subscribe(data => {
      this.torneos = data;
    });
  }

  // ---------------------------
  //traer categorías únicas de los torneos
    get categories(): string[] {
    const set = new Set<string>();
    this.torneos.forEach(t => t.categorias.forEach(c => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  selectedCategory = '';
  sortOrder = ''; // '', 'date', 'date-desc', 'price', 'price-desc'
  page = 1;
  itemsPerPage = 12;

  //modificar categorias:
  setCategory(c: string) {
    this.selectedCategory = c;
    this.page = 1;
  }
  get filteredTournaments(): ConfigTorneo[] {
    let list = [...this.torneos];

    // filtro por categoría (si está seleccionada)
    if (this.selectedCategory) {
      list = list.filter(t => t.categorias.includes(this.selectedCategory));
    }

    // orden
    switch (this.sortOrder) {
      case 'date': // cercana primero
        list.sort((a, b) => this.toTime(a.fechaInicio) - this.toTime(b.fechaInicio));
        break;
      case 'date-desc': // lejana primero
        list.sort((a, b) => this.toTime(b.fechaInicio) - this.toTime(a.fechaInicio));
        break;
      case 'price': // bajo a alto
        list.sort((a, b) => a.costoInscripcion - b.costoInscripcion);
        break;
      case 'price-desc': // alto a bajo
        list.sort((a, b) => b.costoInscripcion - a.costoInscripcion);
        break;
      default:
        // Por defecto, alfabético por nombre
        list.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    return list;
  }

  private toTime(d: string): number {
    // admite 'YYYY-MM-DD' u otros ISO válidos
    return new Date(d).getTime();
  }

  // Helpers UI
  verTorneo(t: ConfigTorneo) {
    console.log('Ver torneo', t);
    // acá podés navegar o abrir un modal de detalle
  }

  badgeFor(nombre: string, explicitUrl?: string): string {
    if (explicitUrl) return explicitUrl;
    const slug = this.slugify(nombre);
    return `/assets/torneos/${slug}.webp`; // ajustá a tu storage real
  }

  private slugify(s: string): string {
    return s
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}