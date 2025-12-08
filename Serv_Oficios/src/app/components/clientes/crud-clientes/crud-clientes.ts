import { Component, ElementRef, ViewChild } from '@angular/core';
import { Clientes } from '../../../models/clientes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from "../../../shared/search/search";
import { FiltroClientes } from '../../../pipes/filtros';
import { validarCorreo, validarUlr } from '../../../validators/Validators';
import { ServClientes } from '../../../services/serv-clientes';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-crud-clientes',
  imports: [CommonModule,ReactiveFormsModule,ReactiveFormsModule, Search, FiltroClientes],
  templateUrl: './crud-clientes.html',
  styleUrls: ['./crud-clientes.css']
})
export class CrudClientes {

  clientes: Clientes[] = [];
  isEditing: number | null = null;

  page = 1;
  pageSize = 9;

  modalRef: any;

  formClientes!: FormGroup;

  filtro: string = '';
  filtrar(texto: string) {
    this.filtro = texto;
  }

  constructor(
    private miServicio: ServClientes,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cargarClientes();

    this.formClientes = this.fb.group({
      foto: ['', [Validators.required, validarUlr]],
      nombreCompleto: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email, validarCorreo]],
      ciudad: ['', [Validators.required]],
      estado: ['']
    });
  }

  @ViewChild('modalClienteRef') modalElement!: ElementRef;
  ngAfterViewInit() {
    this.modalRef = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // Metodo de cargar clientes
  cargarClientes() {
    this.miServicio.getClientes().subscribe(
      (data: Clientes[]) => {
        this.clientes = data;
      }
    );
  }

  // Metodo de abrir modal para nuevo cliente
  abrirNuevo() {
    this.isEditing = null;
    this.formClientes.reset();
    this.modalRef.show();
  }

  // Metodo de editar cliente
  editar(cliente: Clientes) {
    this.isEditing = cliente.id || null;

    // Normalizar estado para que el checkbox funcione
    this.formClientes.patchValue({
      ...cliente,
      estado: cliente.estado === "Activo"
    });

    this.modalRef.show();
  }

  // Metodo de guardar cliente (nuevo o editar)
  guardar() {
    if (this.formClientes.invalid) {
      this.formClientes.markAllAsTouched();
      return;
    }

    const datos = this.formClientes.value;

    //Estandarizar estado 
    datos.estado = datos.estado === true ? "Activo" : "Inactivo";

    if (this.isEditing) {
      const clienteEditar: Clientes = { ...datos, id: this.isEditing };

      this.miServicio.actualizarCliente(clienteEditar).subscribe(() => {
        alert("Cliente actualizado correctamente");
        this.modalRef.hide();
        this.cargarClientes();
      });

    } else {
      const clienteNuevo: Clientes = { ...datos };

      // El id se asigna en el backend
      this.miServicio.nuevoCliente(clienteNuevo).subscribe(() => {
        alert("Cliente creado correctamente");
        this.modalRef.hide();
        this.cargarClientes();
      });
    }
  }

  // Metodo de eliminar cliente
  eliminarCliente(cliente: Clientes) {
    const msj = confirm(`¿Seguro que deseas eliminar a ${cliente.nombreCompleto}?`);
    if (msj) {
      this.miServicio.eliminarCliente(cliente).subscribe(() => {
        this.cargarClientes();
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.clientes.length / this.pageSize);
  }

  get clientesPagina(): Clientes[] {
    const start = (this.page - 1) * this.pageSize;
    return this.clientes.slice(start, start + this.pageSize);
  }

  // Iniciales del nombre
  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  // Metodo de cambiar pagina
  cambiarPagina(n: number) {
    if (n < 1 || n > this.totalPages) return;
    this.page = n;
  }
}
