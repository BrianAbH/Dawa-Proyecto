export interface Resena {
  id: string | number;
  titulo: string;
  contenido: string;
  calificacion: number;
  fecha: string;
  solicitud_id: string | number;
  nombreUsuario?: string;
  inicialesUsuario?: string;
}
