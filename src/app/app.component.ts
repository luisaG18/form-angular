import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BtnprimaryDirective } from './directivas/btnprimary.directive';
import { InputFormCustomDirective } from './directivas/input-form-custom.directive';
import { PaginaRegistroClienteComponent } from './components/pagina-registro-cliente/pagina-registro-cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BtnprimaryDirective, InputFormCustomDirective, PaginaRegistroClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ejercicio_formulario';
  // Variable para habilitar o deshabilitar el botón
  isDisabled: boolean = false;
  // Variable para saber cuando está en estado cargando o no
  isLoading: boolean = false;
  // Variable para el texto del error
  hasError: boolean = false;
  // Variable para el texto del error
  placeholder: string = 'Ingrese';

  /**
   * Función click al botón
   */
  clickBtn() {
    console.log('Se hizo click');
    this.hasError = true;
    // this.isLoading = !this.isLoading;
  }
}
