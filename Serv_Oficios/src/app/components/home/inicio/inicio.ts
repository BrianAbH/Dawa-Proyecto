import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Cards } from "../../../shared/cards/cards";

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Cards],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
