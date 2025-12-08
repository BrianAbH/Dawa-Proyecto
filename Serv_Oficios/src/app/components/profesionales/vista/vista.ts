import { Component } from '@angular/core';
import { Profesionales } from '../../../models/profesionales';
import { ServProfesionales } from '../../../services/serv-profesionales';
import { ActivatedRoute} from '@angular/router';
import { Categorias } from '../../../models/categorias';
import { ServCategoria } from '../../../services/serv-categoria';

@Component({
  selector: 'app-vista',
  imports: [],
  templateUrl: './vista.html',
  styleUrl: './vista.css'
})
export class Vista {
  profesional!:Profesionales;
  categorias!: Categorias;

  constructor(private miServicio:ServProfesionales,private servicioCat:ServCategoria, private router:ActivatedRoute){
    
  }
  ngOnInit(){
    //obtener el parametro id que llega 
      const id= this.router.snapshot.paramMap.get('id');
      const categoriaId= this.router.snapshot.paramMap.get('idCat');
    //buscamos el profesional que tiene ese id a traves del servicio
    this.miServicio.getProfesionalPorId(id).subscribe(
      (data:Profesionales)=>{
        this.profesional = data; //actualizar la data de profesional con el data que nos trae el servicio
      }
    );
    this.servicioCat.getCategoriaPorId(categoriaId).subscribe(
      (data:Categorias)=>{
        this.categorias=data;
      }
    )
  }


  
/*
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
