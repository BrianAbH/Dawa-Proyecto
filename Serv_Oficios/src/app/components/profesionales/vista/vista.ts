import { Component } from '@angular/core';
import { Profesionales } from '../../../models/profesionales';
import { ServProfesionales } from '../../../services/serv-profesionales';
import { Categorias } from '../../../models/categorias';
import { Resena } from '../../../models/resenas';

@Component({
  selector: 'app-vista',
  imports: [],
  templateUrl: './vista.html',
  styleUrl: './vista.css',
})
export class Vista {
  profesional:Profesionales[]=[];
  categorias:Categorias[]=[]
  resenas:Resena[]=[];

  constructor(private miServicio:ServProfesionales){
    this.cargarProfesionales();
  }

  cargarProfesionales(){
    this.miServicio.getProfesionales().subscribe(
      (data:Profesionales[])=>{
        this.profesional=data;
      }
    )
  }

  cargarCategorias(){
      this.miServicio.getCategorias().subscribe(
        (data:Categorias[])=>{
          this.categorias = data;
        }
      )
    }
  
  getCategorias(categoriaId:number):string{
    const catId = this.categorias.find(
      (g)=>Number(g.id)===Number(categoriaId)
    );
    return catId ? catId.nombre : "Sin categoria";
  }

  cargarResenas(){
    return this.miServicio.getResenas().subscribe(
      (data:Resena[])=>{
        this.resenas=data;
      });
  }
/*
  getResenaPorId(profesionalId:number |undefined):number{
    const resenaId = this.resenas.find(
      (p)=>Number(p.profesionalId)===Number(profesionalId)
    );
    return resenaId ? resenaId.calificacion : 0;
  }*/
}
