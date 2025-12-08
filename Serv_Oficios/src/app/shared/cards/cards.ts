import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export class Cards {
  @Input() titulo:string = "";
  @Input() descripcion:string = "";
  @Input() categoria:string ="";
  @Input() profesional:string= "";
  @Input() precio:number = 0;
  @Input() activo:string = "";
  
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();


  editar() {
    this.onEdit.emit();
  }

  eliminar() {
    this.onDelete.emit();
  }
}
