export interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  duracionEstimada: number;
  profesional_id: number;
  activo: boolean;
}
