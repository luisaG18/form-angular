import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBtnprimary]',
  standalone: true,
})
export class BtnprimaryDirective implements OnInit, OnChanges {
  // Variable input para deshabilitar/habilitar el botón
  @Input() disabled: boolean = false;
  // Variable input para marcar el estado de cargando
  @Input() isLoading: boolean = false;
  // Variable del elemento spinner
  private spinnerElement: HTMLElement | null = null;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    // Creamos el elemento span que tendrá el spinner
    this.spinnerElement = this.renderer.createElement('span');
    // Le agregamos la clase css loader al elemento spinner
    this.renderer.addClass(this.spinnerElement, 'loader');
  }

  // Elemento nativo del botón
  private nativeElement = this.element.nativeElement;

  /**
   * Función para cambiarle el color al botón
   * @param color Variable del color que se pondrá al botón
   */
  private changeBackgroundColor(color: string) {
    this.renderer.setStyle(this.nativeElement, 'background-color', color);
  }

  /**
   * Función que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    // Estilos del botón
    this.renderer.setStyle(this.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.nativeElement, 'border-radius', '5px');
    this.renderer.setStyle(this.nativeElement, 'width', '170px');
    this.renderer.setStyle(this.nativeElement, 'min-width', '100px');
    this.renderer.setStyle(this.nativeElement, 'padding', '12px 8px');

    // Estilos del texto
    this.renderer.setStyle(this.nativeElement, 'font-size', '14px');
    this.renderer.setStyle(this.nativeElement, 'font-weight', '600');

    // Estados del botón
    // Mouseover
    this.renderer.listen(this.nativeElement, 'mouseover', () => {
      if (!this.disabled) {
        //Cambiamos el color del botón
        this.changeBackgroundColor('#072FB5');
      }
    });
    // Mouseout
    this.renderer.listen(this.nativeElement, 'mouseout', () => {
      if (!this.disabled) {
        //Cambiamos el color del botón
        this.changeBackgroundColor('#0044D6');
      }
    });
    // Mousedown
    this.renderer.listen(this.nativeElement, 'mousedown', () => {
      if (!this.disabled) {
        //Cambiamos el color del botón
        this.changeBackgroundColor('#002167');
      }
    });
    // Mouseup
    this.renderer.listen(this.nativeElement, 'mouseup', () => {
      if (!this.disabled) {
        //Cambiamos el color del botón
        this.changeBackgroundColor('#004456');
      }
    });

    // Estilos del botón dependiendo de si está disabled o no
    if (this.disabled) {
      // Llamamos a la función que deshabilita el botón
      this.disabledButton(this.nativeElement);
    } else {
      // Llamamos a la función que habilita el botón
      this.enableButton(this.nativeElement);
      // Validamos si el estado es cargando
      if (this.isLoading) {
        // Deshabilitamos el botón
        this.renderer.setAttribute(this.nativeElement, 'disabled', 'true');
        // Llamamos la función que agrega el loader
        this.setLoader(this.nativeElement);
      } else {
        // Llamamos la función que remueve el loader en caso de existir
        this.removeLoader(this.nativeElement);
      }
    }
  }

  /**
   * Detecta el cambio sobre variables importadas
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos si el botón está disabled
    if (this.disabled) {
      // Llamamos a la función que deshabilita el botón
      this.disabledButton(this.nativeElement);
    } else {
      // Llamamos a la función que habilita el botón
      this.enableButton(this.nativeElement);
      // Validamos si el estado es cargando
      if (this.isLoading) {
        // Deshabilitamos el botón
        this.renderer.setAttribute(this.nativeElement, 'disabled', 'true');
        // Llamamos la función que agrega el loader
        this.setLoader(this.nativeElement);
      } else {
        // Llamamos la función que remueve el loader en caso de existir
        this.removeLoader(this.nativeElement);
      }
    }
  }

  /**
   * Función para agregar el spinner al botón(nativeElement)
   */
  private setLoader(nativeElement: any) {
    // Validamos si existe al menos un elemento en el nativeElement
    if (nativeElement.childNodes.length) {
      // Insertamos el spinner antes del texto
      this.renderer.insertBefore(nativeElement, this.spinnerElement, nativeElement.childNodes[0]);

      // Le asignamos los estilos al spinner y al texto
      this.renderer.setStyle(nativeElement, 'display', 'flex');
      this.renderer.setStyle(nativeElement, 'justify-content', 'center');
      this.renderer.setStyle(nativeElement, 'align-items', 'center');
      this.renderer.setStyle(nativeElement, 'gap', '5px');
    }
  }

  /**
   * Función para remover el spinner del botón(nativeElement)
   */
  private removeLoader(nativeElement: any) {
    // Validamos que el nativeElement contenga al elemento spinner
    if (nativeElement.contains(this.spinnerElement)) {
      // Removemos el elemento spinner del elemento nativeElement
      this.renderer.removeChild(nativeElement, this.spinnerElement);
    }
  }

  /**
   * Función para habilitar el botón
   * @param nativeElement Elemento nativo que se habilitará
   */
  private enableButton(nativeElement: any) {
    // Removemos el atributo de disabled
    this.renderer.removeAttribute(nativeElement, 'disabled');
    this.renderer.setStyle(nativeElement, 'background-color', '#0044D6');
    this.renderer.setStyle(nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(nativeElement, 'color', '#FFF');
  }

  /**
   * Función para deshabilitar el botón
   * @param nativeElement Elemento nativo que se deshabilitará
   */
  private disabledButton(nativeElement: any) {
    // Cambiamos el color del botón
    this.renderer.setStyle(nativeElement, 'background-color', '#D6D6D6');
    this.renderer.setStyle(nativeElement, 'color', '#5D5D5D');
    this.renderer.setAttribute(nativeElement, 'disabled', 'true');
  }
}
