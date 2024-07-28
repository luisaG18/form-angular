import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelectFormCustom]',
  standalone: true,
})
export class SelectFormCustomDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  // Elemento nativo del select
  private nativeElement = this.element.nativeElement;

  /**
   * Función para cambiar el color del borde de un input
   */
  private changeBorderColor(color: string) {
    this.renderer.setStyle(this.nativeElement, 'border', `1px solid ${color}`);
  }

  ngOnInit(): void {
    // Estilos del select
    this.renderer.setStyle(this.nativeElement, 'width', '190px');
    this.renderer.setStyle(this.nativeElement, 'height', '40px');
    this.renderer.setStyle(this.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(this.nativeElement, 'padding', '8px 12px');
    this.renderer.setStyle(this.nativeElement, 'background-color', '#FFF');
    this.changeBorderColor('#D6D6D6');

    // Estilos del texto
    this.renderer.setStyle(this.nativeElement, 'color', '#5D5D5D');
    this.renderer.setStyle(this.nativeElement, 'font-size', '16px');

    // Focus
    this.renderer.listen(this.nativeElement, 'focus', () => {
      // Quitamos el estilo outline al input
      this.renderer.setStyle(this.nativeElement, 'outline', `none`);
      // Llamamos la función que cambia el color del border
      this.changeBorderColor('#0044D6');
    });
    // Blur
    this.renderer.listen(this.nativeElement, 'blur', () => {
      // Llamamos la función que cambia el color del border
      this.changeBorderColor('#D6D6D6');
    });
  }
}
