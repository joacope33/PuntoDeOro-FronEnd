import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type EstadoCancha = 'Disponible' | 'ocupada' | 'Mantenimiento';

@Component({
  selector: 'app-cancha',
  standalone: true,
  templateUrl: './cancha.component.html',
  styleUrls: ['./cancha.component.css'],
  imports: [CommonModule],
})
export class CanchaComponent {
  @Input() numero!: number;
  @Input() nombre!: string;
  @Input() estado!: string;
}
