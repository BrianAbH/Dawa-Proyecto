import { Routes } from '@angular/router';
import { CrudProfesionales } from './components/profesionales/crud-profesionales/crud-profesionales';
import { CrudResena } from './components/resenas/crud-resena/crud-resena';
import { CrudCategorias } from './components/categorias/crud-categorias/crud-categorias';
import { Inicio } from './components/home/inicio/inicio';
import { CrudClientes } from './components/clientes/crud-clientes/crud-clientes';
import { Vista } from './components/profesionales/vista/vista';
import { CrudServicios } from './components/servicios/crud-servicios';

export const routes: Routes = [

    // RUTAS SIN MENÚ
    {path:"profesionales-vista", component: Vista},
    {path:"profesionales-vista/:id/:idCat", component: Vista},

    {path: "inicio",component: Inicio,
    children: [
    //Ruteo para el componente Categoria
        {path:"categoria-crud", component: CrudCategorias},
        //Ruteo para el componente profesional
        {path:"profesionales-crud", component: CrudProfesionales},
        //Ruteo para el componente Clientes
        {path:"clientes-crud", component: CrudClientes},
        //Ruteo para el componente Servicios
        {path:"servicio-crud", component: CrudServicios},
        //Ruteo para el componente Reseñas
        {path:"resenas-crud", component: CrudResena},

        // Ruta por defecto al entrar en /inicio
        {path:"", redirectTo:"categoria-crud", pathMatch:"full"},
    ]},

    // Redirección raíz
    {path:"", redirectTo:"inicio", pathMatch:"full"},

    // Cualquier ruta no válida
    {path:"**", redirectTo:"inicio"},
];
