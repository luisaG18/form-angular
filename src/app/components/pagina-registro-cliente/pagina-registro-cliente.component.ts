import { Component } from '@angular/core';
import { InputFormCustomDirective } from '../../directivas/input-form-custom.directive';
import { BtnprimaryDirective } from '../../directivas/btnprimary.directive';
import { SelectFormCustomDirective } from '../../directivas/select-form-custom.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-registro-cliente',
  standalone: true,
  imports: [InputFormCustomDirective, BtnprimaryDirective, SelectFormCustomDirective, FormsModule, CommonModule],
  templateUrl: './pagina-registro-cliente.component.html',
  styleUrl: './pagina-registro-cliente.component.scss',
})
export class PaginaRegistroClienteComponent {
  // Array para guardar los clientes
  arrayClients: any[] = [];
  // Variable para el estado cargando
  isLoading: boolean = false;
  // array para guardar los nombre de los inputs con errores
  arrayInputErrors: any = [];

  // Objeto del formulario cliente
  clientInfo: any = {
    companyName: { value: '', hasError: false },
    selectTypePerson: { value: 'Persona fisica', hasError: false },
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
    // Validamos si el formulario es valido, es decir, no tiene errores
    this.arrayInputErrors = [];
    if (form.valid) {
      this.isLoading = true;
      let objectClient: any = {};
      for (const info in this.clientInfo) {
        objectClient[info] = this.clientInfo[info].value;
        this.clientInfo[info].hasError = false;
      }
      objectClient.identifier = Math.random();
      setTimeout(() => {
        this.arrayClients.push(objectClient);
        this.isLoading = false;
        form.reset();
        this.clientInfo.selectTypePerson.value = 'Persona fisica';
      }, 2000);
    } else {
      for (const info in form.controls) {
        let invalidControls = form.controls[info].invalid;
        let objectError: any = {};
        if (invalidControls == true) {
          this.clientInfo[info].hasError = true;
          objectError.nameInput = info;
          let typeError = form.controls[info].errors;
          for (let error in typeError) {
            objectError.errors = error;
            this.arrayInputErrors.push(objectError);
          }
        }
      }
    }
  }
}
