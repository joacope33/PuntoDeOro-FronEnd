import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartidosService } from '../../../services/partido.service';

type RoundName = 'R32'|'R16'|'R8'|'Cuartos'|'Semifinal'|'Final';

interface Player {
  nombre: string;
  bandera: string;
}

interface Score {
  own: number;
  opponent: number;
}
interface Ronda {
  nombre: RoundName | string;
  partidos: Match[];
}

interface Match {
  // nuevos campos para organizar por torneo
  tournamentId?: string;     // ej: "T2025-01"
  round?: RoundName;         // ej: "R32"
  order?: number;            // orden dentro de la ronda (0..n-1)

  ganador: boolean;
  ganadorId: string;
  equipo1: Player[];
  scores1: Score[];
  perdedorId: string;
  equipo2: Player[];
  scores2: Score[];
  highlighted?: boolean;
    highlightLine?: boolean;

}

@Component({
  selector: 'app-grilla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  partidos: Match[] = [];
  rondas: Ronda[][] = [];

  // id del torneo seleccionado (si hoy tenés uno solo, queda fijo)
  selectedTournamentId = 'T2025-01';

  private searchName = '';
  private searchNameNorm = '';

  constructor(private partidosService: PartidosService) { }

  ngOnInit() {
    this.partidosService.obtenerPartidos().subscribe(data => {
      // 1) migramos: agregamos tournamentId, round y order a tu arreglo plano
      const stamped = this.stampRoundAndOrder(
        (data || []).map(p => ({ ...p, highlighted: false })),
        this.selectedTournamentId
      );

      // 2) filtramos por torneo y construimos las rondas a partir de round+order
      const byTournament = stamped.filter(p => p.tournamentId === this.selectedTournamentId);
      this.partidos = byTournament;
      this.rondas = this.buildRondas(byTournament);
    });
  }

  // ===== helpers de migración / agrupado =====
  private stampRoundAndOrder(partidos: Match[], tournamentId: string): Match[] {
    // Si ya vienen timbrados, no tocamos nada
    const alreadyStamped = partidos.every(p => p.tournamentId && p.round !== undefined && p.order !== undefined);
    if (alreadyStamped) return partidos as Match[];

    // Determinamos bloques de rondas en función de la cantidad total
    // Intentamos asignar de mayor a menor: R64, R32, R16, R8, R4, R2
    const blocks: { round: RoundName; size: number }[] = [];
    let n = partidos.length;

    // función para empujar un bloque si cabe
    const pushBlock = (round: RoundName, size: number) => {
      if (n <= 0) return;
      const take = Math.min(size, n);
      blocks.push({ round, size: take });
      n -= take;
    };

    // Heurística común para cuadros completos o parciales
    // Ajustá si tu backend varía, pero cubre los casos típicos

    if (n >= 32) pushBlock('R32', 32);
    if (n >= 16) pushBlock('R16', 16);
    if (n >= 8)  pushBlock('R8', 8);
    if (n >= 4)  pushBlock('Cuartos', 4);
    if (n >= 2)  pushBlock('Semifinal', 2);

    // Si sobran partidos no redondos, van en la ronda "más chica" restante
    // (esto casi no debería pasar, pero lo contemplamos)
    if (n > 0) pushBlock('Final', 1);

    // Asignamos round y order por bloques, en orden
    let i = 0;
    const out: Match[] = [];
    for (const b of blocks) {
      for (let k = 0; k < b.size && i < partidos.length; k++, i++) {
        out.push({
          ...partidos[i],
          tournamentId,
          round: b.round,
          order: k
        });
      }
    }
    return out;
  }

  private buildRondas(partidos: Match[]): Ronda[][] {
    const byRound: Record<string, Match[]> = {};
    for (const m of partidos) {
      const r = m.round || 'R32';
      if (!byRound[r]) byRound[r] = [];
      byRound[r].push(m);
    }
    // ordenamos cada ronda por su "order"
    Object.values(byRound).forEach(arr => arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

    // armamos la grilla en orden de rondas habitual
    const order: RoundName[] = [ 'R32', 'R16', 'R8', 'Cuartos', 'Semifinal', 'Final'];
    const fila: Ronda[] = order
      .filter(r => byRound[r]?.length)
      .map(r => ({ nombre: r, partidos: byRound[r] }));

    return [fila];
  }

  // ===== utilitarios existentes =====
  getWinnerClass(ganador: boolean): string {
    return ganador ? 'winner' : 'loser';
  }

  getHighlightClass(highlighted: boolean | undefined): string {
    return highlighted ? 'highlighted' : '';
  }

  private norm(s: string) {
    return (s || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  }

  private clearHighlights() {
    this.rondas.forEach(fila =>
      fila.forEach(ronda =>
        ronda.partidos.forEach(p => {p.highlighted = false;
          p.highlightLine = false;  // limpiar la línea dorada
        })
      )
    );
  }

  appearsInEquipo1(p: Match): boolean {
    if (!this.searchNameNorm) return false;
    return p.equipo1?.some(j => this.norm(j.nombre) === this.searchNameNorm) ?? false;
  }

  appearsInEquipo2(p: Match): boolean {
    if (!this.searchNameNorm) return false;
    return p.equipo2?.some(j => this.norm(j.nombre) === this.searchNameNorm) ?? false;
  }

  // pinta todos los partidos donde aparezca ese nombre (gane o pierda)
highlightByName(playerName: string) {
  this.searchName = playerName;
  this.searchNameNorm = this.norm(playerName);
  this.clearHighlights();

  this.rondas.forEach(fila =>
    fila.forEach(ronda =>
      ronda.partidos.forEach(p => {
        const aparece = this.appearsInEquipo1(p) || this.appearsInEquipo2(p);

        if (aparece) {
          p.highlighted = true;
          p.highlightLine = true;  // marcar la línea dorada
        }
      })
    )
  );
}
}
