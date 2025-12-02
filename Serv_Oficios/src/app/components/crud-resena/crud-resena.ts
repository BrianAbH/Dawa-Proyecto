import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resena } from '../../models/resenas';
import { ServResenas } from '../../services/serv-resenas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-resena',
  templateUrl: './crud-resena.html',
  styleUrls: ['./crud-resena.css'],
  imports: [CommonModule, FormsModule],
})
export class CrudResena {
  resenas: Resena[] = [];
  resenaEdit: Resena | null = null;
  nuevaResena: Partial<Resena> = {};
  filtroCalificacion: number | null = null;
  filtroBusqueda: string = '';
  
  // Estados de UI
  modoEdicion: boolean = false;
  cargando: boolean = false;

  constructor(private servResenas: ServResenas, private router: Router) {
    this.loadResenas();
  }

  // Cargar lista de reseñas
  loadResenas() {
    this.cargando = true;
    this.servResenas.getResenas().subscribe({
      next: (data) => {
        this.resenas = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar reseñas:', error);
        this.cargando = false;
      }
    });
  }

  // Visualizar reseña por ID
  view(id: string | number | undefined) {
    if (id) {
      this.router.navigate(['/resena-view/', id]);
    }
  }

  // Aplicar filtro de búsqueda
  aplicarBusqueda() {
    if (!this.filtroBusqueda.trim()) {
      this.loadResenas();
      return;
    }

    this.cargando = true;
    this.servResenas.searchResenas(this.filtroBusqueda).subscribe({
      next: (data) => {
        this.resenas = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.cargando = false;
      }
    });
  }

  // Aplicar filtro de calificación
  aplicarFiltroCalificacion() {
    if (this.filtroCalificacion === null || this.filtroCalificacion < 1 || this.filtroCalificacion > 5) {
      this.loadResenas();
      return;
    }

    this.cargando = true;
    this.servResenas.getResenasPorCalificacion(this.filtroCalificacion).subscribe({
      next: (data) => {
        this.resenas = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al filtrar por calificación:', error);
        this.cargando = false;
      }
    });
  }

  // Preparar formulario para crear nueva reseña
  prepararNuevaResena() {
    this.modoEdicion = false;
    this.nuevaResena = {
      titulo: '',
      contenido: '',
      calificacion: 5,
      fecha: new Date().toISOString().split('T')[0],
      solicitud_id: '',
      nombreUsuario: '',
      inicialesUsuario: ''
    };
  }

  // Crear nueva reseña
  create() {
    if (!this.validarResena(this.nuevaResena)) return;

    const nueva: Omit<Resena, 'id'> = {
      titulo: this.nuevaResena.titulo || '',
      contenido: this.nuevaResena.contenido || '',
      calificacion: this.nuevaResena.calificacion || 5,
      fecha: this.nuevaResena.fecha || new Date().toISOString().split('T')[0],
      solicitud_id: this.nuevaResena.solicitud_id || '',
      nombreUsuario: this.nuevaResena.nombreUsuario,
      inicialesUsuario: this.nuevaResena.nombreUsuario ? 
        this.generarIniciales(this.nuevaResena.nombreUsuario) : undefined
    };

    this.cargando = true;
    this.servResenas.createResena(nueva).subscribe({
      next: () => {
        this.loadResenas();
        this.nuevaResena = {};
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al crear reseña:', error);
        this.cargando = false;
      }
    });
  }

  // Seleccionar reseña para editar
  edit(resena: Resena) {
    this.modoEdicion = true;
    this.nuevaResena = { ...resena };
  }

  // Actualizar reseña
  update() {
    if (!this.nuevaResena.id) {
      alert('No se puede actualizar una reseña sin ID');
      return;
    }

    if (!this.validarResena(this.nuevaResena)) return;

    const actualizada: Resena = {
      id: this.nuevaResena.id,
      titulo: this.nuevaResena.titulo || '',
      contenido: this.nuevaResena.contenido || '',
      calificacion: this.nuevaResena.calificacion || 5,
      fecha: this.nuevaResena.fecha || new Date().toISOString().split('T')[0],
      solicitud_id: this.nuevaResena.solicitud_id || '',
      nombreUsuario: this.nuevaResena.nombreUsuario,
      inicialesUsuario: this.nuevaResena.nombreUsuario ? 
        this.generarIniciales(this.nuevaResena.nombreUsuario) : this.nuevaResena.inicialesUsuario
    };

    this.cargando = true;
    this.servResenas.updateResena(actualizada).subscribe({
      next: () => {
        this.loadResenas();
        this.nuevaResena = {};
        this.modoEdicion = false;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al actualizar reseña:', error);
        this.cargando = false;
      }
    });
  }

  // Eliminar reseña
  delete(resena: Resena) {
    if (!confirm(`¿Eliminar la reseña "${resena.titulo}"?`)) return;

    this.cargando = true;
    this.servResenas.deleteResena(resena.id).subscribe({
      next: () => {
        this.loadResenas();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al eliminar reseña:', error);
        this.cargando = false;
      }
    });
  }

  // Obtener reseñas recientes
  obtenerRecientes() {
    this.cargando = true;
    this.servResenas.getResenasRecientes(10).subscribe({
      next: (data) => {
        this.resenas = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener reseñas recientes:', error);
        this.cargando = false;
      }
    });
  }

  // Obtener promedio de calificaciones
  obtenerPromedio() {
    this.servResenas.getPromedioCalificaciones().subscribe((promedio) => {
      alert(`El promedio de calificaciones es: ${promedio}`);
    });
  }

  // Resetear filtros
  resetearFiltros() {
    this.filtroBusqueda = '';
    this.filtroCalificacion = null;
    this.loadResenas();
  }

  // Cancelar edición/creación
  cancelar() {
    this.nuevaResena = {};
    this.modoEdicion = false;
  }

  // Método auxiliar para generar iniciales
  private generarIniciales(nombreCompleto: string): string {
    return nombreCompleto
      .split(' ')
      .map(nombre => nombre[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Validar datos de la reseña
  private validarResena(resena: Partial<Resena>): boolean {
    if (!resena.titulo || resena.titulo.trim() === '') {
      alert('El título es requerido');
      return false;
    }
    if (!resena.contenido || resena.contenido.trim() === '') {
      alert('El contenido es requerido');
      return false;
    }
    if (!resena.calificacion || resena.calificacion < 1 || resena.calificacion > 5) {
      alert('La calificación debe estar entre 1 y 5');
      return false;
    }
    if (!resena.solicitud_id) {
      alert('El ID de solicitud es requerido');
      return false;
    }
    return true;
  }

  // Calcular estrellas para mostrar
  getEstrellas(calificacion: number): string[] {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(i <= calificacion ? '★' : '☆');
    }
    return estrellas;
  }
}