import { Component, ElementRef, ViewChild } from '@angular/core';
import { Profesionales } from '../../../models/profesionales';
import { ServProfesionales } from '../../../services/serv-profesionales';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from "../../../shared/search/search";
import { FiltroProfesionales } from "../../../pipes/filtros";
import { validarCorreo, validarExperiencia, validarUlr } from '../../../validators/Validators';
import { Categorias } from '../../../models/categorias';

declare const bootstrap:any;

@Component({
  selector: 'app-crud-profesionales',
  imports: [ReactiveFormsModule, Search, FiltroProfesionales],
  templateUrl: './crud-profesionales.html',
})
export class CrudProfesionales {
  //Arreglos con los datos
  profesion:Profesionales[]=[];
  categorias:Categorias[]=[];
  isEditing:number | null = null;
  //Variables para la paginacion
  page = 1;
  pageSize = 7;
  //Referencia al modal
  modalRef:any;
  //Referencia al formulario
  formProfesionales!:FormGroup;
  //Filtro para la barra de busqueda
  filtro: string = '';
  filtrar(texto: string) {
    this.filtro = texto;
  }

  constructor(private miServicio:ServProfesionales, private router:Router, private fb:FormBuilder){
    this.cargarProfesionales();
    this.cargarCategorias();
    this.formProfesionales = this.fb.group({
      foto: ['',[Validators.required, validarUlr]],
      nombreCompleto:['',[Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]],
      correo: ['',[Validators.required, Validators.email, validarCorreo]],
      categoria: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
      experiencia: ['',[Validators.required, validarExperiencia]],
      estado:['']
    })
  }

 
  @ViewChild('modalProfesionalRef') modalElement!:ElementRef;
  ngAfterViewInit(){
    this.modalRef = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  cargarProfesionales(){
    this.miServicio.getProfesionales().subscribe(
      (data:Profesionales[])=>{
        this.profesion = data;
      }
    )
  }

  abrirNuevo(){
    this.isEditing=null;
    this.formProfesionales.reset();
    this.modalRef.show();
  }

  editar(profesion:Profesionales){
    this.isEditing = profesion.id || null;
    this.formProfesionales.patchValue(profesion);
    this.modalRef.show();
    
  }

  guardar(){
    if(this.formProfesionales.invalid){
      this.formProfesionales.markAllAsTouched();
      return;
    }

    const datos = this.formProfesionales.value;

    if(datos.estado === true){
      datos.estado = "Disponible";
    }else{
      datos.estado = "No disponible";
    }

    if(this.isEditing){
      let profesionalEditar:Profesionales = {...datos, id:this.isEditing};
      
      this.miServicio.actualizarProfesional(profesionalEditar).subscribe(
        ()=>{
          alert("Perfil Actualizado");
          this.modalRef.hide();
          this.cargarProfesionales();
        }
      )


    }else{
      let profesionalNuevo:Profesionales = {...datos};
      this.miServicio.nuevoProfesional(profesionalNuevo).subscribe(
      ()=>{
        alert("Perfil Creado")
        this.modalRef.hide();
        this.cargarProfesionales();
      });
    }
  }


  eliminarProfesional(profesion:Profesionales){
    const msj = confirm(`Estas seguro que quieres eliminar a este profesional ${profesion.nombreCompleto}`);
    if(msj){
      this.miServicio.eliminarProfesional(profesion).subscribe(
        ()=>{
          this.cargarProfesionales();
        }
      );
    }
  }

  cargarCategorias(){
    this.miServicio.getCategorias().subscribe(
      (data:Categorias[])=>{
        this.categorias = data;
      }
    )
  }

  getCategorias(categoriaId:number):string{
    const catId = this.categorias.find(
      (g)=>Number(g.id)===Number(categoriaId)
    );
    return catId ? catId.nombre : "Sin categoria";
  }

  //Metodos para lograr la paginacion
    get totalPages(): number {
      return Math.ceil(this.profesion.length / this.pageSize);
    }
  
    get profesionalPagina(): Profesionales[] {
      const start = (this.page - 1) * this.pageSize;
      return this.profesion.slice(start, start + this.pageSize);
    }
  
    cambiarPagina(n: number) {
      if (n < 1 || n > this.totalPages) return;
      this.page = n;
    }
  

}
