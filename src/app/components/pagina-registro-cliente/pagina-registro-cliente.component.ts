import { Component } from '@angular/core';
import { InputFormCustomDirective } from '../../directivas/input-form-custom.directive';
import { BtnprimaryDirective } from '../../directivas/btnprimary.directive';
import { SelectFormCustomDirective } from '../../directivas/select-form-custom.directive';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pagina-registro-cliente',
  standalone: true,
  imports: [InputFormCustomDirective, BtnprimaryDirective, SelectFormCustomDirective, FormsModule],
  templateUrl: './pagina-registro-cliente.component.html',
  styleUrl: './pagina-registro-cliente.component.scss',
})
export class PaginaRegistroClienteComponent {
  clientInfo: any = {
    companyName: { value: '', hasError: false },
    selectTypePerson: 'physicalPerson',
    clientName: { value: '', hasError: false },
    clientLastname: { value: '', hasError: false },
    phoneNumber: { value: '', hasError: false },
    country: { value: '', hasError: false },
    city: { value: '', hasError: false },
    state: { value: '', hasError: false },
    checkBox: { value: 'false', hasError: false },
    email: { value: '', hasError: false },
  };

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form data:', this.clientInfo);
    } else {
      let array = [];
      for (const info in form.controls) {
        let invalidControls = form.controls[info].invalid;
        if (invalidControls == true) {
          this.clientInfo[info].hasError = true;
          array.push(info);
        }
      }
      console.log(array);
      if (array.includes('companyName')) {
        console.log('true');
      }
    }
  }
}
