import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  colorTheme: string = 'dark';
  urlIconTheme: string = 'moon_icon.png';

  // Método para alternar el tema entre "dark" y "light"
  toggleTheme() {
    this.colorTheme = this.colorTheme === 'dark' ? 'light' : 'dark';
    this.urlIconTheme =
      this.urlIconTheme === 'moon_icon.png' ? 'sol.png' : 'moon_icon.png';

    // Cambia el tema
    document.documentElement.setAttribute('data-bs-theme', this.colorTheme);

    // Cambia el ícono del botón
    const iconElement = document.querySelector(
      'body > app-root > header > app-header > nav > div > div.btn.btn-link.me-5 > img'
    );
    if (iconElement) {
      iconElement.setAttribute('src', `/assets/${this.urlIconTheme}`);
    }
  }

  //metodo de sonido:
}
