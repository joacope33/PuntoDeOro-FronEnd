import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalTurnoComponent } from './modalturno/modalturno.component';

@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class NewCalendarComponent implements OnInit {
  @Input() numero: number = 0; // Variable para recibir el número como entrada
  isModalOpen = false; // Variable para manejar el estado del modal
  //fecha actual
  currentDate: Date = new Date();
  //eventos
  events = [
    {
      date: '2025-03-17',
      time: '14:00',
      title: 'Turno',
      tipo: 'Normal',
    },
    { date: '2025-03-18', time: '16:00', title: 'Evento 2', tipo: 'Fijo' },
    { date: '2025-03-20', time: '18:00', title: 'Evento 3', tipo: 'Torneo' },
  ];
  //displayweek?
  displayedWeek: string = '';
  //cuadricula
  calendarGrid: any[] = [];

  baseHour: number = 12; // Hora base (12 PM)
  stepMinutes: number = 60; // Paso en minutos (por ejemplo, cada 30 minutos)

  //iniciamos con la fecha actual
  ngOnInit(): void {
    this.displayWeek(this.currentDate);
  }

  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  //comienzo de semana, trae el primer lunes de la semana
  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1); // Lunes como primer día
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0); // Establecer a las 00:00 horas
    return startOfWeek;
  }
  //metodo para armar la semana, toma como parámetro la fecha actual
  displayWeek(date: Date) {
    this.calendarGrid = []; // Limpiar la cuadrícula
    const startOfWeek = this.getStartOfWeek(date);

    // Crear una nueva instancia de Date para el final de la semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    this.displayedWeek = `${startOfWeek.toLocaleString('default', {
      weekday: 'short',
    })}, 
      ${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - 
      ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;

    // Mostrar los días de la semana (de lunes a domingo)
    let firstColumn = ['Hora']; // Primer columna para las horas

    // Obtener las fechas de la semana (de lunes a domingo)
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i); // Aumentar el día de la semana
      const dayFormatted = `0${day.getDate()}`.slice(-2); // Añadir 0 a los días menores a 10
      const monthFormatted = `0${day.getMonth() + 1}`.slice(-2); // Añadir 0 a los meses menores a 10
      firstColumn.push(`${dayFormatted}/${monthFormatted}`); // Formato DD/MM
    }

    // Agregar encabezado de días
    this.calendarGrid.push({ type: 'header', days: firstColumn });

    // Mostrar horas en la primera columna
    for (let i = 12; i < 24; i++) {
      const hour = i; // La hora actual del bucle
      const hourRow = [`${hour}:00`]; // Primera celda con la hora

      // Para cada día de la semana, buscar eventos en esa hora específica
      for (let j = 0; j < 7; j++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + j);
        const formattedDate = `${currentDay.getFullYear()}-${(
          currentDay.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${currentDay
          .getDate()
          .toString()
          .padStart(2, '0')}`;

        // Filtrar eventos para ese día y esa hora exacta
        const eventsForHour = this.events
          .filter(
            (event) =>
              event.date === formattedDate && event.time === `${hour}:00`
          )
          .map((event) => {
            // Obtener la clase del evento basada en el tipo
            const eventClass = this.getEventClass(event.tipo);
            // Devuelve un objeto con título y clase
            return { title: event.title, class: eventClass };
          });

        // Construir un string con los títulos de los eventos y sus clases
        const eventDetails = eventsForHour
          .map(
            (event) =>
              `<div class="h-100 w-100 ${event.class}" (click)="openModal(event)">${event.title}</div>`
          )
          .join(', ');

        hourRow.push(eventDetails || ''); // Si no hay eventos, mostrar "-"
      }

      // Agregar fila a la cuadrícula
      this.calendarGrid.push({
        type: 'hour',
        hour: `${hour}:00`,
        events: hourRow,
      });
    }
  }

  prevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.displayWeek(this.currentDate);
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.displayWeek(this.currentDate);
  }

  addEvent(day: number) {
    const startOfWeek = this.getStartOfWeek(this.currentDate); // Obtener el lunes de la semana
    const selectedDate = new Date(startOfWeek);
    selectedDate.setDate(startOfWeek.getDate() + day - 1); // Ajustar el día seleccionado

    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    const eventTitle = prompt(`Añadir evento para el día ${formattedDate}:`);
    if (!eventTitle) return;

    const eventTime = prompt(
      `Ingrese la hora del evento (formato HH:MM, 24h):`
    );
    if (!eventTime || !/^\d{2}:\d{2}$/.test(eventTime)) {
      alert('Formato de hora incorrecto. Use HH:MM (Ej: 14:00)');
      return;
    }

    const eventType = prompt(
      `Ingrese el tipo de evento (Normal, Fijo, Torneo):`
    );
    if (!eventType) return;

    this.events.push({
      date: formattedDate,
      time: eventTime,
      title: eventTitle,
      tipo: eventType,
    });
    console.log('Eventos después de agregar:', this.events);
    this.displayWeek(this.currentDate); // Redibujar la cuadrícula con el nuevo evento
  }

  getEventClass(tipo: string): string {
    console.log(tipo); // Verifica el valor de tipo aquí
    if (tipo === 'Normal') {
      return 'g-blue';
    } else if (tipo === 'Fijo') {
      return 'g-green';
    } else if (tipo === 'Torneo') {
      return 'gorange';
    } else {
      return 'bg-danger';
    }
  }
}
