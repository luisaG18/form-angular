import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaRegistroClienteComponent } from './components/pagina-registro-cliente/pagina-registro-cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaginaRegistroClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ejercicio_formulario';
}
