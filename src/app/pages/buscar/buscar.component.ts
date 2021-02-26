import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/EnCartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  
  peliculasEncontradas: Movie[];
  textoBusqueda: string;

  constructor( private activatedRoute: ActivatedRoute,
                private servicio: PeliculasService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(resp => {
      //console.log(resp.texts);
      this.textoBusqueda = resp.texts;

      //TODO: Llamar servicio busqueda
      this.servicio.searchMovies(resp.texts).subscribe(resp => {
        //console.log(resp);
        this.peliculasEncontradas = resp;

        
      });
      
    })
  }

}
