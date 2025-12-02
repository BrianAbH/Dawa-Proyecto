import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesionales } from '../models/profesionales';

@Injectable({
  providedIn: 'root',
})
export class ServProfesionales {
  profesionalesUrl= "http://localhost:3000/profesionales";

  constructor(private http:HttpClient){
  }

  getProfesionales():Observable<Profesionales[]>{
    return this.http.get<Profesionales[]>(this.profesionalesUrl);
  }
  
  nuevoProfesional(profesional:Profesionales):Observable<Profesionales>{
    return this.http.post<Profesionales>(this.profesionalesUrl,profesional)
  }

  eliminarProfesional(id:number):Observable<void>{
    const urlEliminar=  `${this.profesionalesUrl}/${id}`
    return this.http.delete<void>(urlEliminar);
  }

  getProfesionalPorId(id:any):Observable<Profesionales>{
    return this.http.get<Profesionales>(`${this.profesionalesUrl}/${id}`);

  }
}
