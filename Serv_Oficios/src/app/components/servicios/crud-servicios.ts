import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import { Servicio } from '../../models/servicios';
import { Categorias } from '../../models/categorias';
import { Profesionales } from '../../models/profesionales';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServServiciosJson } from '../../services/serv-servicios';
import { Cards } from "../../shared/cards/cards";

declare var bootstrap: any;

@Component({
  selector: 'app-servicio-crud',
  templateUrl: './crud-servicios.html',
  styleUrls: ['./crud-servicios.css'],
  imports: [CommonModule, Cards, ReactiveFormsModule],
})
export class CrudServicios implements OnInit {
  @ViewChild('servicioModal') modalElement!: ElementRef;
  
  servicios: Servicio[] = [];
  categorias: Categorias[] = [];
  profesionales: Profesionales[] = [];
  

  categoriaMap: {[key: number]: string} = {};
  profesionalMap: {[key: number]: string} = {};
  
  servicioForm: FormGroup;
  servicioEdit: Servicio | null = null;
  isEditing: boolean = false;
  modalInstance: any;

  constructor(
    private servServicios: ServServiciosJson,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.servicioForm = this.createForm();
  }

  ngOnInit() {
    this.loadAllData();
  }


  loadAllData() {
    forkJoin({
      servicios: this.servServicios.getServicios(),
      categorias: this.servServicios.getCategorias(),
      profesionales: this.servServicios.getProfesionales()
    }).subscribe({
      next: (data) => {
        this.servicios = data.servicios;
        this.categorias = data.categorias;
        this.profesionales = data.profesionales;
        

        this.buildMaps();
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }



  private buildMaps(): void {
    this.categoriaMap = {};
    this.categorias.forEach(cat => {
      if (cat.id !== undefined) {
        this.categoriaMap[cat.id] = cat.nombre;
      }
    });

    this.profesionalMap = {};
    this.profesionales.forEach(prof => {
      if (prof.id !== undefined) {
        this.profesionalMap[prof.id] = prof.nombreCompleto;
      }
    });
  }

  ngAfterViewInit() {
    if (typeof bootstrap !== 'undefined') {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement, {
        backdrop: 'static',
        keyboard: true
      });
    }
  }


  getCategoriaNombre(id: number | string): string {
    return this.categoriaMap[Number(id)] || 'N/A';
  }

  getProfesionalNombre(id: number | string): string {
    return this.profesionalMap[Number(id)] || 'N/A';
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      categoria: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      duracionEstimada: ['', Validators.required],
      profesional_id: ['', Validators.required],
      activo: [true]
    });
  }

  openModal(servicio?: Servicio) {
    if (servicio) {
      this.isEditing = true;
      this.servicioEdit = { ...servicio };
      this.servicioForm.patchValue(servicio);
    } else {
      this.isEditing = false;
      this.resetForm();
    }

    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      this.modalElement.nativeElement.style.display = 'block';
      this.modalElement.nativeElement.classList.add('show');
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    } else {
      this.modalElement.nativeElement.style.display = 'none';
      this.modalElement.nativeElement.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
    this.resetForm();
  }

  view(id: number | undefined) {
    if (id) this.router.navigate(['/servicio-view/', id]);
  }

  search(input: HTMLInputElement) {
    const param = input.value.trim();
    if (param) {
      this.servServicios.searchServicios(param).subscribe((data) => {
        this.servicios = data;
      });
    } else {
      this.loadAllData();
    }
  }

  create() {
    if (this.servicioForm.invalid) {
      this.markFormGroupTouched(this.servicioForm);
      return;
    }
    
    this.servServicios.create(this.servicioForm.value).subscribe(() => {
      this.closeModal();
      this.loadAllData();
    });
  }

  edit(servicio: Servicio) {
    this.openModal(servicio);
  }

  editById(id: number | undefined) {
    const servicio = this.servicios.find(s => s.id === id);
    if (servicio) this.edit(servicio);
  }

  deleteById(id: number | undefined) {
    const servicio = this.servicios.find(s => s.id === id);
    if (servicio && confirm(`¿Eliminar ${servicio.nombre}?`)) {
      this.delete(servicio);
    }
  }

  update() {
    if (this.servicioForm.invalid || !this.servicioEdit) return;
    
    const actualizado = { ...this.servicioEdit, ...this.servicioForm.value };
    this.servServicios.update(actualizado).subscribe(() => {
      this.closeModal();
      this.loadAllData();
    });
  }

  delete(servicio: Servicio) {
    this.servServicios.delete(servicio.id).subscribe(() => this.loadAllData());
  }

  resetForm() {
    this.servicioForm.reset({ activo: true });
    this.servicioEdit = null;
    this.isEditing = false;
  }

  onSubmit() {
    this.isEditing ? this.update() : this.create();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f() {
    return this.servicioForm.controls;
  }
}