import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.modules'
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  listas: Lista[] = [];


  constructor() { 
    console.log('Servicio inicializado');


    this.loadStorage();
    console.log(this.listas);

  }

  createList(title: string) {
    const newList = new Lista(title);
    this.listas.push(newList);

    this.saveStorage();
    
    return newList.id;
  }

  obtenerList(id: string | number) {
    id = Number(id);

    return this.listas.find( listaData => listaData.id === id);
    
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));

  }

  loadStorage() {

    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
    
  }
}
