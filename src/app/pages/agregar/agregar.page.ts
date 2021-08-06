import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.modules';
import { ListaItem } from 'src/app/models/lista-item.models';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: '';
  constructor(private todosService: TodosService,
              private route: ActivatedRoute) { 

    const listaId = this.route.snapshot.paramMap.get('listaId');
    
    this.lista = this.todosService.obtenerList(listaId);

    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";
    this.todosService.saveStorage();
  }

  cambioCheck(item: ListaItem ) {
    console.log(item);

    const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado )
                            .length;
                            
    // console.log('pendientes', pendientes);
    console.log({ pendientes });

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.todosService.saveStorage();
    console.log(this.todosService.listas);
  }
}
