import { Routes } from '@angular/router';
import { CrudProfesionales } from './components/profesionales/crud-profesionales/crud-profesionales';
import { Inicio } from './components/home/inicio/inicio';

export const routes: Routes = [
    {path:"profesionales-crud", component:CrudProfesionales},
    {path:"inicio", component:Inicio},
];
