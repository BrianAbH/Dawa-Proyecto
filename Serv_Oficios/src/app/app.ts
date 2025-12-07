import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from "./components/home/inicio/inicio";
import { Vista } from "./components/profesionales/vista/vista";

@Component({
  selector: 'app-root',
  imports: [Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Serv_Oficios');
}
