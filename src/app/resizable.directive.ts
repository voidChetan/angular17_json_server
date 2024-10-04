import { Directive, ElementRef, HostListener, Input, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appResizable]',
  standalone: true
})
export class ResizableDirective {

  @Input() rightElement!: any; // Right div reference
  private isResizing = false;
  private initialLeftWidth = 0;
  private initialRightWidth = 0;
  private startX = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'ew-resize');
  }

  ngAfterViewInit() {
    debugger;
    if(this.rightElement) {
      this.initialRightWidth = this.rightElement.nativeElement.offsetWidth;
    }
   
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isResizing = true;
    this.startX = event.clientX;
    this.initialLeftWidth = this.el.nativeElement.offsetWidth;
    if(this.rightElement) {
      this.initialRightWidth = this.rightElement.offsetWidth;
    } 
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) {
      return;
    }
    const offsetX = event.clientX - this.startX;
    const newLeftWidth = this.initialLeftWidth + offsetX;
    const newRightWidth = this.initialRightWidth - offsetX;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${newLeftWidth}px`);
    if(this.rightElement) {
      this.renderer.setStyle(this.rightElement, 'width', `${newRightWidth}px`);
    }
   
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isResizing = false;
  }

}
