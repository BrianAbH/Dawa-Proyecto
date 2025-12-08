import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorias } from '../models/categorias';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServCategoria {
  categoriaUrl = "http://localhost:3000/categorias";

  constructor(private http:HttpClient){}

  getCategorias():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(this.categoriaUrl);
  }

  getCategoriasActivas():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(this.categoriaUrl).pipe(
      map(
      (categoria)=>categoria.filter(c=>c.estado === 'Activa')
      )
    );
  }

  getCategoriasInactivas():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(this.categoriaUrl).pipe(
      map(
      (categoria)=>categoria.filter(c=>c.estado === 'Inactiva')
      )
    );
  }

  getCategoriaPorId(id:any):Observable<Categorias>{
      return this.http.get<Categorias>(`${this.categoriaUrl}/${id}`);
  }


  guardarCategoria(categoria:Categorias):Observable<Categorias>{
    return this.http.post<Categorias>(this.categoriaUrl, categoria);
  }

  actualizarCategoria(categoria:Categorias):Observable<Categorias>{
    const urlActualizar = `${this.categoriaUrl}/${categoria.id}`
    return this.http.put<Categorias>(urlActualizar,categoria);
  }

  eliminarCategoria(categoria:Categorias):Observable<Categorias>{
    const urlActualizar = `${this.categoriaUrl}/${categoria.id}`
    return this.http.patch<Categorias>(urlActualizar, {estado : 'Inactiva'});
  }





}
