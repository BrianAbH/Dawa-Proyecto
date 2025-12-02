import { Component } from '@angular/core';
import { Profesionales } from '../../../models/profesionales';
import { ServProfesionales } from '../../../services/serv-profesionales';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from "../../../shared/search/search";
import { FiltroPipe } from "../../../pipes/filtroProfesionales-pipe";

@Component({
  selector: 'app-crud-profesionales',
  imports: [ReactiveFormsModule, Search, FiltroPipe],
  templateUrl: './crud-profesionales.html',
})
export class CrudProfesionales {
  profesion:Profesionales[]=[];
  //Referencia al formulario
  formProfesionales!:FormGroup;

  filtro: string = '';

  filtrar(texto: string) {
    this.filtro = texto;
  }

  constructor(private miServicio:ServProfesionales, private router:Router, private fb:FormBuilder){
    this.cargarProfesionales();
    this.formProfesionales = this.fb.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      numero: ['', [Validators.required]],
      correo: ['',[Validators.required]],
      foto: ['',[Validators.required]],
      oficio: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
    })
  }

  cargarProfesionales(){
    this.miServicio.getProfesionales().subscribe(
      (data:Profesionales[])=>{
        this.profesion = data;
      }
    )
  }

  guardar(){
    if(this.formProfesionales.invalid){
      this.formProfesionales.markAsTouched();
      return;
    }
    const datos = this.formProfesionales.value;

    let profesionalesNuevo:Profesionales = {...datos};
    this.miServicio.nuevoProfesional(profesionalesNuevo).subscribe(
      ()=>{
        alert("Nuevo Profesional");
        this.cargarProfesionales();
      }
    )
  }

  eliminarProfesional(id:number){
    this.miServicio.eliminarProfesional(id).subscribe(
      ()=>{
        alert("Profesional Eliminado")
        this.cargarProfesionales();
      }
    )
  }

  verPerfil(id:any){
    this.router.navigate(['/Profesionales-perfil/',id]);
  }

}
