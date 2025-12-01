import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.html',
})
export class Cards {
  @Input() titulo:string = "";
  @Input() descripcion:string = "";
  @Input() categoria:number =0;
  @Input() profesional:number = 0;
  @Input() precio:number = 0;
  @Input() activo:string = "";
 
}
