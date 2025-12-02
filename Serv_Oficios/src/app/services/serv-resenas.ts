import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Resena } from '../models/resenas';
@Injectable({
  providedIn: 'root',
})
export class ServResenas {
  private resenasUrl = 'http://localhost:3000/resenas';
  constructor(private http: HttpClient) {}


  /* ===========================
   OPERACIONES CRUD PRINCIPALES
   =========================== */
   
getResenas(): Observable<Resena[]> {
  return this.http.get<Resena[]>(this.resenasUrl);
}
getResenaById(id: string | number): Observable<Resena> {
  return this.http.get<Resena>(`${this.resenasUrl}/${id}`);
}
createResena(resena: Omit<Resena, 'id'>): Observable<Resena> {
  return this.http.post<Resena>(this.resenasUrl, resena);
}
updateResena(resena: Resena): Observable<Resena> {
  if (!resena.id) {
    throw new Error('El ID de la reseña es requerido para actualizar');
  }
  return this.http.put<Resena>(`${this.resenasUrl}/${resena.id}`, resena);
}
deleteResena(id: string | number): Observable<void> {
  return this.http.delete<void>(`${this.resenasUrl}/${id}`);
}


/* ===========================
   OPERACIONES ADICIONALES
   =========================== */
searchResenas(param: string): Observable<Resena[]> {
  return this.http.get<Resena[]>(this.resenasUrl).pipe(
    map(resenas =>
      resenas.filter(r =>
        r.contenido.toLowerCase().includes(param.toLowerCase()) ||
        r.titulo.toLowerCase().includes(param.toLowerCase()) ||
        r.calificacion.toString().includes(param) ||
        (r.nombreUsuario && r.nombreUsuario.toLowerCase().includes(param.toLowerCase()))
      )
    )
  );
}
getResenasPorSolicitud(solicitudId: string | number): Observable<Resena[]> {
  return this.http.get<Resena[]>(this.resenasUrl).pipe(
    map(resenas => resenas.filter(r => r.solicitud_id.toString() === solicitudId.toString()))
  );
}
getResenasPorCalificacion(minCalificacion: number): Observable<Resena[]> {
  return this.http.get<Resena[]>(this.resenasUrl).pipe(
    map(resenas => resenas.filter(r => r.calificacion >= minCalificacion))
  );
}
getPromedioCalificaciones(): Observable<number> {
  return this.http.get<Resena[]>(this.resenasUrl).pipe(
    map(resenas => {
      if (resenas.length === 0) return 0;
      const suma = resenas.reduce((total, resena) => total + resena.calificacion, 0);
      return parseFloat((suma / resenas.length).toFixed(2));
    })
  );
}
getResenasRecientes(limit: number = 5): Observable<Resena[]> {
  return this.http.get<Resena[]>(this.resenasUrl).pipe(
    map(resenas =>
      resenas
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, limit)
    )
  );
}
}
