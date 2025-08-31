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

@Component({
  selector: 'app-torneos',
  imports: [CommonModule, FormsModule, MatDialogModule,NgxPaginationModule],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css',
})
export class TorneosComponent {
  config: ConfigTorneo = { ...defaultConfig };



  constructor(private dialog: MatDialog) { }

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
  torneos: ConfigTorneo[] = [
    {
      nombre: 'Open Primavera',
      sede: 'Club Bragado',
      direccion: 'Av. Siempre Viva 123',
      fechaInicio: '2025-09-12',
      fechaFin: '2025-09-14',
      modalidad: 'Masculino',
      categorias: ['6ta', '7ma'],
      tipoCuadro: 'Eliminacion',
      tamanioCuadro: 16,
      seeding: 'Ranking',
      sets: 3,
      noAd: true,
      superTB: true,
      pelota: 'Head Pro S',
      canchas: 3,
      franjasHorarias: [{ desde: '09:00', hasta: '23:00' }],
      duracionPartidoMin: 75,
      descansoMin: 30,
      costoInscripcion: 8000,
      pagos: ['MercadoPago', 'Efectivo'],
      fechaCierreInscripcion: '2025-09-10',
      puntos: { victoria: 2, derrota: 0, bonusFinal: 3 },
      premios: 'Trofeos + Vales',
      reglamentoUrl: '',
      canalAvisos: 'WhatsApp',
      resultadosEnVivo: true,
      fiscalizado: true,
      arbitroGeneral: { nombre: 'Juan', apellido: 'Pérez' },
      asistentesMesa: [{ nombre: 'Ana', apellido: 'López' }],
      status: 'Abierto'
    },
    {
      nombre: 'Copa Centro',
      sede: 'La Coope',
      fechaInicio: '2025-10-05',
      fechaFin: '2025-10-06',
      modalidad: 'Mixto',
      categorias: ['3ra', '4ta'],
      tipoCuadro: 'Fase Grupos+Eliminacion',
      tamanioCuadro: 16,
      seeding: 'Aleatorio',
      sets: 3,
      noAd: true,
      superTB: true,
      canchas: 4,
      franjasHorarias: [{ desde: '09:00', hasta: '22:00' }],
      duracionPartidoMin: 70,
      descansoMin: 25,
      costoInscripcion: 9000,
      pagos: ['Transferencia', 'Efectivo'],
      fechaCierreInscripcion: '2025-10-03',
      puntos: { victoria: 2, derrota: 0, bonusFinal: 3 },
      canalAvisos: 'Web',
      resultadosEnVivo: true,
      arbitroGeneral: { nombre: 'Carla', apellido: 'Suárez' },
      asistentesMesa: [{ nombre: 'Leo', apellido: 'Martínez' }],
      status: 'Abierto'
    },
    {
      nombre: 'Master Local',
      sede: 'Bragado Padel',
      fechaInicio: '2025-09-28',
      fechaFin: '2025-09-29',
      modalidad: 'Femenino',
      categorias: ['5ta'],
      tipoCuadro: 'Eliminacion',
      tamanioCuadro: 8,
      seeding: 'Manual',
      sets: 3,
      noAd: true,
      superTB: true,
      canchas: 2,
      franjasHorarias: [{ desde: '10:00', hasta: '22:00' }],
      duracionPartidoMin: 80,
      descansoMin: 30,
      costoInscripcion: 8500,
      pagos: ['Efectivo'],
      fechaCierreInscripcion: '2025-09-26',
      puntos: { victoria: 2, derrota: 0, bonusFinal: 3 },
      canalAvisos: 'WhatsApp',
      resultadosEnVivo: false,
      arbitroGeneral: { nombre: 'Rocío', apellido: 'Guzmán' },
      asistentesMesa: [],
      status: 'Abierto'
    }
  ];

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