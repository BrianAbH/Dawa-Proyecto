import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Clientes } from '../models/clientes';
import { Categorias } from '../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class ServClientes {
    private URL = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  // Obtener lista de todos los clientes
  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.URL}/`);
  }

  // Crear nuevo cliente
  nuevoCliente(cliente: Clientes): Observable<any> {
    return this.http.post(`${this.URL}/`, cliente);
  }

  // Actualizar datos del cliente
  actualizarCliente(cliente: Clientes): Observable<any> {
    return this.http.put(`${this.URL}/${cliente.id}`, cliente);
  }

  // Eliminar a un cliente
  eliminarCliente(cliente: Clientes): Observable<any> {
    return this.http.delete(`${this.URL}/${cliente.id}`);
  }

}
