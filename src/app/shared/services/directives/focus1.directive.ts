import { Directive, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocus1]'
})
export class Focus1Directive implements OnInit{

  @HostListener('mouseenter') onMouseEnter(event: MouseEvent){
    this._setStile('2px solid #29B0D9')
   }
   @HostListener('mouseleave') onMouseLeav(event: MouseEvent){
    this._setStile('none')
   }
 
   constructor(public element: ElementRef, public renderer: Renderer2) { }
 
   ngOnInit(){
   }
 
   private _setStile(color):void{
     this.renderer.setStyle(this.element.nativeElement, 'border', color)
   }

}
