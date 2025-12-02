import { Routes } from '@angular/router';
import { CrudProfesionales } from './components/profesionales/crud-profesionales/crud-profesionales';
import { Inicio } from './components/home/inicio/inicio';
import { CrudResena } from './components/crud-resena/crud-resena';

export const routes: Routes = [
    {path:"profesionales-crud", component:CrudProfesionales},
    {path:"resenas-crud", component:CrudResena},
    {path:"inicio", component:Inicio},
];
