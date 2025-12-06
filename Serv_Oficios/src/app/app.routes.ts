import { Routes } from '@angular/router';
import { CrudProfesionales } from './components/profesionales/crud-profesionales/crud-profesionales';
import { Inicio } from './components/home/inicio/inicio';
import { CrudResena } from './components/resenas/crud-resena/crud-resena';
import { CrudCategorias } from './components/categorias/crud-categorias/crud-categorias';

export const routes: Routes = [
    {path:"profesionales-crud", component:CrudProfesionales},
    {path:"inicio", component:Inicio},
    {path:"resenas-crud", component:CrudResena},
    {path:'categoria-crud', component: CrudCategorias}
];
