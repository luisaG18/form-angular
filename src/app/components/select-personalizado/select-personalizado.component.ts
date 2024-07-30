import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

/* interface Option {
  value: string;
  text: string;
} */

@Component({
  selector: 'app-select-personalizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-personalizado.component.html',
  styleUrl: './select-personalizado.component.scss',
})
export class SelectPersonalizadoComponent implements OnInit {
  // Propiedad de entrdada del array con las diferentes opciones
  @Input() arrayOptions: string[] = [];
  // Propiedad de entrdada con la opción seleccionada
  @Input() selectedOption: string = '';
  @Input() disabled: boolean = false;
  // Evento que se emite cuando hay un cambio en la selección
  @Output() selectedOptionChange: any = new EventEmitter<string>();

  // Variable para el estado de las opciones
  optionsVisible: boolean = false;
  handleHide: (event: Event) => void;

  constructor() {
    this.handleHide = this.hideOptions.bind(this);
  }

  onSelectClick(event: Event): void {
    this.changeOptionsVisible();
    // Prevenir que el dropdown se cierre inmediatamente
    event.stopPropagation();
    if (this.optionsVisible === true) {
      this.addListeners();
    } else {
      this.removeListeners();
    }
  }
  /**
   * Función para modificar la visibilidad de las opciones
   */
  changeOptionsVisible() {
    this.optionsVisible = !this.optionsVisible;
  }

  hideOptions() {
    this.optionsVisible = false;
    this.removeListeners();
    console.log('hideOptions', this.optionsVisible);
  }

  addListeners() {
    document.addEventListener('click', this.handleHide);
  }

  removeListeners() {
    document.removeEventListener('click', this.handleHide);
    console.log('remove');
  }

  onOptionClick(option: string) {
    console.log('opcion', option);
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

  /**
   * Función que se ejecutará cuando haya un cambio en el select
   * @param event Variable del evento que emite el select
   */
  /* onSelectChange(event: Event) {
    // Le asignamos a la variable selectElement la referencia del elemento que emitio el evento
    const selectElement = event.target as HTMLSelectElement;
    // Emitimos ese nuevo valor
    this.selectionChange.emit(selectElement.value);
  } */
  /* ngOnInit() {
    // Le asignamos al select el valor seleccionado
    this.selectControl.setValue(this.selectedOption);
    // Nos suscribimos al observable valueChange para emitir un evento cada que cambie
    this.selectControl.valueChanges.subscribe((value) => {
      // Emitimos el nuevo valor seleccionado
      this.selectionChange.emit(value);
    }); */
}
