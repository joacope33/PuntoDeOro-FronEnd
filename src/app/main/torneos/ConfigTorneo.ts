// ConfigTorneo.ts
export type Modalidad = 'Masculino' | 'Femenino' | 'Mixto';
export type TipoCuadro = 'Eliminacion' | 'Fase de Grupos' | 'Fase Grupos+Eliminacion';
export type TamCuadro = 4 | 8 | 16 | 32;

export interface ConfigTorneo {
  nombre: string;
  sede: string;
  direccion?: string;
  fechaInicio: string;
  fechaFin: string;

  modalidad: Modalidad;
  categorias: string[];
  tipoCuadro: TipoCuadro;
  tamanioCuadro: TamCuadro;

  seeding: 'Ranking' | 'Manual' | 'Aleatorio';
  sets: 1 | 3;
  noAd: boolean;
  superTB: boolean;
  pelota?: string;

  canchas: number;
  franjasHorarias: { desde: string; hasta: string }[];
  duracionPartidoMin: number;
  descansoMin: number;

  costoInscripcion: number;
  pagos: ('Efectivo' | 'Transferencia' | 'MercadoPago' | 'Otro')[];
  fechaCierreInscripcion: string;

  puntos: { victoria: number; derrota: number; bonusFinal: number };
  premios?: string;

  reglamentoUrl?: string;
  canalAvisos: 'WhatsApp' | 'Email' | 'Web';
  resultadosEnVivo: boolean;
  fiscalizado?: boolean;
  arbitroGeneral: { nombre: string; apellido: string };
  asistentesMesa: {nombre:string, apellido:string}[];
  status?: 'Borrador' | 'Abierto' | 'Cerrado' | 'En Curso' | 'Finalizado';
}

// Opciones exportadas para usar en los <select>
export const opcionesModalidad: Modalidad[] = ['Masculino', 'Femenino', 'Mixto'];
export const opcionesTipoCuadro: TipoCuadro[] = ['Eliminacion', 'Fase de Grupos', 'Fase Grupos+Eliminacion'];
export const opcionesTamCuadro: TamCuadro[] = [4, 8, 16, 32];
export const opcionesCategorias = ['1ra', '2da', '3ra', '4ta', '5ta', '6ta', '7ma', '8va'];
export const opcionesPagos = ['Efectivo', 'Transferencia', 'MercadoPago', 'Otro'] as const;
export const opcionStatus = ['Borrador', 'Abierto', 'Cerrado', 'En Curso', 'Finalizado'] as const;
// Default reutilizable
export const defaultConfig: ConfigTorneo = {
  nombre: '',
  sede: '',
  direccion: '',
  fechaInicio: '',
  fechaFin: '',
  modalidad: 'Masculino',
  categorias: ['3ra', '4ta'],
  tipoCuadro: 'Eliminacion',
  tamanioCuadro: 16,
  seeding: 'Ranking',
  sets: 3,
  noAd: true,
  superTB: true,
  pelota: '',
  canchas: 3,
  franjasHorarias: [{ desde: '09:00', hasta: '23:00' }],
  duracionPartidoMin: 75,
  descansoMin: 30,
  costoInscripcion: 0,
  pagos: ['MercadoPago', 'Efectivo'],
  fechaCierreInscripcion: '',
  puntos: { victoria: 2, derrota: 0, bonusFinal: 3 },
  premios: '',
  reglamentoUrl: '',
  canalAvisos: 'WhatsApp',
  resultadosEnVivo: true,
  arbitroGeneral: {nombre:'', apellido:''},
  asistentesMesa: [{nombre:'', apellido:''}],
  status: 'Abierto',
};
