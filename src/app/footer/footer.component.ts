import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Getter para obtener el año actual
  get anioActual(): number {
    const date = new Date();
    return date.getFullYear();
  }
}

