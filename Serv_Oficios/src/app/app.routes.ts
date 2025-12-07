import { Routes } from '@angular/router';
import { CrudProfesionales } from './components/profesionales/crud-profesionales/crud-profesionales';
import { CrudResena } from './components/resenas/crud-resena/crud-resena';
import { CrudCategorias } from './components/categorias/crud-categorias/crud-categorias';
import { Inicio } from './components/home/inicio/inicio';
import { CrudClientes } from './components/clientes/crud-clientes/crud-clientes';

export const routes: Routes = [
    //Ruteo para el componente profesional
    {path:"profesionales-crud", component:CrudProfesionales},
    //Ruteo para el componente profesional
    {path:"resenas-crud", component:CrudResena},
    //Ruteo para el componente profesional
    {path:"categoria-crud", component: CrudCategorias},
    //Ruteo para el componente profesional
    {path:"clientes-crud", component:CrudClientes},
    //Ruteo para el componente profesional
    {path:"app-inicio", component: Inicio},
    //Ruteo al componente inicio cuando la ruta no exista
    {path:"*",redirectTo:"app-inicio", pathMatch:'full'},
    {path:"", redirectTo:"app-inicio", pathMatch:'full'}
];
