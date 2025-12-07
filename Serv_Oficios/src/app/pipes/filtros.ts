import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})

export class FiltroProfesionales implements PipeTransform {
  transform(lista: any[], filtro: string): any[] {
    if (!filtro) return lista;

    filtro = filtro.toLowerCase();

    return lista.filter(item =>
      item.nombreCompleto.toLowerCase().includes(filtro)||
      item.categoria.toLowerCase().includes(filtro)||
      item.ciudad.toLowerCase().includes(filtro)||
      item.nombre.toLowerCase().includes(filtro)

    );
  }
}

@Pipe({
  name: 'filtrarC'
})
export class FiltroCategorias implements PipeTransform {
  transform(lista: any[], filtro: string): any[] {
    if (!filtro) return lista;

    filtro = filtro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return lista.filter(item =>
      item.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filtro)
    );
  }
}

@Pipe({
  name: 'filtrarCl'
})

export class FiltroClientes implements PipeTransform {

  transform(lista: any[], filtro: string): any[] {
    if (!filtro) return lista;

    filtro = filtro.toLowerCase();

    return lista.filter(item =>
      item.nombreCompleto.toLowerCase().includes(filtro)||
      item.correo.toLowerCase().includes(filtro) ||
      item.ciudad.toLowerCase().includes(filtro)
    );
  }
}

