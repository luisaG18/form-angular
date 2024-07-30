import { Component } from '@angular/core';
import { InputFormCustomDirective } from '../../directivas/input-form-custom.directive';
import { BtnprimaryDirective } from '../../directivas/btnprimary.directive';
import { SelectFormCustomDirective } from '../../directivas/select-form-custom.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectPersonalizadoComponent } from '../select-personalizado/select-personalizado.component';

@Component({
  selector: 'app-pagina-registro-cliente',
  standalone: true,
  imports: [InputFormCustomDirective, BtnprimaryDirective, SelectFormCustomDirective, FormsModule, CommonModule, SelectPersonalizadoComponent],
  templateUrl: './pagina-registro-cliente.component.html',
  styleUrl: './pagina-registro-cliente.component.scss',
})
export class PaginaRegistroClienteComponent {
  // Array para guardar los clientes
  arrayClients: any[] = [];
  // Variable para el estado cargando
  isLoading: boolean = false;
  // array para guardar los nombres de los inputs con errores
  arrayErrors: any = [];

  // Objeto del formulario cliente
  clientInfo: any = {
    companyName: { value: '', hasError: false },
    selectTypePerson: { value: 'Persona Fisica', hasError: false },
    clientName: { value: '', hasError: false },
    clientLastname: { value: '', hasError: false },
    phoneNumber: { value: '', hasError: false },
    country: { value: '', hasError: false },
    city: { value: '', hasError: false },
    state: { value: '', hasError: false },
    checkBox: { value: false, hasError: false },
    email: { value: '', hasError: false },
  };

  /**
   * Función que se ejecuta al enviar el formulario
   * @param form Variable del formulario
   */
  submitForm(form: NgForm): void {
    console.log('click');
    // Limpiamos el arreglo de errores
    this.arrayErrors = [];
    // Validamos si el formulario es valido, es decir, no tiene errores
    if (form.valid) {
      // Cambiamos el valor de la variable isLoading
      this.isLoading = true;
      // Creamos un objeto cliente para guardarlo en el array de clientes
      let objectClient: any = {};
      // Recorremos el objeto clientInfo para acceder a sus llaves
      for (const info in this.clientInfo) {
        // Formamos el objeto objectClient con su llave y valor
        objectClient[info] = this.clientInfo[info].value;
        // Limpiamos la prop de hasError
        this.clientInfo[info].hasError = false;
      }
      // Asignamos una clave unica al cliente
      objectClient.identifier = Math.random();
      /**
       * Función setTimeout para simular dos segundos de espera
       */
      setTimeout(() => {
        // Agregamos el objectClient creado a el arreglo de clientes
        this.arrayClients.push(objectClient);
        // Cambiamos el valor de la variable isLoading
        this.isLoading = false;
        // Limpiamos el formulario e inicializamos nuevamente el elemento del selectTypePerson
        form.reset();
        this.clientInfo.selectTypePerson.value = 'Persona Fisica';
      }, 2000);
    } else {
      // Recorremos el objeto de forms.controls para acceder a las llaves
      // que son los nombres de los elementos
      for (const info in form.controls) {
        // Variable para guardar el valor de la propiedad invalid del elemento
        let invalidControls = form.controls[info].invalid;
        // Creamos el objeto de error que se almacenará en el array de errores
        let objectError: any = {};
        // Validamos si el invalid es true
        if (invalidControls == true) {
          // Le asignamos true a la prop de hasError
          this.clientInfo[info].hasError = true;
          // Le asignamos el nombre del input que tiene el error
          objectError.nameInput = info;
          // Le asignamos a la variable typeError los errors del elemento
          let typeError = form.controls[info].errors;
          // Recorremos el objeto de los tipos de errores para obtener sus llaves
          for (let error in typeError) {
            // Le asignamos el nombre de la llave a la propiedad error del objeto
            objectError.error = error;
            // Le agregamos el objeto creado al array de errores
            this.arrayErrors.push(objectError);
          }
        } else {
          this.clientInfo[info].hasError = false;
        }
      }
    }
  }

  /**
   * Función para mostrar el mensaje de error
   * @param error Variable del tipo de error (required, pattern...)
   * @returns
   */
  errorMessage(error: string) {
    // Validamos que tipo de error es
    if (error === 'minlength') {
      return 'el campo es de minimo 10 digitos';
    } else if (error === 'pattern') {
      return 'el correo debe ser valido';
    } else {
      return 'el campo es obligatorio';
    }
  }
}
