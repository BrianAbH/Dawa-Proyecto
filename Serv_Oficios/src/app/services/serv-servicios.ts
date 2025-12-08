import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Servicio } from '../models/servicios';
import { Categorias } from '../models/categorias';
import { Profesionales } from '../models/profesionales';

@Injectable({
  providedIn: 'root'
})
export class ServServiciosJson {

  private categoriasUrl= "http://localhost:3000/categorias";
  private servicioUrl = 'http://localhost:3000/servicios';
  private profesionalesUrl= "http://localhost:3000/profesionales";

  constructor(private http: HttpClient) {}

  // GET: obtener todos
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioUrl);
  }

  // GET: por ID
  getServicioById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.servicioUrl}/${id}`);
  }

  // SEARCH: búsqueda por nombre o descripción
  searchServicios(param: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioUrl).pipe(
      map(servicios =>
        servicios.filter(s =>
          s.nombre.toLowerCase().includes(param.toLowerCase()) ||
          s.descripcion.toLowerCase().includes(param.toLowerCase())
        )
      )
    );
  }

  // POST: crear
  create(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.servicioUrl, servicio);
  }

  // PUT: actualizar
  update(servicio: Servicio): Observable<Servicio> {
    const url = `${this.servicioUrl}/${servicio.id}`;
    return this.http.put<Servicio>(url, servicio);
  }

  // DELETE: eliminar
  delete(id: number): Observable<Servicio> {
    const url = `${this.servicioUrl}/${id}`;
    return this.http.delete<Servicio>(url);
  }

  getCategorias():Observable<Categorias[]>{
      return this.http.get<Categorias[]>(this.categoriasUrl).pipe(
        map(
        (c)=>c.filter(c=>c.estado === 'Activa')
        )
      );
    }

  getProfesionales():Observable<Profesionales[]>{
      return this.http.get<Profesionales[]>(this.profesionalesUrl);
    }
  
}
