import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appInputFormCustom]',
  standalone: true,
})
export class InputFormCustomDirective implements OnInit, OnChanges {
  // Variable para el estado focus
  private isFocus: boolean = false;
  // Variable del texto del error
  @Input() hasError: boolean = false;
  // Variable para el estado disabled
  @Input() disabled: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  // Elemento nativo del input
  private nativeElement = this.element.nativeElement;

  /**
   * Función para cambiar el color del borde de un input
   */
  private changeBorderColor(color: string) {
    this.renderer.setStyle(this.nativeElement, 'border', `1px solid ${color}`);
  }

  /**
   * Función que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    // Estilos del input
    this.renderer.setStyle(this.nativeElement, 'width', '190px');
    this.renderer.setStyle(this.nativeElement, 'height', '40px');
    this.renderer.setStyle(this.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(this.nativeElement, 'padding', '8px 12px');

    // Estilos del texto
    this.renderer.setStyle(this.nativeElement, 'color', '#5D5D5D');
    this.renderer.setStyle(this.nativeElement, 'font-size', '16px');

    //Estilos del placeHolder
    // Definimos el color del placeholder
    let colorPlaceholder = '#B9B9B9';
    // Creamos el elemento style para colocarle código CSS nativo
    const styleElement = document.createElement('style');
    // Creamos una clase única para agregarsela al input
    const uniqueClass = 'placeholder-' + Date.now(); //Esto genera una clase única para evitar conflictos
    // Insertamos el código CSS sobre el HTML con los cambios
    // ::-webkit-input-placeholder -> Chrome, Opera y Safari
    // :-ms-input-placeholder -> IE 10+ y Edge
    // ::-moz-input-placeholder -> Firefox 19+
    styleElement.innerHTML = `
      .${uniqueClass}::placeholder {color: ${colorPlaceholder}}
      .${uniqueClass}::-webkit-input-placeholder {color: ${colorPlaceholder}}
      .${uniqueClass}:-ms-input-placeholder {color: ${colorPlaceholder}}
      .${uniqueClass}::-moz-input-placeholder {color: ${colorPlaceholder}}
    `;
    // Insertamos en el HTML el elemento style
    document.head.appendChild(styleElement);
    // Agregamos la clase unica al input
    this.renderer.addClass(this.nativeElement, uniqueClass);

    // Estados del input
    // Mouseover
    this.renderer.listen(this.nativeElement, 'mouseover', () => {
      // Validamos que el input no este disabled
      if (!this.disabled && !this.hasError) {
        // Llamamos la función que cambia el color del border
        this.changeBorderColor('#3785F7');
      }
    });
    // Mouseout
    this.renderer.listen(this.nativeElement, 'mouseout', () => {
      // Validamos que el input no este focus y que el input no este disabled
      if (!this.isFocus && !this.disabled && !this.hasError) {
        // Llamamos la función que cambia el color del border
        this.changeBorderColor('#D6D6D6');
      }
    });
    // Focus
    this.renderer.listen(this.nativeElement, 'focus', () => {
      // Validamos que el input no este disabled
      if (!this.disabled && !this.hasError) {
        // Cambiamos la variable isFocus a true
        this.isFocus = true;
        // Quitamos el estilo outline al input
        this.renderer.setStyle(this.nativeElement, 'outline', `none`);
        // Llamamos la función que cambia el color del border
        this.changeBorderColor('#0044D6');
      }
    });
    // Blur
    this.renderer.listen(this.nativeElement, 'blur', () => {
      // Validamos que el input no este disabled
      if (!this.disabled && !this.hasError) {
        // Cambiamos la variable isFocus a false
        this.isFocus = false;
        // Llamamos la función que cambia el color del border
        this.changeBorderColor('#D6D6D6');
      }
    });

    // Validamos si está disabled el input
    if (this.disabled) {
      // Llamamos la función que coloca el estilo de disabled
      this.disableInput(this.nativeElement);
    } else {
      // Llamamos la función que coloca los estilos de enable
      this.enableInput(this.nativeElement);
    }
  }

  /**
   * Detecta el cambio sobre variables importadas
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Validamos si está disabled el input
    if (this.disabled) {
      // Llamamos la función que coloca el estilo de disabled
      this.disableInput(this.nativeElement);
    } else {
      // Llamamos la función que coloca los estilos de enable
      this.enableInput(this.nativeElement);
    }

    if (this.hasError && !this.disabled) {
      // Llamamos la función que cambia el color del border
      this.changeBorderColor('#98000F');
    }
  }

  /**
   * Función para habilitar el input
   */
  private enableInput(nativeElement: any) {
    // Removemos el atributo de disabled
    this.renderer.removeAttribute(nativeElement, 'disabled');
    // Asignamos un color de fondo al input
    this.renderer.setStyle(this.nativeElement, 'background-color', '#FFF');
    // Llamamos la función que cambia el color del border
    this.changeBorderColor('#D6D6D6');
    // Validamos si existe un texto de error
    if (this.hasError && !this.disabled) {
      // Llamamos la función que cambia el color del border
      this.changeBorderColor('#98000F');
    }
  }

  /**
   * Función para deshabilitar el input
   */
  private disableInput(nativeElement: any) {
    // Agregamos el atributo de disabled
    this.renderer.setAttribute(nativeElement, 'disabled', 'true');
    // Asignamos un color de fondo al input
    this.renderer.setStyle(nativeElement, 'background-color', '#F9F9FB');
    // Llamamos la función que cambia el color del border
    this.changeBorderColor('#D6D6D6');
  }
}
