import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar MatDialogModule

@Component({
  selector: 'app-modalturno',
  standalone: true, // Indicamos que el componente es standalone
  templateUrl: './modalturno.component.html',
  styleUrls: ['./modalturno.component.css'],
  imports: [CommonModule, FormsModule, MatDialogModule], // Corregir la sintaxis aquí
})
export class ModalTurnoComponent {
  jugadores = ['joaquin', 'lucas', 'maria', 'ana']; // Lista de jugadores
  canchas = [1, 2, 3, 4]; // Lista de canchas
  turnoData = {
    jugador: 'joaquin',
    fechaHora: this.data.selectedDate, // Aquí asignamos la fecha seleccionada
    cancha: 1,
  };

  constructor(
    public dialogRef: MatDialogRef<ModalTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const fecha = new Date(this.data.selectedDate);
    const localFecha = new Date(
      fecha.getTime() - fecha.getTimezoneOffset() * 60000
    );
    this.turnoData.fechaHora = localFecha.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
    console.log(
      'Fecha seleccionada ajustada (sin zona horaria):',
      this.turnoData.fechaHora
    );
  }

  // Método para cerrar el modal
  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.turnoData.jugador && this.turnoData.fechaHora && this.turnoData.cancha) {
      console.log('Turno confirmado:', this.turnoData);
      this.closeDialog();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}