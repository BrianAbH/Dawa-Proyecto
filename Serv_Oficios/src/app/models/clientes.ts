export interface Clientes {
  id?: number;
  nombreCompleto: string;
  numero: string;
  correo: string;
  ciudad: string;
  direccion?: string;
  cedula?: string;
  foto?: string;
  tipoCliente?: string;  
  estado: string; 
  fechaRegistro?: string;
}
