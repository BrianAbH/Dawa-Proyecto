import { Component, ElementRef, ViewChild } from '@angular/core';
import { Search } from "../../../shared/search/search";
import { Categorias } from '../../../models/categorias';
import { ServCategoria } from '../../../services/serv-categoria';
import { FiltroCategorias } from "../../../pipes/filtros";
import { CheckboxRequiredValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

declare const bootstrap:any;

@Component({
  selector: 'app-crud-categorias',
  imports: [Search, FiltroCategorias, FormsModule, ReactiveFormsModule],
  templateUrl: './crud-categorias.html',
})

export class CrudCategorias {
  categorias:Categorias[]=[];
  categoriasA:Categorias[]=[];
  categoriasI:Categorias[]=[];
  //Variables para la paginacion
  page = 1;
  pageSize = 7;
  //Referencia al formulario
  formCategoria!:FormGroup;
  //Referencia al modal
  modalRef:any;

  //Id para saber si es para guardar una nueva categoria o actualizar la categoria
  isEditing: number | null= null;
  //Filtro para la barra de busqueda
  filtro: string = '';
  filtrar(texto: string) {
    this.filtro = texto;
  }

  constructor(private miservicio:ServCategoria, private fb:FormBuilder){
    this.cargarCategorias();
    this.categoriasActivas();
    this.categoriasInactivas();
    //inicializacion del form
    this.formCategoria = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      descripcion:['',[Validators.required, Validators.minLength(3)]],
      estado:[]
    });
  }

  @ViewChild('modalCategoriaRef') modalElement !:ElementRef;
  ngAfterViewInit(){
    this.modalRef = new bootstrap.Modal(this.modalElement.nativeElement)
  }

  //carga todas las categorias sin importar el estado
  cargarCategorias(){
    this.miservicio.getCategorias().subscribe(
      (data:Categorias[])=>{
        this.categorias=data;
      }
    );
  }

  //Sirve para traer las categorias activas
  categoriasActivas(){
    this.miservicio.getCategoriasActivas().subscribe(
      (data:Categorias[])=>{
        this.categoriasA = data;
      }
    )
  }

  //Sirve para traer las categorias inactivas
  categoriasInactivas(){
    this.miservicio.getCategoriasInactivas().subscribe(
      (data:Categorias[])=>{
        this.categoriasI = data;
      }
    )
  }

  //Se ejecuta al dar clic en nueva categoria
  abrirNuevo(){
    this.isEditing=null;
    this.formCategoria.reset();//Limpia los componentes del form
    this.modalRef.show();
  }
  
  //Se ejecuta al dar click en editar
  editar(categoria:Categorias){
    this.isEditing = categoria.id ?? null;
    this.formCategoria.patchValue(categoria); //Sirve para llenar los componentes del formulario con los datos del objeto
    this.modalRef.show();
  }

  //Metodo guardar
  guardar(){
    //verificar si el formulario es valido
    if(this.formCategoria.invalid){
      this.formCategoria.markAllAsTouched();
      return;
    }//si es invalido salimos, no guardamos
    
    const datos = this.formCategoria.value;//obtener todos los valores del componente form en un solo objeto
    
    //Estable los estados de las categorias
    if(datos.estado ===true){ //en el caso de que sea true el checked si asigna activa a esa categoria
      datos.estado = 'Activa';
    }else{
      datos.estado = 'Inactiva';
    }

    if(this.isEditing){// si no es null estamos editando
      //establecer la categoria a editar
      let categoriaA = {...datos, id:this.isEditing};
      //llamar al servicio para guardar la categoria
      this.miservicio.actualizarCategoria(categoriaA).subscribe(
        ()=>{
          alert('Categoria Actualizada')
          this.modalRef.hide();
          this.cargarCategorias();
        }
      );
    }else{// si es null el id se crea una nueva peli
      this.miservicio.guardarCategoria(datos).subscribe(
        ()=>{
          alert('Categoria Guardada')
          this.modalRef.hide();
          this.cargarCategorias();
        }
      )
    }


  }

  //Metodo Eliminar
  eliminar(categoria:Categorias){
    const msj = confirm("Estas seguro que quieres eliminar esta categoria: " + categoria.nombre);//Mensaje de confirmacion
    if(msj){
      this.miservicio.eliminarCategoria(categoria).subscribe( //Llama al servicio y al metodo correspondiente y le paso el objeto
      ()=>{
        alert("Categoria Eliminada");
        this.cargarCategorias();
      }
    )
    }
  }

  //Metodos para lograr la paginacion
  get totalPages(): number {
    return Math.ceil(this.categorias.length / this.pageSize);
  }

  get categoriaPagina(): Categorias[] {
    const start = (this.page - 1) * this.pageSize;
    return this.categorias.slice(start, start + this.pageSize);
  }

  cambiarPagina(n: number) {
    if (n < 1 || n > this.totalPages) return;
    this.page = n;
  }
}
