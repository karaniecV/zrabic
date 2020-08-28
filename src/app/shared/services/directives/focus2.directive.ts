import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocus2]'
})
export class Focus2Directive implements OnInit {

  @HostListener('mouseenter') onMouseEnter(event: MouseEvent){
   this._setStile('bold')
  }
  @HostListener('mouseleave') onMouseLeav(event: MouseEvent){
   this._setStile('normal')
  }

  constructor(public element: ElementRef, public renderer: Renderer2) { }

  ngOnInit(){
  }

  private _setStile(color):void{
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', color)
  }



}
