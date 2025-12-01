import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})

export class FiltroPipe implements PipeTransform {

  transform(lista: any[], filtro: string): any[] {
    if (!filtro) return lista;

    filtro = filtro.toLowerCase();

    return lista.filter(item =>
      item.nombreCompleto.toLowerCase().includes(filtro)||
      item.categoria.toLowerCase().includes(filtro)||
      item.ciudad.toLowerCase().includes(filtro)
    );
  }
}
