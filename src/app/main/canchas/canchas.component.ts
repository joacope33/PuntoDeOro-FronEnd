import { Component } from '@angular/core';
import { CanchaComponent } from './cancha/cancha.component';
import { CommonModule } from '@angular/common'; // Importar esto
import { NewCalendarComponent } from '../new-calendar/new-calendar.component';
import { MatDialog } from '@angular/material/dialog'; // Importar MatDialog
import { ChangeDetectorRef } from '@angular/core'; // Agregado para forzar actualización

type EstadoCancha = 'Disponible' | 'Cerrada' | 'Mantenimiento';
interface Cancha {
  numero: number;
  nombre: string;
  estado: EstadoCancha;
}

@Component({
  selector: 'app-canchas',
  standalone: true,
  imports: [CommonModule, CanchaComponent], // Asegúrate de importar CanchaComponent aquí
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.css'],
})
export class CanchasComponent {
  canchas: Cancha[] = [
    { numero: 1, nombre: 'Central', estado: 'Disponible' },
    { numero: 2, nombre: 'Norte', estado: 'Mantenimiento' },
    { numero: 3, nombre: 'Sur', estado: 'Mantenimiento' },
    { numero: 4, nombre: 'Tapia', estado: 'Cerrada' },
    { numero: 5, nombre: 'Belasteguin', estado: 'Cerrada' },
  ];

  constructor(private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  openCalendar(cancha: Cancha) {
    if (cancha.estado != 'Cerrada') {
      const dialogRef = this.dialog.open(NewCalendarComponent, {
        panelClass: 'custom-dialog',
        data: { numero: cancha.numero },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.cdRef.detectChanges();
      });
    }
  }
}
