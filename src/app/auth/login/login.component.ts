import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    // Personalización de la validación de Bootstrap
    (() => {
      'use strict';

      // Seleccionar todos los formularios que tengan la clase 'needs-validation'
      const forms = document.querySelectorAll('.needs-validation');

      // Iterar sobre ellos y prevenir el envío si son inválidos
      Array.from(forms).forEach((form: Element) => {
        // Verificamos si el elemento es un formulario HTMLFormElement
        if (form instanceof HTMLFormElement) {
          form.addEventListener(
            'submit',
            (event: Event) => {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }

              form.classList.add('was-validated');
            },
            false
          );
        }
      });
    })();
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Form Submitted', {
        email: this.email,
        password: this.password,
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
