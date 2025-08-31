import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigTorneo, defaultConfig, opcionesCategorias, opcionesModalidad, opcionesPagos, opcionesTamCuadro, opcionesTipoCuadro } from '../ConfigTorneo';



type DataIn = {
  config: ConfigTorneo,
  opcionesModalidad: string[],
  opcionesTipoCuadro: string[],
  opcionesTamCuadro: (8|16|32)[],
  opcionesCategorias: string[],
  opcionesPagos: readonly string[],
};
@Component({
  selector: 'app-torneo-dialog',
 imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './torneo-dialog.component.html',
  styleUrl: './torneo-dialog.component.css'
})
export class TorneoDialogComponent {
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

  constructor(
    private ref: MatDialogRef<TorneoDialogComponent, ConfigTorneo>,
    @Inject(MAT_DIALOG_DATA) public data: DataIn
  ) {
    // clono para editar sin pisar el original hasta guardar
    this.config = structuredClone(data.config);
  }

  cancel() { this.ref.close(); }
  ok() { this.ref.close(this.config); }

  // Reuso directamente las opciones exportadas
  opcionesModalidad = opcionesModalidad;
  opcionesTipoCuadro = opcionesTipoCuadro;
  opcionesTamCuadro = opcionesTamCuadro;
  opcionesCategorias = opcionesCategorias;
  opcionesPagos = opcionesPagos;
  defaultConfig = defaultConfig;

  // Estado del formulario: copio el default para no mutar el export original
  config: ConfigTorneo = { ...defaultConfig, franjasHorarias: [...defaultConfig.franjasHorarias] };

  guardar = (cfg: ConfigTorneo) => {
    console.log('Guardar torneo:', cfg);
    // TODO: llamar servicio / persistir
  };

  agregarFranja = () => {
    this.config.franjasHorarias.push({ desde: '09:00', hasta: '23:00' });
  };

  quitarFranja = (i: number) => {
    this.config.franjasHorarias.splice(i, 1);
  };

  agregarFiscal = () => {
  if (!this.config.asistentesMesa) {
    this.config.asistentesMesa = [];
  }
  this.config.asistentesMesa.push({ nombre: '', apellido: '' });
};

quitarFiscal = (i: number) => {
  if (this.config.asistentesMesa) {
    this.config.asistentesMesa.splice(i, 1);
  }
};


  reset = () => {
    this.config = { ...defaultConfig, franjasHorarias: [...defaultConfig.franjasHorarias] };
  };
}
