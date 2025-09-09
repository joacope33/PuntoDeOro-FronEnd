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



  //metodo de sonido:
}
