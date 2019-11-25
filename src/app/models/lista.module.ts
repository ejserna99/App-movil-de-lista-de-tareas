import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaItemModule } from './lista-item.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ListaModule { 

  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  terminada: boolean;
  items: ListaItemModule[];

  constructor( titulo: string ) {
    this.titulo = titulo;

    this.creadaEn = new Date();
    this.terminada = false;
    this.items = [];

    this.id = new Date().getTime();


  }
}
