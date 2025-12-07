import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profesionales } from '../models/profesionales';
import { Categorias } from '../models/categorias';
import { Resena } from '../models/resenas';

@Injectable({
  providedIn: 'root',
})
export class ServProfesionales {
  profesionalesUrl= "http://localhost:3000/profesionales";
  categoriasUrl= "http://localhost:3000/categorias";
  resenasUrl ="http://localhost:3000/resenas";

  constructor(private http:HttpClient){
  }

  getProfesionales():Observable<Profesionales[]>{
    return this.http.get<Profesionales[]>(this.profesionalesUrl);
  }

  
  nuevoProfesional(profesional:Profesionales):Observable<Profesionales>{
    return this.http.post<Profesionales>(this.profesionalesUrl,profesional)
  }

  eliminarProfesional(profesional:Profesionales):Observable<Profesionales>{
    const urlActualizar=  `${this.profesionalesUrl}/${profesional.id}`;
    return this.http.patch<Profesionales>(urlActualizar, {estado: 'No disponible'});
  }

  actualizarProfesional(profesional:Profesionales):Observable<Profesionales>{
    const urlActualizar = `${this.profesionalesUrl}/${profesional.id}`
    return this.http.put<Profesionales>(urlActualizar,profesional);
  }

  getCategorias():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(this.categoriasUrl).pipe(
      map(
      (c)=>c.filter(c=>c.estado === 'Activa')
      )
    );
  }

  getResenas():Observable<Resena[]>{
    return this.http.get<Resena[]>(this.resenasUrl);
  }

  getProfesionalPorId(id:any):Observable<Profesionales>{
    return this.http.get<Profesionales>(`${this.profesionalesUrl}/${id}`);

  }
}
