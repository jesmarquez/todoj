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
}
