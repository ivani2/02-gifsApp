import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interface';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent {


  get historial(): string[] {
    return this.GifsService.historial;
  }

  constructor( private GifsService:GifsService ) {}

  buscar( termino: string ){
    //console.log( termino );
    this.GifsService.buscarGifs( termino );
  }

}
