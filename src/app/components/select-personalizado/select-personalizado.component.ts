import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-personalizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-personalizado.component.html',
  styleUrl: './select-personalizado.component.scss',
})
export class SelectPersonalizadoComponent implements OnInit {
  // Propiedad de entrada del array con las diferentes opciones
  @Input() arrayOptions: string[] = [];
  // Propiedad de entrada con la opción seleccionada
  @Input() selectedOption: string = '';
  // Propiedad de entrada para deshabilitar el select
  @Input() disabled: boolean = false;
  // Evento que se emite cuando hay un cambio en la selección
  @Output() selectedOptionChange: any = new EventEmitter<string>();

  // Variable para el estado de las opciones
  optionsVisible: boolean = false;
  // Función para guardar la referencia de hideOptions
  handleHide: (event: Event) => void;

  constructor() {
    // Inicialización de la variable handleHide
    this.handleHide = this.hideOptions.bind(this);
  }

  /**
   * Función que se ejecuta al hacer click en el select
   * @param event Parametro evento del evento que recibe
   */
  onSelectClick(event: Event): void {
    // Validamos si es disabled
    if (!this.disabled) {
      // Ejecutamos la función que cambia el estado de las opciones
      this.changeOptionsVisible();
      // Prevenimos que el dropdown se cierre inmediatamente
      event.stopPropagation();
      // Validamos si las opciones son visibles
      if (this.optionsVisible === true) {
        // Llamamos la función que agrega el evento click
        this.addListeners();
      } else {
        // Removemos ese evento click
        this.removeListeners();
      }
    }
  }
  /**
   * Función para modificar la visibilidad de las opciones
   */
  changeOptionsVisible() {
    // Cambiamos el valor de optionsVisible
    this.optionsVisible = !this.optionsVisible;
  }

  /**
   * Función para ocultar las opciones desde cualquier parte de la pantalla
   */
  hideOptions() {
    // Cambiamos el valor de optionsVisible
    this.optionsVisible = false;
    // Llamamos la función que remueve el evento click
    this.removeListeners();
  }

  /**
   * Función para agregar el evento click
   */
  addListeners() {
    document.addEventListener('click', this.handleHide);
  }

  /**
   * Función que remueve el evento click
   */
  removeListeners() {
    document.removeEventListener('click', this.handleHide);
  }

  /**
   * Función para emitir la nueva opción cuando se cambia
   * @param option Parametro de la opcion que recibe
   */
  onOptionClick(option: string) {
    // Emitimos el nuevo valor
    this.selectedOptionChange.emit(option);
  }

  /**
   * Función que se ejecuta al inicializarse el componente
   */
  ngOnInit() {
    // Validamos si hay una opción para el select por defecto
    if (this.selectedOption) {
      // Emitimos el valor seleccionado
      this.selectedOptionChange.emit(this.selectedOption);
    }
  }
}
